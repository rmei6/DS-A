# There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.

# Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.

 

# Example 1:


# Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
# Output: 6
# Example 2:


# Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
# Output: 12
 

# Constraints:

# 1 <= m, n <= 50
# 0 <= maxMove <= 50
# 0 <= startRow < m
# 0 <= startColumn < 

from functools import lru_cache

class Solution:        

    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:

        @lru_cache(None)                                # <-- Many cells are revisited so we cache the previous calls
        def dp (x,y,steps = maxMove):
            if x not in range(m) or y not in range(n):  # <-- Moved off the grid so increment the tally
                return 1
            if not steps:                               # <-- Ran out of the maxMove steps
                return 0

            ans, dx, dy = 0, 1, 0
            for _ in range(4):
                ans+= dp(x+dx, y+dy, steps-1)           # <-- visit the adjacent cells
                dx, dy = dy,-dx                         # <-- iterates thru the directions:
				                                        #         south => east => north => west 

            return ans  

        return dp (startRow, startColumn)%1000000007