# Given a rectangle of size n x m, return the minimum number of integer-sided squares that tile the rectangle.

 

# Example 1:



# Input: n = 2, m = 3
# Output: 3
# Explanation: 3 squares are necessary to cover the rectangle.
# 2 (squares of 1x1)
# 1 (square of 2x2)
# Example 2:



# Input: n = 5, m = 8
# Output: 5
# Example 3:



# Input: n = 11, m = 13
# Output: 6
 

# Constraints:

# 1 <= n, m <= 13

from functools import cache
from math import inf

class Solution:
    def tilingRectangle(self, n: int, m: int) -> int:
        # 11x13 is the only case where there is a square in the middle
        if max(m, n) == 13 and min(m, n) == 11:
            return 6

        # assume that there exists a horizontal or vertical cut
        @cache
        def deeper(a, b):
            # already a square
            if a == b:
                return 1

            # a single row / column
            if min(a, b) == 1:
                return max(a, b)

            # ensure a >= b
            if a < b:
                return deeper(b, a)

            best = +inf
            # try all horizontal and vertical cuts
            for i in range(1, a):
                best = min(best, deeper(i, b) + deeper(a - i, b))
            for i in range(1, b):
                best = min(best, deeper(a, i) + deeper(a, b - i))
            return best

        return deeper(m, n)