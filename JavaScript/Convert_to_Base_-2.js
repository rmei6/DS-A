// Given an integer n, return a binary string representing its representation in base -2.

// Note that the returned string should not have leading zeros unless the string is "0".

 

// Example 1:

// Input: n = 2
// Output: "110"
// Explantion: (-2)2 + (-2)1 = 2
// Example 2:

// Input: n = 3
// Output: "111"
// Explantion: (-2)2 + (-2)1 + (-2)0 = 3
// Example 3:

// Input: n = 4
// Output: "100"
// Explantion: (-2)2 = 4
 

// Constraints:

// 0 <= n <= 109

/**
 * @param {number} n
 * @return {string}
 */
var baseNeg2 = function (n) {
  // Handle special case when input is 0
  if (n === 0) return '0';

  // Initialize result string
  let binaryCode = '';

  // Continue until quotient is 1
  while (n !== 1) {

      // Append remainder to result
      binaryCode = Math.abs(n % -2).toString() + binaryCode;

      // Update quotient for the next iteration
      n = Math.ceil(n / -2);
  }

  // Append the final '1' to the result
  binaryCode = "1" + binaryCode;


  return binaryCode
};