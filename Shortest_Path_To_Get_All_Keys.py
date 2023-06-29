# You are given an m x n grid grid where:

# '.' is an empty cell.
# '#' is a wall.
# '@' is the starting point.
# Lowercase letters represent keys.
# Uppercase letters represent locks.
# You start at the starting point and one move consists of walking one space in one of the four cardinal directions. You cannot walk outside the grid, or walk into a wall.

# If you walk over a key, you can pick it up and you cannot walk over a lock unless you have its corresponding key.

# For some 1 <= k <= 6, there is exactly one lowercase and one uppercase letter of the first k letters of the English alphabet in the grid. This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

# Return the lowest number of moves to acquire all keys. If it is impossible, return -1.

 

# Example 1:


# Input: grid = ["@.a..","###.#","b.A.B"]
# Output: 8
# Explanation: Note that the goal is to obtain all the keys not to open all the locks.
# Example 2:


# Input: grid = ["@..aA","..B#.","....b"]
# Output: 6
# Example 3:


# Input: grid = ["@Aa"]
# Output: -1

class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        m, n = len(grid), len(grid[0])
        
        ii = jj = total = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == "@": ii, jj = i, j
                elif grid[i][j].islower(): total += 1
        
        ans = 0
        seen = {(ii, jj, 0)}
        queue = [(ii, jj, 0)]
        while queue: 
            newq = []
            for i, j, keys in queue: 
                if keys == (1 << total) - 1: return ans 
                for ii, jj in (i-1, j), (i, j-1), (i, j+1), (i+1, j): 
                    if 0 <= ii < m and 0 <= jj < n and grid[ii][jj] != "#": 
                        kk = keys 
                        if grid[ii][jj].islower(): kk |= 1 << ord(grid[ii][jj]) - 97
                        if (ii, jj, kk) in seen or grid[ii][jj].isupper() and not kk & (1 << ord(grid[ii][jj])-65): continue 
                        newq.append((ii, jj, kk))
                        seen.add((ii, jj, kk))
            ans += 1
            queue = newq
        return -1