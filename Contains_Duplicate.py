#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'containsDuplicate' function below.
#
# The function is expected to return a BOOLEAN.
# The function accepts INTEGER_ARRAY nums as parameter.
#

def containsDuplicate(nums):
    # Write your code here
    if(len(nums) == 0):
        return True
    exists = set([])
    for num in nums:
        if num in exists:
            return True
        else:
            exists.add(num)
    return False

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    nums_count = int(input().strip())

    nums = []

    for _ in range(nums_count):
        nums_item = int(input().strip())
        nums.append(nums_item)

    result = containsDuplicate(nums)

    fptr.write(str(int(result)) + '\n')

    fptr.close()
