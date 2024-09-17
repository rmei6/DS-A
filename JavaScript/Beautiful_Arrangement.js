// Suppose you have n integers labeled 1 through n. A permutation of those n integers perm (1-indexed) is considered a beautiful arrangement if for every i (1 <= i <= n), either of the following is true:

// perm[i] is divisible by i.
// i is divisible by perm[i].
// Given an integer n, return the number of the beautiful arrangements that you can construct.

 

// Example 1:

// Input: n = 2
// Output: 2
// Explanation: 
// The first beautiful arrangement is [1,2]:
//     - perm[1] = 1 is divisible by i = 1
//     - perm[2] = 2 is divisible by i = 2
// The second beautiful arrangement is [2,1]:
//     - perm[1] = 2 is divisible by i = 1
//     - i = 2 is divisible by perm[2] = 1
// Example 2:

// Input: n = 1
// Output: 1
 

// Constraints:

// 1 <= n <= 15

// dfs and backtracking

/**
 * @param {number} n
 * @return {number}
 */
var countArrangement = function(n) {
  if (n < 3) return n;
  const visited = Array(n + 1).fill(false);
let ans = 0;

const dfs = (i) => {
  if (i > n) {
          ans++;
          return;
      }

  for (let idx = 1; idx <= n; idx++) {
          // used to avoid double counting
          if (!visited[idx] && (idx % i === 0 || i % idx === 0)) {
              visited[idx] = true;
              dfs(i + 1);
              visited[idx] = false;
          }
  }
      return;
};

dfs(1);
return ans;
};