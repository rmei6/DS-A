// A complex number can be represented as a string on the form "real+imaginaryi" where:

// real is the real part and is an integer in the range [-100, 100].
// imaginary is the imaginary part and is an integer in the range [-100, 100].
// i2 == -1.
// Given two complex numbers num1 and num2 as strings, return a string of the complex number that represents their multiplications.

 

// Example 1:

// Input: num1 = "1+1i", num2 = "1+1i"
// Output: "0+2i"
// Explanation: (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.
// Example 2:

// Input: num1 = "1+-1i", num2 = "1+-1i"
// Output: "0+-2i"
// Explanation: (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.
 

// Constraints:

// num1 and num2 are valid complex numbers.

// used math identity
// (a + bi)(c + di) = (ac − bd) + (ad + bc)i
// find values of a,b,c and d and use formula

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var complexNumberMultiply = function(num1, num2) {
  let num1Parts = num1.split("+");
  let num2Parts = num2.split("+");
  let a = parseInt(num1Parts[0]);
  let b = parseInt(num1Parts[1]);
  let c = parseInt(num2Parts[0]);
  let d = parseInt(num2Parts[1]);
  let realPart = a*c - b*d;
  let imaginaryPart = a*d + b*c;
  let ans = "" + realPart + "+" + imaginaryPart + "i";
  return ans;
};