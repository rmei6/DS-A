// You are given an m x n integer array grid where grid[i][j] could be:

// 1 representing the starting square. There is exactly one starting square.
// 2 representing the ending square. There is exactly one ending square.
// 0 representing empty squares we can walk over.
// -1 representing obstacles that we cannot walk over.
// Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.

 

// Example 1:


// Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
// Output: 2
// Explanation: We have the following two paths: 
// 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
// 2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
// Example 2:


// Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
// Output: 4
// Explanation: We have the following four paths: 
// 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
// 2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
// 3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
// 4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
// Example 3:


// Input: grid = [[0,1],[2,0]]
// Output: 0
// Explanation: There is no path that walks over every empty square exactly once.
// Note that the starting and ending square can be anywhere in the grid.
 

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 20
// 1 <= m * n <= 20
// -1 <= grid[i][j] <= 2
// There is exactly one starting cell and one ending cell.

// counting when each block is used to track unique paths

/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function(grid) {
  var track = function(i,j) {
      if(i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || 
      grid[i][j] === 1 || grid[i][j] === -1) return;
      if(grid[i][j] === 2){
          if(tracked === totalZeros) count++;
          return;
      }   

      grid[i][j] = 1;
      tracked++;
      track(i + 1, j);
      track(i, j + 1);
      track(i - 1, j);
      track(i, j - 1);
      grid[i][j] = 0;
      tracked--;
  }
  
  let count = 0;
  let start;
  let totalZeros = 1;
  let tracked = 0;
  for (let i = 0; i < grid.length; i++){
              for (let j = 0; j < grid[0].length; j++){
                  if(grid[i][j] === 1) start = [i,j];
                  if(grid[i][j] === 0) totalZeros++;
              }
          }
  grid[start[0]][start[1]] = 0;
  track(...start)
  return count; 
};