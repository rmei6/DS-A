#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'getMaximumDistinctCount' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY a
#  2. INTEGER_ARRAY b
#  3. INTEGER k
#
from collections import Counter

def getMaximumDistinctCount(a, b, k):
    # Write your code here
    a_count,b_count = Counter(a), Counter(b)
    not_in_a = set()
    for num in b_count:
        if num not in a_count:
            not_in_a.add(num)
    space = 0
    for num in a_count:
        if a_count[num] > 1:
            space += a_count[num] - 1
    return len(a_count) + min(k,min(space,len(not_in_a)))
    
    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    a_count = int(input().strip())

    a = []

    for _ in range(a_count):
        a_item = int(input().strip())
        a.append(a_item)

    b_count = int(input().strip())

    b = []

    for _ in range(b_count):
        b_item = int(input().strip())
        b.append(b_item)

    k = int(input().strip())

    result = getMaximumDistinctCount(a, b, k)

    fptr.write(str(result) + '\n')

    fptr.close()
