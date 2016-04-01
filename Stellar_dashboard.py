from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)
MONGOD_HOST = "localhost"
MONGOD_PORT = 27017

DBS_NAME = 'planets'
COLLECTION_NAME = 'foundPlanets'

FIELDS = {'NAME': True, 'STAR': True, 'PER': True, 'MASS': True, 'SEP': True, 'R': True, 'PLANETDISCMETH': True,
          'MSTAR': True, 'RSTAR': True, 'DATE': True, 'TEFF': True, '_id': False, 'MISSION':True,'LUMINOSITY':True, 'DENSITY':True}


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/planetsList/planets')
def planetary_dash():
    connection = MongoClient(MONGOD_HOST, MONGOD_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == '__main__':
    app.run()
