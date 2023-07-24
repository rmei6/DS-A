#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'smashTheBricks' function below.
#
# The function is expected to return a 2D_LONG_INTEGER_ARRAY.
# The function accepts following parameters:
#  1. INTEGER bigHits
#  2. INTEGER_ARRAY newtons
#

def smashTheBricks(bigHits, newtons):
    # Write your code here
    big_hammer_values = []
    if(bigHits > 0):
        big_hammer_values = set(sorted(newtons)[-bigHits:])
    big_hammer_indices = []
    small_hammer_indices = []
    total_blows = 0
    for i,brick in enumerate(newtons):
        if(brick in big_hammer_values):
            big_hammer_indices.append(i+1)
            big_hammer_values.remove(brick)
            total_blows += 1
        else:
            small_hammer_indices.append(i+1)
            total_blows += brick
    if(len(big_hammer_indices) == 0):
        big_hammer_indices = [-1]
    if(len(small_hammer_indices) == 0):
        small_hammer_indices = [-1]
    return [[total_blows],big_hammer_indices,small_hammer_indices]

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    bigHits = int(input().strip())

    newtons_count = int(input().strip())

    newtons = []

    for _ in range(newtons_count):
        newtons_item = int(input().strip())
        newtons.append(newtons_item)

    result = smashTheBricks(bigHits, newtons)

    fptr.write('\n'.join([' '.join(map(str, x)) for x in result]))
    fptr.write('\n')

    fptr.close()
