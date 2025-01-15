// Given two positive integers num1 and num2, find the positive integer x such that:

// x has the same number of set bits as num2, and
// The value x XOR num1 is minimal.
// Note that XOR is the bitwise XOR operation.

// Return the integer x. The test cases are generated such that x is uniquely determined.

// The number of set bits of an integer is the number of 1's in its binary representation.

 

// Example 1:

// Input: num1 = 3, num2 = 5
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0011 and 0101, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.
// Example 2:

// Input: num1 = 1, num2 = 12
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0001 and 1100, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.
 

// Constraints:

// 1 <= num1, num2 <= 109

// time and space: O(1)

/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var minimizeXor = function(num1, num2) {
  let countOnes = num2.toString(2).split('1').length - 1;
  let result = 0;

  // filling bits while prioritizing num1
  for (let i = 31; i >= 0; i--) {
      if (countOnes > 0 && (num1 & (1 << i))) {
          result |= (1 << i);
          countOnes--;
      }
  }
  // filling remaining bits
  for (let i = 0; i < 32; i++) {
      if (countOnes > 0 && !(result & (1 << i))) {
          result |= (1 << i);
          countOnes--;
      }
  }

  return result;
};