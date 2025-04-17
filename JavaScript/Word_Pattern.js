// Given a pattern and a string s, find if s follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s. Specifically:

// Each letter in pattern maps to exactly one unique word in s.
// Each unique word in s maps to exactly one letter in pattern.
// No two letters map to the same word, and no two words map to the same letter.
 

// Example 1:

// Input: pattern = "abba", s = "dog cat cat dog"

// Output: true

// Explanation:

// The bijection can be established as:

// 'a' maps to "dog".
// 'b' maps to "cat".
// Example 2:

// Input: pattern = "abba", s = "dog cat cat fish"

// Output: false

// Example 3:

// Input: pattern = "aaaa", s = "dog cat cat dog"

// Output: false

 

// Constraints:

// 1 <= pattern.length <= 300
// pattern contains only lower-case English letters.
// 1 <= s.length <= 3000
// s contains only lowercase English letters and spaces ' '.
// s does not contain any leading or trailing spaces.
// All the words in s are separated by a single space.

// time and space: O(n)

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  let letters = s.split(" ");
  let arr1 = Object.create(null);
  let arr2 = Object.create(null);

  if (pattern.length !== letters.length) return false;

  for (let i = 0; i < letters.length; i++) {
    if (pattern[i] in arr1) {
      if (arr1[pattern[i]] !== letters[i]) return false;
    } else {
      arr1[pattern[i]] = letters[i];
    }

    if (letters[i] in arr2) {
      if (arr2[letters[i]] !== pattern[i]) return false;
    } else {
      arr2[letters[i]] = pattern[i];
    }
  }
  return true;
};