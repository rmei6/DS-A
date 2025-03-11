// Given a string s consisting only of characters a, b and c.

// Return the number of substrings containing at least one occurrence of all these characters a, b and c.

 

// Example 1:

// Input: s = "abcabc"
// Output: 10
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
// Example 2:

// Input: s = "aaacb"
// Output: 3
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
// Example 3:

// Input: s = "abc"
// Output: 1
 

// Constraints:

// 3 <= s.length <= 5 x 10^4
// s only consists of a, b or c characters.

// tracking last position
// time: O(n)
// space: O(1)

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
  let res = 0;
  for (let i = 0, last = [-1, -1, -1]; i < s.length; i++) {
      last[s[i] === 'a' ? 0 : s[i] === 'b' ? 1 : 2] = i;
      res += 1 + Math.min(...last);
  }
  return res;
};