# You are given an n x n binary grid board. In each move, you can swap any two rows with each other, or any two columns with each other.

# Return the minimum number of moves to transform the board into a chessboard board. If the task is impossible, return -1.

# A chessboard board is a board where no 0's and no 1's are 4-directionally adjacent.

 

# Example 1:


# Input: board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
# Output: 2
# Explanation: One potential sequence of moves is shown.
# The first move swaps the first and second column.
# The second move swaps the second and third row.
# Example 2:


# Input: board = [[0,1],[1,0]]
# Output: 0
# Explanation: Also note that the board with 0 in the top left corner, is also a valid chessboard.
# Example 3:


# Input: board = [[1,0],[1,0]]
# Output: -1
# Explanation: No matter what sequence of moves you make, you cannot end with a valid chessboard.
 

# Constraints:

# n == board.length
# n == board[i].length
# 2 <= n <= 30
# board[i][j] is either 0 or 1.

from typing import List
from math import inf

class Solution:
    def movesToChessboard(self, board: List[List[int]]) -> int:
        n = len(board)
        
        def fn(vals): 
            total = odd = 0 
            for i, x in enumerate(vals): 
                if vals[0] == x: 
                    total += 1
                    if i&1: odd += 1
                elif vals[0] ^ x != (1 << n) - 1: return inf
            ans = inf 
            if len(vals) <= 2*total <= len(vals)+1: ans = min(ans, odd)
            if len(vals)-1 <= 2*total <= len(vals): ans = min(ans, total - odd)
            return ans 
        
        rows, cols = [0]*n, [0]*n
        for i in range(n): 
            for j in range(n): 
                if board[i][j]: 
                    rows[i] ^= 1 << j 
                    cols[j] ^= 1 << i
        ans = fn(rows) + fn(cols)
        return ans if ans < inf else -1 