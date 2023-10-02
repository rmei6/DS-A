#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'extractErrorLogs' function below.
#
# The function is expected to return a 2D_STRING_ARRAY.
# The function accepts 2D_STRING_ARRAY logs as parameter.
#

from collections import defaultdict
from datetime import datetime

def extractErrorLogs(logs):
    # Write your code here
    reports = defaultdict(list)
    results = []
    for log in logs:
        if log[2] == "ERROR" or log[2] == "CRITICAL":
            reports[log[0]].append(log)
    for val in sorted(reports.keys(), key=lambda x: datetime.strptime(x, "%d-%m-%Y")):
        results += sorted(reports[val], key=lambda x: datetime.strptime(x[1], "%H:%M"))
    return results

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    logs_rows = int(input().strip())
    logs_columns = int(input().strip())

    logs = []

    for _ in range(logs_rows):
        logs.append(input().rstrip().split())

    result = extractErrorLogs(logs)

    fptr.write('\n'.join([' '.join(x) for x in result]))
    fptr.write('\n')

    fptr.close()
