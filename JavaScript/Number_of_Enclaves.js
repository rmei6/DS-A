// You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.

// A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.

// Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.

 

// Example 1:


// Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
// Output: 3
// Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.
// Example 2:


// Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
// Output: 0
// Explanation: All 1s are either on the boundary or can reach the boundary.
 

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 500
// grid[i][j] is either 0 or 1.

/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function(grid) {
  let isReachBoundary = false
  let answer = 0
  
  const dfs = (raw, col) => {
    if(raw < 0 || raw >= grid.length || col < 0 || col >= grid[0].length || grid[raw][col] === 0) return 0
    grid[raw][col] = 0
    if(raw === 0 || raw === grid.length - 1 || col === 0 || col === grid[0].length - 1) {
      isReachBoundary = true
      
    }
    
    const up = dfs(raw - 1, col)
    const down = dfs(raw + 1, col)
    const left = dfs(raw, col - 1)
    const right = dfs(raw, col + 1)
    
    return 1 + up + down + left + right
  }
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      isReachBoundary = false
      if(grid[i][j] === 1) {
        const area = dfs(i, j)
        if(!isReachBoundary) answer += area
      }
    }
  }
  
  return answer
};