# Given a positive integer n, find the pivot integer x such that:

# The sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.
# Return the pivot integer x. If no such integer exists, return -1. It is guaranteed that there will be at most one pivot index for the given input.

 

# Example 1:

# Input: n = 8
# Output: 6
# Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.
# Example 2:

# Input: n = 1
# Output: 1
# Explanation: 1 is the pivot integer since: 1 = 1.
# Example 3:

# Input: n = 4
# Output: -1
# Explanation: It can be proved that no such integer exist.
 

# Constraints:

# 1 <= n <= 1000

from math import sqrt

class Solution:
    def pivotInteger(self, n: int) -> int:
        # 2 liner
        # x=sqrt(n*(n+1)/2)
        # return int(x) if x==int(x) else -1
        # newton method
        def findSqrt(num: int):
           if num == 0: return 0
           x = num
           x0 = 1
           while(abs(x-x0) >= 1):
               x0 = x
               x = x0 - (x0 * x0 - num) / (2*x0)
           return int(x) if x <= x0 else int(x0)
        x = n * (n + 1) / 2
        y = findSqrt(x)
        return x if y*y == x else -1