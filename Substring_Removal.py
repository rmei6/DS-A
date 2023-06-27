#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'getMinLength' function below.
#
# The function is expected to return an INTEGER.
# The function accepts STRING seq as parameter.
#

def getMinLength(seq):
    if(len(seq) <= 1):
        return len(seq)
    # removed = 0
    # first = 0
    # second = 1
    # while(second < len(seq)):
    #     if(seq[first] == 'A' and seq[second] == 'B'):
    #         first -= 1
    #         second += 1
    #         removed += 2
    #     elif(seq[first] == 'B' and seq[second] == 'B'):
    #         first -= 1
    #         second += 1
    #         removed += 2
    #     else:
    #         second += 1
    # return len(seq) - removed
    replaced = set([])
    check = range(0,len(seq))
    first = 0
    second = 1
    while(second < len(check)):
        print(first)
        print(second)
        if(seq[check[second]] == 'B'):
            print('replaced')
            replaced.add(check[first])
            replaced.add(check[second])
            second += 1
            if(first == 0):
                first = second
                second += 1
            else:
                while(check[first] in replaced and first != 0):
                    first -= 1
        else:
            second += 1
            if(first == 0 and check[first] in replaced):
                first = second
                second += 1
            else:
                first += 1
    print(replaced)
    print(first)
    print(second)
    return len(check) - len(replaced)
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    seq = input()

    result = getMinLength(seq)

    fptr.write(str(result) + '\n')

    fptr.close()
