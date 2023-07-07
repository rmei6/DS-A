#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'get_chunks' function below.
#
# The function is expected to return a STRING_ARRAY.
# The function accepts STRING datastream as parameter.
#

import re

def get_chunks(datastream):
    # Write your code here
    whole_regex = ["\d{1}\.{2}\d{2}\.\d{2}\.\d{3}\.\d{4}\.\d{2}\.{2}\d{1}","\d{2}\.\d{2}\.\d{3}\.\d{4}\.\d{2}\.{2}\d{1}"]
    sub_regex = ["\d{1}\.{2}\d{2}\.\d{2}\.\d{3}\.\d{4}\.\d{2}","\d{2}\.\d{2}\.\d{3}\.\d{4}\.\d{2}"]
    results = []
    data = datastream
    for exp in whole_regex:
        result = re.findall(exp,data)
        # print(result)
        results += result
        for found in result:
            data = data.replace(found,"/")
    for exp in sub_regex:
        result = re.findall(exp,data)
        # print(result)
        for found in result:
            data = data.replace(found,"/")
        results += result
    return results
        
    

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    datastream = input()

    result = sorted(get_chunks(datastream))

    fptr.write('\n'.join(result))
    fptr.write('\n')

    fptr.close()
