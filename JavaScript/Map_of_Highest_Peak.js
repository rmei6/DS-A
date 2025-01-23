// You are given an integer matrix isWater of size m x n that represents a map of land and water cells.

// If isWater[i][j] == 0, cell (i, j) is a land cell.
// If isWater[i][j] == 1, cell (i, j) is a water cell.
// You must assign each cell a height in a way that follows these rules:

// The height of each cell must be non-negative.
// If the cell is a water cell, its height must be 0.
// Any two adjacent cells must have an absolute height difference of at most 1. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).
// Find an assignment of heights such that the maximum height in the matrix is maximized.

// Return an integer matrix height of size m x n where height[i][j] is cell (i, j)'s height. If there are multiple solutions, return any of them.

 

// Example 1:



// Input: isWater = [[0,1],[0,0]]
// Output: [[1,0],[2,1]]
// Explanation: The image shows the assigned heights of each cell.
// The blue cell is the water cell, and the green cells are the land cells.
// Example 2:



// Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
// Output: [[1,1,0],[0,1,1],[1,2,2]]
// Explanation: A height of 2 is the maximum possible height of any assignment.
// Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.
 

// Constraints:

// m == isWater.length
// n == isWater[i].length
// 1 <= m, n <= 1000
// isWater[i][j] is 0 or 1.
// There is at least one water cell.

// time and space: O(mn)

/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function(isWater) {
  // bfs approach, time limit exceeded
  // var m = isWater.length, n = isWater[0].length;
  // var heights = Array(m).fill().map(() => Array(n).fill(-1));
  // var queue = [];
  
  // for (let i = 0; i < m; i++) {
  //     for (let j = 0; j < n; j++) {
  //         if (isWater[i][j] === 1) {
  //             heights[i][j] = 0;
  //             queue.push([i, j]);
  //         }
  //     }
  // }
  
  // var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  
  // while (queue.length > 0) {
  //     var [x, y] = queue.shift();
  //     for (var [dx, dy] of dirs) {
  //         var nx = x + dx, ny = y + dy;
  //         if (nx >= 0 && nx < m && ny >= 0 && ny < n && heights[nx][ny] === -1) {
  //             heights[nx][ny] = heights[x][y] + 1;
  //             queue.push([nx, ny]);
  //         }
  //     }
  // }
  
  // return heights;

  // map and filter approach
  var queue = isWater.map((row, i) => row.map((v, j) => v ? [i, j] : 0)).flat().filter(Boolean);
  var map = isWater.map(row => row.map(_ => 0));
  for (let n = 0; queue.length > n;) {
      var [i, j] = queue[n++]
      var level = map[i][j] + 1;
      [[1, 0], [-1, 0], [0, -1], [0, 1]]
          .map(([dx, dy])=>[i + dx, j + dy])
          .filter(([x, y]) => 0 === isWater[x]?.[y] && !map[x][y])
          .forEach(([x, y]) => (map[x][y] = level, queue.push([x, y])));
  }
  return map;
};