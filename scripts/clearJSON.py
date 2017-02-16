import json

print('Clearing JSON data ...')
with open('data.json', 'w') as jsonFile:
  json.dump([], jsonFile)
