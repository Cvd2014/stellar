from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)
MONGOD_HOST = "localhost"
MONGOD_PORT = 27017

DBS_NAME = 'heroku_wdw3svkz'
MONGOD_URI='mongodb://Cvd2016:baseball1@ds011880.mlab.com:11880/heroku_wdw3svkz'
COLLECTION_NAME = 'foundPlanets'

FIELDS = {}


@app.route('/')
def index():
    return render_template("index.html")


c
