// An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. These characters divide the square into contiguous regions.

// Given the grid grid represented as a string array, return the number of regions.

// Note that backslash characters are escaped, so a '\' is represented as '\\'.

 

// Example 1:


// Input: grid = [" /","/ "]
// Output: 2
// Example 2:


// Input: grid = [" /","  "]
// Output: 1
// Example 3:


// Input: grid = ["/\\","\\/"]
// Output: 5
// Explanation: Recall that because \ characters are escaped, "\\/" refers to \/, and "/\\" refers to /\.
 

// Constraints:

// n == grid.length == grid[i].length
// 1 <= n <= 30
// grid[i][j] is either '/', '\', or ' '.

// euler's method for planar graph
// f(number of regions) = e(edges) - v(vertices) + c(connected components)

/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function (grid) {
  let n = grid.length;
  let visited = Array(n + 1).fill();
  for (let i = 0; i <= n; i++) visited[i] = Array(n + 1).fill();

  let v = (n + 1) ** 2;
  let e = n * 4;
  let c = 0;

  function dfs(r, c) {
    visited[r][c] = 1;
    if (r == 0 || r == n) {
      if (c > 0 && !visited[r][c - 1]) dfs(r, c - 1);
      if (c < n && !visited[r][c + 1]) dfs(r, c + 1);
    }
    if (c == 0 || c == n) {
      if (r > 0 && !visited[r - 1][c]) dfs(r - 1, c);
      if (r < n && !visited[r + 1][c]) dfs(r + 1, c);
    }

    if (r < n && c < n && !visited[r + 1][c + 1] && grid[r][c] == "\\")
      dfs(r + 1, c + 1);
    if (r < n && c > 0 && !visited[r + 1][c - 1] && grid[r][c - 1] == "/")
      dfs(r + 1, c - 1);
    if (r > 0 && c < n && !visited[r - 1][c + 1] && grid[r - 1][c] == "/")
      dfs(r - 1, c + 1);
    if (r > 0 && c > 0 && !visited[r - 1][c - 1] && grid[r - 1][c - 1] == "\\")
      dfs(r - 1, c - 1);
  }

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      if (grid[i]?.[j] && grid[i][j] != " ") e++;
      if (!visited[i][j]) {
        c++;
        dfs(i, j);
      }
    }
  }

  return e - v + c;
};