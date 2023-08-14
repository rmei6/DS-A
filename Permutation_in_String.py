# Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

# In other words, return true if one of s1's permutations is the substring of s2.

 

# Example 1:

# Input: s1 = "ab", s2 = "eidbaooo"
# Output: true
# Explanation: s2 contains one permutation of s1 ("ba").
# Example 2:

# Input: s1 = "ab", s2 = "eidboaoo"
# Output: false
 

# Constraints:

# 1 <= s1.length, s2.length <= 104
# s1 and s2 consist of lowercase English letters.

#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'check_inclusion' function below.
#
# The function is expected to return a BOOLEAN.
# The function accepts following parameters:
#  1. STRING s1
#  2. STRING s2
#

from collections import Counter

def check_inclusion(s1, s2):
    # Write your code here
    counter = Counter(s1)
    width = len(s1)
    match = 0
    for i in range(0,len(s2)):
        if(s2[i] in counter):
            if(not counter[s2[i]]):
                match -= 1
            counter[s2[i]] -= 1
            if(not counter[s2[i]]):
                match += 1
        if(i >= width and s2[i-width] in counter):
            if(not counter[s2[i-width]]):
                match -= 1
            counter[s2[i-width]] += 1
            if(not counter[s2[i-width]]):
                match += 1
        if(match == len(counter)):
            return True
    return False

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s1 = input()

    s2 = input()

    result = check_inclusion(s1, s2)

    fptr.write(str(int(result)) + '\n')

    fptr.close()
