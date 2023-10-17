# Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

# In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


 

# Example 1:

# Input: rowIndex = 3
# Output: [1,3,3,1]
# Example 2:

# Input: rowIndex = 0
# Output: [1]
# Example 3:

# Input: rowIndex = 1
# Output: [1,1]
 

# Constraints:

# 0 <= rowIndex <= 33
 

# Follow up: Could you optimize your algorithm to use only O(rowIndex) extra space?

import math
from typing import List

class Solution:
    def comb(self, n, m):
        
        if n == m or m == 0:
            return 1
        else:
            return math.factorial(n) // ( math.factorial(m) * math.factorial(n-m) )

        
    def getRow(self, rowIndex: int) -> List[int]:
        
        # the coefficient of level k is as following
        #
        # C(k,0), C(k,1), ... , C(k,k)
        
        return [ self.comb(rowIndex,i) for i in range(0, rowIndex+1) ]