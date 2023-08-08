#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'getPotentialOfWinner' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY potential
#  2. LONG_INTEGER k
#

def getPotentialOfWinner(potential, k):
    # Write your code here
    wins = 0
    winner = potential[0]
    for i in range(1, len(potential)):
        if(winner < potential[i]):
            wins  = 0
            winner = potential[i]
        wins += 1
        if(wins == k):
            break
    return winner
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    potential_count = int(input().strip())

    potential = []

    for _ in range(potential_count):
        potential_item = int(input().strip())
        potential.append(potential_item)

    k = int(input().strip())

    result = getPotentialOfWinner(potential, k)

    fptr.write(str(result) + '\n')

    fptr.close()
