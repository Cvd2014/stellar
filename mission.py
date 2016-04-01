import csv

missions = ["BD", "CoRoT", "GJ", "HAT", "HD", "HIP", "HR", "K2", "KELT", "Kepler", "KOI", "KIC", "KIC", "MOA", "OGLE",
            "TRES", "WASP"]


def add_mission(row):
    for mission in missions:
        if (row[0].startswith(mission)):
            row.append(mission)
    return row


with open('planets.csv', 'rb') as infile:
    reader = csv.reader(infile)
    data = list(reader)

header = data[0]
rows = data[1:]

header.append('MISSION')
rows = map(add_mission, rows)

with open('newPlanets.csv', 'wb') as outfile:
    writer = csv.writer(outfile)
    writer.writerow(header)
    for row in rows:
        if row[len(row) - 1 !='']:
            writer.writerow(row)
        else:
            row.append('other')
            writer.writerow(row)
