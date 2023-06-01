# Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

# A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

# All the visited cells of the path are 0.
# All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
# The length of a clear path is the number of visited cells of this path.

class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0] or grid[0][0] == 1 or grid[-1][-1] == 1: return -1
        visited = set((0, 0))
        queue = collections.deque([(0, 0, 1)])
        
        while queue:
            x, y, level = queue.popleft()
            if (x, y) == (len(grid) - 1, len(grid[0]) - 1): return level
            for dx, dy in [(0, 1), (1, 0), (-1, 0), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)]:
                if 0 <= x + dx < len(grid) and 0 <= y + dy < len(grid[0]) and grid[x + dx][y + dy] == 0 and (x + dx, y + dy) not in visited:
                    visited.add((x + dx, y + dy))
                    queue.append((x + dx, y + dy, level + 1))
            
        return -1