// There is a 2D grid of size n x n where each cell of this grid has a lamp that is initially turned off.

// You are given a 2D array of lamp positions lamps, where lamps[i] = [rowi, coli] indicates that the lamp at grid[rowi][coli] is turned on. Even if the same lamp is listed more than once, it is turned on.

// When a lamp is turned on, it illuminates its cell and all other cells in the same row, column, or diagonal.

// You are also given another 2D array queries, where queries[j] = [rowj, colj]. For the jth query, determine whether grid[rowj][colj] is illuminated or not. After answering the jth query, turn off the lamp at grid[rowj][colj] and its 8 adjacent lamps if they exist. A lamp is adjacent if its cell shares either a side or corner with grid[rowj][colj].

// Return an array of integers ans, where ans[j] should be 1 if the cell in the jth query was illuminated, or 0 if the lamp was not.

 

// Example 1:


// Input: n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
// Output: [1,0]
// Explanation: We have the initial grid with all lamps turned off. In the above picture we see the grid after turning on the lamp at grid[0][0] then turning on the lamp at grid[4][4].
// The 0th query asks if the lamp at grid[1][1] is illuminated or not (the blue square). It is illuminated, so set ans[0] = 1. Then, we turn off all lamps in the red square.

// The 1st query asks if the lamp at grid[1][0] is illuminated or not (the blue square). It is not illuminated, so set ans[1] = 0. Then, we turn off all lamps in the red rectangle.

// Example 2:

// Input: n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
// Output: [1,1]
// Example 3:

// Input: n = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
// Output: [1,1,0]
 

// Constraints:

// 1 <= n <= 10^9
// 0 <= lamps.length <= 20000
// 0 <= queries.length <= 20000
// lamps[i].length == 2
// 0 <= rowi, coli < n
// queries[j].length == 2
// 0 <= rowj, colj < n

/**
 * @param {number} n
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
var gridIllumination = function (n, lamps, queries) {
  // Maps for tracking counts
  const rows = new Map();
  const cols = new Map();
  const diag = new Map();
  const antiDiag = new Map();
  const lampPos = new Map();

  // Add lamp and update counts
  for (const [r, c] of lamps) {
      const key = r * n + c;
      if (!lampPos.has(key)) {
          lampPos.set(key, true);
          rows.set(r, (rows.get(r) || 0) + 1);
          cols.set(c, (cols.get(c) || 0) + 1);
          diag.set(r - c, (diag.get(r - c) || 0) + 1);
          antiDiag.set(r + c, (antiDiag.get(r + c) || 0) + 1);
      }
  }

  const result = new Array(queries.length);
  // Optimize directions array
  const dirs = [0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1, -1, -1, 0, -1, 1, -1, -1];

  for (let i = 0; i < queries.length; i++) {
      const [r, c] = queries[i];

      // Check if cell is illuminated
      result[i] = ((rows.get(r) || 0) > 0 ||
          (cols.get(c) || 0) > 0 ||
          (diag.get(r - c) || 0) > 0 ||
          (antiDiag.get(r + c) || 0) > 0) ? 1 : 0;

      // Turn off adjacent lamps
      for (let d = 0; d < dirs.length; d += 2) {
          const nr = r + dirs[d];
          const nc = c + dirs[d + 1];

          if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
              const key = nr * n + nc;
              if (lampPos.has(key)) {
                  lampPos.delete(key);
                  rows.set(nr, rows.get(nr) - 1);
                  cols.set(nc, cols.get(nc) - 1);
                  diag.set(nr - nc, diag.get(nr - nc) - 1);
                  antiDiag.set(nr + nc, antiDiag.get(nr + nc) - 1);
              }
          }
      }
  }

  return result;
};