// The set [1, 2, 3, ..., n] contains a total of n! unique permutations.

// By listing and labeling all of the permutations in order, we get the following sequence for n = 3:

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// Given n and k, return the kth permutation sequence.

 

// Example 1:

// Input: n = 3, k = 3
// Output: "213"
// Example 2:

// Input: n = 4, k = 9
// Output: "2314"
// Example 3:

// Input: n = 3, k = 1
// Output: "123"
 

// Constraints:

// 1 <= n <= 9
// 1 <= k <= n!

// probability math

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
  const factorials = {0: 1};
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
    factorials[i] = factorials[i - 1] * i;
  }
  const KthComb = [];
  k--;
  while (arr.length > 0) {
    const availableLen = arr.length - 1;
    let swapValue = Math.floor(k / factorials[availableLen]);
    KthComb.push(arr[swapValue]);
    arr.splice(swapValue, 1);
    const remainder = k % factorials[availableLen];
    k = k % factorials[availableLen];
  }

  return KthComb.join("");
};