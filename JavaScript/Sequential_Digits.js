// An integer has sequential digits if and only if each digit in the number is one more than the previous digit.

// Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.

 

// Example 1:

// Input: low = 100, high = 300
// Output: [123,234]
// Example 2:

// Input: low = 1000, high = 13000
// Output: [1234,2345,3456,4567,5678,6789,12345]
 

// Constraints:

// 10 <= low <= high <= 10^9

/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function(low, high) {
  const result = [];
  for (let i = 1; i <= 9; i++) {
      let num = i;
      for (let j = i + 1; j <= 9; j++) {
          num = num * 10 + j;
          if (num >= low && num <= high) {
              result.push(num);
          }
      }
  }
  return result.sort((a, b) => a - b);
};