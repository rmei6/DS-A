from collections import defaultdict
import re

# read the string filename
filename = input()
timestamps = defaultdict(int)
with open(filename, 'r') as document:
     for line in document.readlines():
         time = re.search(r'\[([\d\/\w:]*)',line)
         if(time):
             timestamps[time.group(1)] += 1
with open('req_'+filename, 'w') as output:
    for i,j in timestamps.items():
        if(j > 1):
            output.write(i)
            output.write('\n')