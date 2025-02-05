// You are given an integer n. You have an n x n binary grid grid with all values initially 1's except for some indices given in the array mines. The ith element of the array mines is defined as mines[i] = [xi, yi] where grid[xi][yi] == 0.

// Return the order of the largest axis-aligned plus sign of 1's contained in grid. If there is none, return 0.

// An axis-aligned plus sign of 1's of order k has some center grid[r][c] == 1 along with four arms of length k - 1 going up, down, left, and right, and made of 1's. Note that there could be 0's or 1's beyond the arms of the plus sign, only the relevant area of the plus sign is checked for 1's.

 

// Example 1:


// Input: n = 5, mines = [[4,2]]
// Output: 2
// Explanation: In the above grid, the largest plus sign can only be of order 2. One of them is shown.
// Example 2:


// Input: n = 1, mines = [[0,0]]
// Output: 0
// Explanation: There is no plus sign, so return 0.
 

// Constraints:

// 1 <= n <= 500
// 1 <= mines.length <= 5000
// 0 <= xi, yi < n
// All the pairs (xi, yi) are unique.

// method to make function for shape other than plus sign?

/**
 * @param {number} n
 * @param {number[][]} mines
 * @return {number}
 */
var orderOfLargestPlusSign = function(n, mines) {
  const matrix = Array.from(Array(n), () => Array(n).fill(1));
  for(let [x,y] of mines) {
      matrix[x][y] = 0;
  };
  let max = 1, flag = false;
  for(let i = 0; i < n; i++) {
      for(let j = 0; j < n; j++) {
          if(matrix[i][j] === 1){
              max = callCheck(1, max, matrix, i, j);
              flag = true;
          };
      };
  };
  
  return flag ? max : 0;
};

const callCheck = function(k, max, matrix, i, j) {
  if(i - k < 0 || i + k >= matrix.length || j - k < 0 || 
  j + k >= matrix.length || (matrix[i][j - k] === 0 || 
  matrix[i][j + k] === 0 || matrix[i - k][j] === 0 || 
  matrix[i + k][j] === 0)){
      return max;
  };
  k++;
  max = Math.max(max, k);
  return callCheck(k, max, matrix, i, j);
};