// Given a string s, partition s such that every 
// substring
//  of the partition is a 
// palindrome
// .

// Return the minimum cuts needed for a palindrome partitioning of s.

 

// Example 1:

// Input: s = "aab"
// Output: 1
// Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
// Example 2:

// Input: s = "a"
// Output: 0
// Example 3:

// Input: s = "ab"
// Output: 1
 

// Constraints:

// 1 <= s.length <= 2000
// s consists of lowercase English letters only.

/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
  let n = s.length;
  let isPalindrome = Array(n).fill(0).map(() => Array(n).fill(false));   
  for (let i = 0; i < n; i++) {
      isPalindrome[i][i] = true;
  }   
  for (let len = 2; len <= n; len++) {
      for (let start = 0; start <= n - len; start++) {
          const end = start + len - 1;
          if (len === 2) {
              isPalindrome[start][end] = (s[start] === s[end]);
          } else {
              isPalindrome[start][end] = (s[start] === s[end] && isPalindrome[start + 1][end - 1]);
          }
      }
  }    
  let dp = Array(n).fill(Number.MAX_VALUE);
  
  for (let end = 0; end < n; end++) {
      if (isPalindrome[0][end]) {
          dp[end] = 0;
      } else {
          for (let start = 1; start <= end; start++) {
              if (isPalindrome[start][end]) {
                  dp[end] = Math.min(dp[end], dp[start - 1] + 1);
              }
          }
      }
  }   
  return dp[n - 1];
}