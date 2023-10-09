#!/bin/python3

import math
import os
import random
import re
import sys


# Given an array arr of n integers, a sequence of n-1 operations must be performed on the array.
# In each operation, 
#   - remove the minimum and maximum elements from the current array and add the sum back to the array
#   - the cost of the operation, cost = ceil((minimum + maximum) / (maximum - minimum + 1))
# Find the total cost to reduce the array to one element
# all elements of the array are positive

#
# Complete the 'findTotalCost' function below.
#
# The function is expected to return an INTEGER.
# The function accepts INTEGER_ARRAY arr as parameter.
#

def findTotalCost(arr):
    # Write your code here
    arr = sorted(arr)
    maximum = arr[-1]
    print(arr, maximum)
    cost = 0
    for i in range(0, len(arr) - 1):
        cost += math.ceil((maximum + arr[i]) / (maximum - arr[i] + 1))
        maximum += arr[i]
    return cost

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    arr_count = int(input().strip())

    arr = []

    for _ in range(arr_count):
        arr_item = int(input().strip())
        arr.append(arr_item)

    result = findTotalCost(arr)

    fptr.write(str(result) + '\n')

    fptr.close()
