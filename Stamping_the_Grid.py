# You are given an m x n binary matrix grid where each cell is either 0 (empty) or 1 (occupied).

# You are then given stamps of size stampHeight x stampWidth. We want to fit the stamps such that they follow the given restrictions and requirements:

# Cover all the empty cells.
# Do not cover any of the occupied cells.
# We can put as many stamps as we want.
# Stamps can overlap with each other.
# Stamps are not allowed to be rotated.
# Stamps must stay completely inside the grid.
# Return true if it is possible to fit the stamps while following the given restrictions and requirements. Otherwise, return false.

 

# Example 1:


# Input: grid = [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]], stampHeight = 4, stampWidth = 3
# Output: true
# Explanation: We have two overlapping stamps (labeled 1 and 2 in the image) that are able to cover all the empty cells.
# Example 2:


# Input: grid = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], stampHeight = 2, stampWidth = 2 
# Output: false 
# Explanation: There is no way to fit the stamps onto all the empty cells without the stamps going outside the grid.
 

# Constraints:

# m == grid.length
# n == grid[r].length
# 1 <= m, n <= 105
# 1 <= m * n <= 2 * 105
# grid[r][c] is either 0 or 1.
# 1 <= stampHeight, stampWidth <= 105

from typing import List

class Solution:
    def possibleToStamp(self, grid: List[List[int]], height: int, width: int) -> bool:
        m, n = len(grid), len(grid[0])
        h, hh = [0]*n, [0]*n
        if height > m or width > n:
            return all(all(row) for row in grid)    # Edge case

        for row in grid:
            r = w = stamp = 0

            while r < width-1:                      # Same as 85
                h[r] = 0 if row[r] else h[r]+1
                w = 0 if h[r] < height else w+1
                r += 1

            for l in range(n):

                if r < n:
                    h[r] = 0 if row[r] else h[r]+1
                    w = 0 if h[r] < height else w+1
                    r += 1

                    if w >= width:  stamp = r       # Stamp!

                if hh[l] == height or row[l] and hh[l]:
                    return False        # Blanks above the occupied or stamped block

                # Update blank heights
                hh[l] = 0 if l < stamp or row[l] else hh[l]+1

        return not any(hh)              # Make sure no blanks left