#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'getResponses' function below.
#
# The function is expected to return a STRING_ARRAY.
# The function accepts following parameters:
#  1. STRING_ARRAY valid_auth_tokens
#  2. 2D_STRING_ARRAY requests
#

def getResponses(valid_auth_tokens, requests):
    # Write your code here
    results = []
    for request in requests:
        request_type = request[0]
        url = re.split('\?|&',request[1])
        items = {}
        for section in url:
            item = re.split('=',section)
            if(len(item) > 1):
                items[item[0]] = item[1]
        token = items.pop('token')
        if(token in valid_auth_tokens):
            result = ''
            if(request_type == 'GET'):
                result += 'VALID'
                for item in items:
                    result += ',' + item + ',' + items[item]
            else:
                if('csrf' in items and len(items['csrf']) >= 8 and items['csrf'].isalnum()):
                    items.pop('csrf')
                    result += 'VALID'
                    for item in items:
                        result += ',' + item + ',' + items[item]
                else:
                    result += 'INVALID'
            results.append(result)        
        else:
            results.append('INVALID')
    return results
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    valid_auth_tokens_count = int(input().strip())

    valid_auth_tokens = []

    for _ in range(valid_auth_tokens_count):
        valid_auth_tokens_item = input()
        valid_auth_tokens.append(valid_auth_tokens_item)

    requests_rows = int(input().strip())
    requests_columns = int(input().strip())

    requests = []

    for _ in range(requests_rows):
        requests.append(input().rstrip().split())

    result = getResponses(valid_auth_tokens, requests)

    fptr.write('\n'.join(result))
    fptr.write('\n')

    fptr.close()
