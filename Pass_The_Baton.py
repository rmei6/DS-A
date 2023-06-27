#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'batonPass' function below.
#
# The function is expected to return an INTEGER_ARRAY.
# The function accepts following parameters:
#  1. INTEGER friends
#  2. LONG_INTEGER time
#

def batonPass(friends, time):
    # Write your code here
    # turn = math.floor(friends / time)
    # place = time % friends
    # passing = 0
    # receiving = 0
    # if(turn % 2 == 0):
    #     passing = friends - place - 1
    #     receiving = passing + 1
    # else:
    #     passing = place
    #     receiving = passing + 1
    # return [passing,receiving]
    round_trip = (friends - 1) * 2
    # turn = math.floor(friends / time)
    place = time % round_trip
    passing = 0
    receiving = 0
    if(place > friends - 1):
        if(place == ((friends - 1) * 2)):
            passing = 1
            receiving = 2
        else:
            passing = friends - (place % (friends - 1))
            receiving = passing - 1
    else:
        passing = place
        receiving = place + 1
    return [passing,receiving]        
        
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    friends = int(input().strip())

    time = int(input().strip())

    result = batonPass(friends, time)

    fptr.write('\n'.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
