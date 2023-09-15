# Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

# A region is captured by flipping all 'O's into 'X's in that surrounded region.

 

# Example 1:


# Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
# Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
# Explanation: Notice that an 'O' should not be flipped if:
# - It is on the border, or
# - It is adjacent to an 'O' that should not be flipped.
# The bottom 'O' is on the border, so it is not flipped.
# The other three 'O' form a surrounded region, so they are flipped.
# Example 2:

# Input: board = [["X"]]
# Output: [["X"]]
 

# Constraints:

# m == board.length
# n == board[i].length
# 1 <= m, n <= 200
# board[i][j] is 'X' or 'O'.

from collections import deque
from typing import List

class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        # check all circles we come across, BFS?
        # if something is on the edge, then we know it can be skipped because it cannot be fully surrounded by Xs
        # check all Os on the borders and then all regions that these Os are a part of will remain "safe" and remain Os; can be done with BFS
        # change "safe" values to a temp value that will be changed back to Os later
        # check each region's direct neighbors 
        # a region can only be safe if it's touching the edge
            # edges are where r==0 and board.length-1 or c=0 and board[0].length - 1

        visited = set()

        def _bfs(r,c):
            queue = deque([(r,c)])
            visited.add((r,c))
            # run _bfs until queue is empty
            while queue:
                # pop out from right side
                place = queue.pop()
                # print(place)
                row,column = place[0],place[1]
                # process popped out cell
                board[row][column] = "T"
                # push into left side of queue all O neighbors of current cell processing
                possible_places = [(row+1,column),(row-1,column),(row,column+1),(row,column-1)]
                for space in possible_places:
                    ro,col = space[0],space[1]
                    if ro in range(0,len(board) - 1) and col in range(0,len(board[ro]) - 1) and board[ro][col] == "O" and (ro,col) not in visited:
                        visited.add((ro,col))
                        queue.appendleft((ro,col))
            return

        # 1. identify all edge regions and mark them as 'safe' - using T as temp variable
        for r in range(len(board)):
            for c in range(len(board[r])):
                if board[r][c] == "O" and (r in [0,len(board) - 1] or c in [0,len(board[r]) - 1]):
                    _bfs(r,c)
        # print(visited)

        # 2. change all current Os to Xs - 'capturing'

        for r in range(len(board)):
            for c in range(len(board[r])):
                if board[r][c] == "O":
                    board[r][c] = "X"
                # 3. return all Ts to Os
                elif board[r][c] == "T":
                    board[r][c] = "O"