// An integer has monotone increasing digits if and only if each pair of adjacent digits x and y satisfy x <= y.

// Given an integer n, return the largest number that is less than or equal to n with monotone increasing digits.

 

// Example 1:

// Input: n = 10
// Output: 9
// Example 2:

// Input: n = 1234
// Output: 1234
// Example 3:

// Input: n = 332
// Output: 299
 

// Constraints:

// 0 <= n <= 10^9

/**
 * @param {number} n
 * @return {number}
 */
var monotoneIncreasingDigits = function(n) {
  const num = Array.from(''+n, Number);    
  let i = 0;

  while(i < num.length - 1 && num[i] <= num[i + 1]){
      i++;
  };

  while( i >= 0 && num[i] > num[i + 1]){
      num[i]--;
      i--;
  };
  
  for(let j = i + 2; j < num.length; j++){
      num[j] = 9;
  };
  return +num.join('');
};