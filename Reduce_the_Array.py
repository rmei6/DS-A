#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'minimizeCost' function below.
#
# The function is expected to return an INTEGER.
# The function accepts INTEGER_ARRAY arr as parameter.
#

import bisect

def minimizeCost(arr):
    # Write your code here
    if len(arr) == 1:
        return 0
    arr = sorted(arr)
    total = 0
    while len(arr) > 1:
        item1, item2 = arr[0], arr[1]
        del arr[0:2]
        total += item1 + item2
        bisect.insort(arr, item1 + item2)
    return total
        
        
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    arr_count = int(input().strip())

    arr = []

    for _ in range(arr_count):
        arr_item = int(input().strip())
        arr.append(arr_item)

    result = minimizeCost(arr)

    fptr.write(str(result) + '\n')

    fptr.close()
