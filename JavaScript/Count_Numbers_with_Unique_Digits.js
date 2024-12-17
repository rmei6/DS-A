// Given an integer n, return the count of all numbers with unique digits, x, where 0 <= x < 10n.

 

// Example 1:

// Input: n = 2
// Output: 91
// Explanation: The answer should be the total numbers in the range of 0 ≤ x < 100, excluding 11,22,33,44,55,66,77,88,99
// Example 2:

// Input: n = 0
// Output: 1
 

// Constraints:

// 0 <= n <= 8

/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function(n) {
  if (n <= 0) return 1;
  if (n == 1) return 10;
  let num = 81;
  let sum = num + 10;
  for(let i = 3; i <= Math.min(n,10); i++){
      num *= 11 - i;
      sum += num
  }
  return sum;
};