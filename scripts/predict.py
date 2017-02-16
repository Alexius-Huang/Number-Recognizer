import os

# Standard scientific Python imports
import matplotlib.pyplot as plt
from numpy import array

# Import datasets, classifiers and performance metrics
from sklearn import svm, metrics, datasets

# The digits dataset
# digits = datasets.load_digits();
# print(digits.target)

import json
targets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
images, results = [], []
with open('data.json') as jsonFile:
  digits = json.load(jsonFile)
  for digit in digits:
    images.append(digit['data'])
    results.append(digit['target'])

# To apply a classifier on this data, we need to flatten the image, to
# turn the data in a (samples, feature) matrix:
n_samples = len(images)
images = array(images)
results = array(results)

# n_samples = len(digits.images)
# data = digits.images.reshape((n_samples, -1))
# print(len(data[0]))

# Create a classifier: a support vector classifier
classifier = svm.SVC(gamma=0.001)

# We learn the digits on the first half of the digits
classifier.fit(images[:n_samples - 1], results[:n_samples - 1])

# Now predict the value of the digit on the second half:
expected = results[n_samples - 1:]
predicted = classifier.predict(images[n_samples - 1:])

print(expected)
print(predicted)