// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

 

// Example 1:

// Input: ransomNote = "a", magazine = "b"
// Output: false
// Example 2:

// Input: ransomNote = "aa", magazine = "ab"
// Output: false
// Example 3:

// Input: ransomNote = "aa", magazine = "aab"
// Output: true
 

// Constraints:

// 1 <= ransomNote.length, magazine.length <= 10^5
// ransomNote and magazine consist of lowercase English letters.

// time: O(n) , total number of characters in args
// space: O(26) -> O(1)

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
  let ransomCount = new Map();
  for (let char of ransomNote) {
      ransomCount.set(char, (ransomCount.get(char) || 0) + 1);
  }

  for (let char of magazine) {
      if (ransomCount.has(char)) {
          ransomCount.set(char, ransomCount.get(char) - 1);
          if (ransomCount.get(char) === 0) ransomCount.delete(char);
      }
  }

  return ransomCount.size === 0;
};