# Given an integer n, return true if it is a power of four. Otherwise, return false.

# An integer n is a power of four, if there exists an integer x such that n == 4x.

 

# Example 1:

# Input: n = 16
# Output: true
# Example 2:

# Input: n = 5
# Output: false
# Example 3:

# Input: n = 1
# Output: true
 

# Constraints:

# -231 <= n <= 231 - 1

import math

class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        # If 'n' is 1, it is a power of four
        if n == 1:
            return True
        
        # If 'n' is non-positive, it cannot be a power of four
        if n <= 0:
            return False
        
        # Calculate the logarithm of 'n' with base 4
        logarithm_base4 = math.log(n) / math.log(4)
        
        # Check if the result of the logarithmic operation is an integer
        return (logarithm_base4 == int(logarithm_base4))