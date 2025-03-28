// You are given an m x n integer matrix grid and an array queries of size k.

// Find an array answer of size k such that for each integer queries[i] you start in the top left cell of the matrix and repeat the following process:

// If queries[i] is strictly greater than the value of the current cell that you are in, then you get one point if it is your first time visiting this cell, and you can move to any adjacent cell in all 4 directions: up, down, left, and right.
// Otherwise, you do not get any points, and you end this process.
// After the process, answer[i] is the maximum number of points you can get. Note that for each query you are allowed to visit the same cell multiple times.

// Return the resulting array answer.

 

// Example 1:


// Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
// Output: [5,8,1]
// Explanation: The diagrams above show which cells we visit to get points for each query.
// Example 2:


// Input: grid = [[5,2,1],[1,1,2]], queries = [3]
// Output: [0]
// Explanation: We can not get any points because the value of the top left cell is already greater than or equal to 3.
 

// Constraints:

// m == grid.length
// n == grid[i].length
// 2 <= m, n <= 1000
// 4 <= m * n <= 10^5
// k == queries.length
// 1 <= k <= 10^4
// 1 <= grid[i][j], queries[i] <= 10^6

// time: long, almost runtime error, beats 0%
// 

/**
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */
var maxPoints = function (grid, queries) {
  const m = grid.length;
  const n = grid[0].length;
  const DIRS = [[0, 1], [0, -1], [-1, 0], [1, 0]];

  let sorted = queries.slice();
  sorted.sort((a, b) => a - b);

  let memo = [];
  for (let i = 0; i < m; i++) memo.push(Array(n).fill(false));
  let map = new Map();
  let nextQueue = [[0, 0]];
  let prev;
  for (let k of sorted) {
    if (grid[0][0] >= k) {
      map.set(k, 0);
      continue;
    } else if (map.has(k)) continue;

    // do bfs to get k result
    let queue = nextQueue.slice();
    nextQueue = [];
    memo[0][0] = true;
    let val = 0;
    let idx = 0;
    while (idx < queue.length) {
      let [i, j] = queue[idx++];
      if (grid[i][j] >= k) {
        nextQueue.push([i, j]);
        continue;
      }
      val++;
      for (let dir of DIRS) {
        let nx = i + dir[0];
        let ny = j + dir[1];
        if (nx < 0 || nx >= m || ny < 0 || ny >= n || memo[nx][ny] === true)
          continue;

        memo[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
    if (prev !== undefined) val += map.get(prev);
    map.set(k, val);
    prev = k;
  }

  let ans = [];
  for (let q of queries) ans.push(map.get(q));
  return ans;
};