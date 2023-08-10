#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'isAnagram' function below.
#
# The function is expected to return a BOOLEAN.
# The function accepts following parameters:
#  1. STRING s
#  2. STRING t
#

def isAnagram(s, t):
    # Write your code here
    letter_count = {}
    for letter in s:
        if letter not in letter_count:
            letter_count[letter] = 1
        else:
            letter_count[letter] += 1
    for letter in t:
        if(letter not in letter_count.keys()):
            return False
        else:
            letter_count[letter] -= 1
    for num in letter_count:
        if(letter_count[num] != 0):
            return False
    return True
    # One liner
    # return sorted(list(s)) == sorted(list(t))
    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s = input()

    t = input()

    result = isAnagram(s, t)

    fptr.write(str(int(result)) + '\n')

    fptr.close()
