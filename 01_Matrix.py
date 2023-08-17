# Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

# The distance between two adjacent cells is 1.

 

# Example 1:


# Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
# Output: [[0,0,0],[0,1,0],[0,0,0]]
# Example 2:


# Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
# Output: [[0,0,0],[0,1,0],[1,2,1]]
 

# Constraints:

# m == mat.length
# n == mat[i].length
# 1 <= m, n <= 104
# 1 <= m * n <= 104
# mat[i][j] is either 0 or 1.
# There is at least one 0 in mat.

from collections import deque
from typing import List

class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        # loop through each cell
        # add ___ into a queue and run BFS
        #     starting points: coordinates for the 1s
        # not revisit already visited cells. visited set?

        # directions = ((1,0),(0,1),(-1,0),(0,-1))
        # ROWS, COLS = len(mat),len(mat[0])
        # queue = deque()
        # visited = set()

        # def _inBounds(r,c):
        #     rowinBound = 0 <= r < ROWS
        #     colinBound = 0 <= c < COLS
        #     return rowinBound and colinBound

        # for r in range(ROWS):
        #     for c in range(COLS):
        #         if mat[r][c] == 1:
        #             queue.append(r,c,0)
        
        # while queue:
        #     row,col,step = queue.popleft()

        #     if mat[row][col] == 0:
        #         #???
        #     else:
        #         for dir in directions:
        #             queue.append()

        m, n = len(mat), len(mat[0])
        queue = deque()
        MAX_VALUE = m * n
        
        # Initialize the queue with all 0s and set cells with 1s to MAX_VALUE.
        for i in range(m):
            for j in range(n):
                if mat[i][j] == 0:
                    queue.append((i, j))
                else:
                    mat[i][j] = MAX_VALUE
        
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        
        while queue:
            row, col = queue.popleft()
            for dr, dc in directions:
                r, c = row + dr, col + dc
                if 0 <= r < m and 0 <= c < n and mat[r][c] > mat[row][col] + 1:
                    queue.append((r, c))
                    mat[r][c] = mat[row][col] + 1
        
        return mat

