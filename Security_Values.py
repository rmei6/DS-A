# The 26 characters of the alphabet are each assigned a security value represented as an array of integers,
# where security_values[i] is associated with the ith character of the alphabet. 
# Given an encrypted message, msg, and the array security_values, rearrange the characters in msg
# and find the minimum possible sum of the absolute differences of the security values of adjacent characters.

#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'getMinSum' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY security_values
#  2. STRING msg
#

def getMinSum(security_values, msg):
    # Write your code here
    values = []
    for char in msg:
        values.append(security_values[ord(char) - 97])
    values.sort()
    sum = 0
    for num in range(0,len(values)-1):
        sum += abs(values[num] - values[num+1])
    return sum

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    security_values_count = int(input().strip())

    security_values = []

    for _ in range(security_values_count):
        security_values_item = int(input().strip())
        security_values.append(security_values_item)

    msg = input()

    result = getMinSum(security_values, msg)

    fptr.write(str(result) + '\n')

    fptr.close()
