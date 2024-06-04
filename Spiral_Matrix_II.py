# Given a positive integer n, generate an n x n matrix filled with elements from 1 to n2 in spiral order.

 

# Example 1:


# Input: n = 3
# Output: [[1,2,3],[8,9,4],[7,6,5]]
# Example 2:

# Input: n = 1
# Output: [[1]]
 

# Constraints:

# 1 <= n <= 20

from typing import List,Iterator,Tuple

class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        
        def inwards_spiral(m: int, n: int) -> Iterator[Tuple[int, int]]:
            """Return list of (i, j) indices of a m * n matrix in spiral order"""
            
            for k in range((min(m, n) + 1) // 2):
                (i1, j1), (i2, j2) = (k, k), (m - k - 1, n - k - 1)
                
                if (i1, j1) == (i2, j2): yield (i1, j1); return                                 # Center
                
                yield from ((i1, j) for j in range(j1, j2))                                     # Left to Right
                yield from ((i, j2) for i in range(i1, i2))                                     # Top to Bottom
                yield from ((i2, j) for j in range(j2, j1, -1)) if i1 != i2 else ((i2, j2),)    # Right to Left
                yield from ((i, j1) for i in range(i2, i1, -1)) if j1 != j2 else ((i2, j1),)    # Bottom to Top
        
        matrix = [[0] * n for _ in range(n)]
        for (i, j), x in zip(inwards_spiral(n, n), count(1)): matrix[i][j] = x
        return matrix
