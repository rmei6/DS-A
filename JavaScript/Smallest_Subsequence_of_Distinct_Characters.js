// Given a string s, return the lexicographically smallest subsequence of s that contains all the distinct characters of s exactly once.

 

// Example 1:

// Input: s = "bcabc"
// Output: "abc"
// Example 2:

// Input: s = "cbacdcbc"
// Output: "acdb"
 

// Constraints:

// 1 <= s.length <= 1000
// s consists of lowercase English letters.

/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
  let stack = [];
  for(let i = 0; i < s.length; i++){
      if(stack.includes(s[i])) continue;
      while(stack[stack.length - 1] > s[i] 
      && s.substring(i).includes(stack[stack.length - 1])){
          stack.pop();
      };
      stack.push(s[i]);
  }
  return stack.join("");
};