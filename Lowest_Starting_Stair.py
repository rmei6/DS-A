#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'findLowestStartingStair' function below.
#
# The function is expected to return an INTEGER.
# The function accepts INTEGER_ARRAY jumps as parameter.
#

def findLowestStartingStair(jumps):
    # Write your code here
    position = 0
    lowest_point = 0
    for jump in jumps:
        position += jump
        if(position < lowest_point):
            lowest_point = position
    return (lowest_point * -1) + 1
            
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    jumps_count = int(input().strip())

    jumps = []

    for _ in range(jumps_count):
        jumps_item = int(input().strip())
        jumps.append(jumps_item)

    result = findLowestStartingStair(jumps)

    fptr.write(str(result) + '\n')

    fptr.close()
