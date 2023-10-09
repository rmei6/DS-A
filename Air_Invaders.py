#!/bin/python3

import math
import os
import random
import re
import sys


# There are aircrafts landing that need to be shot down.
# startHeight shows the starting position and descentRate does the descent rate
# You may only shot one aircraft per second
# Get the max number of aircrafts you can shoot down


#
# Complete the 'maxPlanes' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY startHeight
#  2. INTEGER_ARRAY descentRate
#

def maxPlanes(startHeight, descentRate):
    # Write your code here
    time_to_impact = []
    for i, num in enumerate(startHeight):
        time_to_impact.append(math.ceil(num / descentRate[i]))
    time_to_impact = sorted(time_to_impact)
    current_time = 0
    planes_shot = 0
    for time in time_to_impact:
        if time <= current_time:
            return planes_shot
        planes_shot += 1
        current_time += 1
    return planes_shot
        
        
    

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    startHeight_count = int(input().strip())

    startHeight = []

    for _ in range(startHeight_count):
        startHeight_item = int(input().strip())
        startHeight.append(startHeight_item)

    descentRate_count = int(input().strip())

    descentRate = []

    for _ in range(descentRate_count):
        descentRate_item = int(input().strip())
        descentRate.append(descentRate_item)

    result = maxPlanes(startHeight, descentRate)

    fptr.write(str(result) + '\n')

    fptr.close()
