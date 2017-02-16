import matplotlib.pyplot as plt
import numpy as np
import json
import os
import sys
from PIL import Image

print('Image Processing ...')
img = Image.open('./canvas.jpg').convert('LA')
img.thumbnail((16, 16), Image.ANTIALIAS)
imgplot = plt.imshow(img, cmap = plt.cm.gray_r, interpolation = "nearest")
# plt.axis('off')
# plt.show()

print('Writing in JSON format ...')
arr = np.array(img)
reshapedArr = []
for row in arr:
  for col in row:
    reshapedArr.append(float(col[0]))

jsonData = {}
with open('data.json') as jsonFile:
  jsonData = json.load(jsonFile)
  data = {
    'target': int(sys.argv[1]),
    'data': reshapedArr
  }
  jsonData.append(data)

with open('data.json', 'w') as jsonFile:
  json.dump(jsonData, jsonFile)

print('Clearing up unecessary data ...')
os.remove('canvas.jpg')