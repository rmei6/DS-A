// You are given an m x n integer matrix grid​​​.

// A rhombus sum is the sum of the elements that form the border of a regular rhombus shape in grid​​​. The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell. Below is an image of four valid rhombus shapes with the corresponding colored cells that should be included in each rhombus sum:


// Note that the rhombus can have an area of 0, which is depicted by the purple rhombus in the bottom right corner.

// Return the biggest three distinct rhombus sums in the grid in descending order. If there are less than three distinct values, return all of them.

 

// Example 1:


// Input: grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
// Output: [228,216,211]
// Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
// - Blue: 20 + 3 + 200 + 5 = 228
// - Red: 200 + 2 + 10 + 4 = 216
// - Green: 5 + 200 + 4 + 2 = 211
// Example 2:


// Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [20,9,8]
// Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
// - Blue: 4 + 2 + 6 + 8 = 20
// - Red: 9 (area 0 rhombus in the bottom right corner)
// - Green: 8 (area 0 rhombus in the bottom middle)
// Example 3:

// Input: grid = [[7,7,7]]
// Output: [7]
// Explanation: All three possible rhombus sums are the same, so return [7].
 

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// 1 <= grid[i][j] <= 10^5

/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var getBiggestThree = function (grid) {
  var m = grid.length, n = grid[0].length;
  var set = new Set();

  var getRhombusSum = (i, j, size) => {
    if (size === 0) return grid[i][j];

    let sum = 0;
    // Add top, right, bottom, left points
    for (let [x, y] of [[i - size, j], [i, j + size], [i + size, j], [i, j - size]]) {
      if (x < 0 || x >= m || y < 0 || y >= n) return -1;
      sum += grid[x][y];
    }

    // diagonal points
    for (let k = 1; k < size; k++) {
      for (let [x, y] of [
        [i - size + k, j + k],     // Top right
        [i + k, j + size - k],     // Bottom right
        [i + size - k, j - k],     // Bottom left
        [i - k, j - size + k]      // Top left
      ]) {
        if (x < 0 || x >= m || y < 0 || y >= n) return -1;
        sum += grid[x][y];
      }
    }

    return sum;
  };

  // Try centers and sizes
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let size = 0; size <= Math.min(i, m - 1 - i, j, n - 1 - j); size++) {
        var sum = getRhombusSum(i, j, size);
        if (sum !== -1) set.add(sum);
      }
    }
  }

  return [...set].sort((a, b) => b - a).slice(0, 3);
};