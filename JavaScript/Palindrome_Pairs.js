// You are given a 0-indexed array of unique strings words.

// A palindrome pair is a pair of integers (i, j) such that:

// 0 <= i, j < words.length,
// i != j, and
// words[i] + words[j] (the concatenation of the two strings) is a 
// palindrome
// .
// Return an array of all the palindrome pairs of words.

// You must write an algorithm with O(sum of words[i].length) runtime complexity.

 

// Example 1:

// Input: words = ["abcd","dcba","lls","s","sssll"]
// Output: [[0,1],[1,0],[3,2],[2,4]]
// Explanation: The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]
// Example 2:

// Input: words = ["bat","tab","cat"]
// Output: [[0,1],[1,0]]
// Explanation: The palindromes are ["battab","tabbat"]
// Example 3:

// Input: words = ["a",""]
// Output: [[0,1],[1,0]]
// Explanation: The palindromes are ["a","a"]
 

// Constraints:

// 1 <= words.length <= 5000
// 0 <= words[i].length <= 300
// words[i] consists of lowercase English letters.

/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function(words) {

  var isPalindrome = function(s, left, right) {
    while (left < right)
      if (s[left++] !== s[right--])
        return false;  
    return true;
  };

const wordMap = new Map();
const set = new Set();
const n = words.length;

for (let i = 0; i < n; i++) {
  wordMap.set(words[i], i);
  set.add(words[i].length);
}

  const lengths = Array.from(set).sort((a, b) => a - b);
const ans = [];

for(let i = 0; i < n; i++) {
  let length = words[i].length;
  
  if (length === 1) {
    if (wordMap.has("")) {
      ans.push([i, wordMap.get("")]);
      ans.push([wordMap.get(""), i]);
    } 
  } 
  
  else {
    const reverse = words[i].split("").reverse().join("");
    
    if (wordMap.has(reverse) && wordMap.get(reverse) != i)
      ans.push([i, wordMap.get(reverse)]);
    
    for (const k of lengths) {
      if (k === length)
        break;
      
      if (isPalindrome(reverse, 0, length - 1 - k)) {
        const s1 = reverse.substring(length - k);
        
        if (wordMap.has(s1))
          ans.push([i, wordMap.get(s1)]);
      }
      
      if (isPalindrome(reverse, k, length - 1)) {
        const s2 = reverse.substring(0, k);
        
        if (wordMap.has(s2))
          ans.push([wordMap.get(s2), i]);
      }
    }
  }
}

return ans;
};