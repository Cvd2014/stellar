import csv
import math

PI = math.pi
MASSJUPITER = 1898.19 * (10 ** 24)
RADIUSJUPITER = 69911 * (10 ** 3)
DENSITYJUPITER = 1768.28
OMEGA = 5.67 * (10 ** -8)
RADIUSSUN = 6.957 * (10 ** 8)
LUMINOSITYSUN=3.849*(10**26)

missions = ["BD", "CoRoT", "GJ", "HAT", "HD", "HIP", "HR", "K2", "KELT", "Kepler", "KOI", "KIC", "KIC", "MOA", "OGLE",
            "TRES", "WASP"]


def get_density(row):
    if row[5] != '' and row[3] != '':
        mass = float(row[3]) * MASSJUPITER
        radius = float(row[5]) * RADIUSJUPITER

        vol = (4 / 3) * PI * (radius ** 3)
        density = mass / vol
        row.append(density / DENSITYJUPITER)
    else:
        row.append('N/A')
    return row


def get_Luminosity(row):
    if row[8] != '' and row[9] != '':
        R = float(row[8]) * RADIUSSUN
        T = float(row[9])
        luminosity = (4 * PI * (R ** 2) * OMEGA * (T ** 4))/LUMINOSITYSUN
    else:
        luminosity = ('N/A')
    row.append(luminosity)
    return row


def add_mission(row):
    for mission in missions:
        if (row[0].startswith(mission)):
            row.append(mission)
    return row


def fix_entries(row):
    for i in range(0, len(row) - 1):
        if (row[i] == '' or row[i] == None):
            row[i] = 'N/A'
    return row


def addBlankMission(row):
    if len(row) == 11:
        row.append('N/A')
    return row


with open('planets.csv', 'rb') as infile:
    reader = csv.reader(infile)
    data = list(reader)

header = data[0]
rows = data[1:]
header.append('DENSITY')
header.append('LUMINOSITY')
header.append('MISSION')

rows = map(get_density, rows)
rows = map(get_Luminosity, rows)
rows = map(add_mission, rows)
rows = map(fix_entries, rows)
rows = map(addBlankMission, rows)

with open('nonKOIPlanets.csv', 'wb') as outfile:
    writer = csv.writer(outfile)
    writer.writerow(header)
    for row in rows:
        if row[len(row) - 1] != 'KOI':
            writer.writerow(row)

with open('KOICandidates.csv', 'wb') as outfile:
    writer = csv.writer(outfile)
    writer.writerow(header)
    for row in rows:
        if row[len(row) - 1] == 'KOI':
            writer.writerow(row)
