# An integer x is numerically balanced if for every digit d in the number x, there are exactly d occurrences of that digit in x.

# Given an integer n, return the smallest numerically balanced number strictly greater than n.

 

# Example 1:

# Input: n = 1
# Output: 22
# Explanation: 
# 22 is numerically balanced since:
# - The digit 2 occurs 2 times. 
# It is also the smallest numerically balanced number strictly greater than 1.
# Example 2:

# Input: n = 1000
# Output: 1333
# Explanation: 
# 1333 is numerically balanced since:
# - The digit 1 occurs 1 time.
# - The digit 3 occurs 3 times. 
# It is also the smallest numerically balanced number strictly greater than 1000.
# Note that 1022 cannot be the answer because 0 appeared more than 0 times.
# Example 3:

# Input: n = 3000
# Output: 3133
# Explanation: 
# 3133 is numerically balanced since:
# - The digit 1 occurs 1 time.
# - The digit 3 occurs 3 times.
# It is also the smallest numerically balanced number strictly greater than 3000.
 

# Constraints:

# 0 <= n <= 106

from itertools import permutations

class Solution:
    def nextBeautifulNumber(self, n: int) -> int:
        if n == 0:
            return 1
        def getNums(mask,places,vals):
            if places < 0:
                return 
            elif places == 0:
                vals.add(mask)
            else:
                for i in range(1,places+1):
                    cmask = 1 << i
                    if not(cmask & mask):
                        getNums(mask ^ cmask,places-i,vals)

        def solve(n):
            # calc the positions
            curr = 1
            pos = 0
            while curr <= n:
                pos += 1
                curr = curr*10

            #getting the numbers that can be used
            vals=set()
            getNums(0,pos,vals)
            getNums(0,pos+1,vals)
            values = set()
            res = float('inf')
            for num in vals:
                bin_val = bin(num).replace('0b','')[-1::-1]
                arr = []
                for i in range(len(bin_val)):
                    if bin_val[i] != '0':
                        for j in range(i):
                            arr.append(i)
                for p in permutations(arr):
                    s = ''
                    for k in p:
                        s += str(k)
                    if int(s) > n and int(s) < res:
                        res = int(s)
            return res
        return solve(n)