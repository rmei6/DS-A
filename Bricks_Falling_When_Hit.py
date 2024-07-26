# You are given an m x n binary grid, where each 1 represents a brick and 0 represents an empty space. A brick is stable if:

# It is directly connected to the top of the grid, or
# At least one other brick in its four adjacent cells is stable.
# You are also given an array hits, which is a sequence of erasures we want to apply. Each time we want to erase the brick at the location hits[i] = (rowi, coli). The brick on that location (if it exists) will disappear. Some other bricks may no longer be stable because of that erasure and will fall. Once a brick falls, it is immediately erased from the grid (i.e., it does not land on other stable bricks).

# Return an array result, where each result[i] is the number of bricks that will fall after the ith erasure is applied.

# Note that an erasure may refer to a location with no brick, and if it does, no bricks drop.

 

# Example 1:

# Input: grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
# Output: [2]
# Explanation: Starting with the grid:
# [[1,0,0,0],
#  [1,1,1,0]]
# We erase the underlined brick at (1,0), resulting in the grid:
# [[1,0,0,0],
#  [0,1,1,0]]
# The two underlined bricks are no longer stable as they are no longer connected to the top nor adjacent to another stable brick, so they will fall. The resulting grid is:
# [[1,0,0,0],
#  [0,0,0,0]]
# Hence the result is [2].
# Example 2:

# Input: grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]
# Output: [0,0]
# Explanation: Starting with the grid:
# [[1,0,0,0],
#  [1,1,0,0]]
# We erase the underlined brick at (1,1), resulting in the grid:
# [[1,0,0,0],
#  [1,0,0,0]]
# All remaining bricks are still stable, so no bricks fall. The grid remains the same:
# [[1,0,0,0],
#  [1,0,0,0]]
# Next, we erase the underlined brick at (1,0), resulting in the grid:
# [[1,0,0,0],
#  [0,0,0,0]]
# Once again, all remaining bricks are still stable, so no bricks fall.
# Hence the result is [0,0].
 

# Constraints:

# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 200
# grid[i][j] is 0 or 1.
# 1 <= hits.length <= 4 * 104
# hits[i].length == 2
# 0 <= xi <= m - 1
# 0 <= yi <= n - 1
# All (xi, yi) are unique.

# time: O(n * h * w + k)
# space: O(n *  w)

from typing import List
from collections import deque
from heapq import heapify,heappop,heappush
from functools import partial
from itertools import count,islice

class Solution:
    def hitBricks(
        self, grid: List[List[int]], hits: List[List[int]],
        exhaust = deque(maxlen = 0).extend        
    ) -> List[int]:
        cells = bytearray(
            (cell_cnt := (len(grid) + 2) 
                      * (col_cnt := (width := len(grid[0])) + 2))
        )        
        occupied = partial(filter, cells.__getitem__)
        for base, row in zip(
            count((offset := col_cnt + 1) + col_cnt, col_cnt), 
            islice(grid, 1, None)
        ):
            cells[base:base + width] = row
        exhaust(map(
            (removed := [-40805] * cell_cnt).__setitem__, 
            (((row * col_cnt) + col + offset) for row, col in hits), 
            count(-1, -1)
        ))
        base_removals = tuple(map(
            removed.__getitem__, 
            (bases := tuple(
                map(offset.__add__, 
                    filter(grid[0].__getitem__, range(width)))
            ))
        ))
        dists = 1, col_cnt, -1, -col_cnt
        solutions = [0] * len(hits)        
        heapify((pending := list(zip(base_removals, bases))))
        while pending:
            hit, at = heappop(pending)
            for to in occupied(map(at.__add__, dists)):
                cells[to] = False
                if (candidate := removed[to]) < hit:
                    solutions[(candidate := hit)] += 1
                heappush(pending, (candidate, to))
        return reversed(solutions)
        