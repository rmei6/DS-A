#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'generate_bc' function below.
#
# The function is expected to return a STRING.
# The function accepts following parameters:
#  1. STRING url
#  2. STRING separator
#

import re

def generate_bc(url, separator):
    # Write your code here
    words = url.split('/')
    path = '<a href="/">HOME</a>'
    if(separator[-1] != " "):
        separator += " "
    for i in range(1,len(words)):
        path += separator
        value = words[i]
        acronym = False
        if(len(value) > 30):
            acronym = True
            value = ""
            for word in words[i].split('-'):
                if(word not in ['the','of','in','from','by','with','and','or','for','to','at','a']):
                    value += word[0].upper()
        if(i == len(words) - 2):
            end_words = re.findall("[\w]+",words[i+1])
            # print(end_words)
            if(end_words[0] == 'index'):
                path += '<span class="active">' + value.upper() + "</span>"
            else:
                if(acronym):
                    path += '<a href="/' + words[i] + '/">' + value.upper() + '</a>'
                else:
                    path += '<a href="/' + value + '/">' + value.upper() + '</a>'
                path += separator
                path += '<span class="active">' + end_words[0].upper() + "</span>"
            break
        else:
            if(acronym):
                path += '<a href="/' + words[i] + '/">' + value.upper() + '</a>'
            else:
                path += '<a href="/' + value + '/">' + value.upper() + '</a>'
    # print('d' + separator + 'd')
    # print(path)
    return path

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    url = input()

    separator = input()

    result = generate_bc(url, separator)

    fptr.write(result + '\n')

    fptr.close()
