// You are given two positive integers n and k.

// An integer x is called k-palindromic if:

// x is a palindrome.
// x is divisible by k.
// An integer is called good if its digits can be rearranged to form a k-palindromic integer. For example, for k = 2, 2020 can be rearranged to form the k-palindromic integer 2002, whereas 1010 cannot be rearranged to form a k-palindromic integer.

// Return the count of good integers containing n digits.

// Note that any integer must not have leading zeros, neither before nor after rearrangement. For example, 1010 cannot be rearranged to form 101.

 

// Example 1:

// Input: n = 3, k = 5

// Output: 27

// Explanation:

// Some of the good integers are:

// 551 because it can be rearranged to form 515.
// 525 because it is already k-palindromic.
// Example 2:

// Input: n = 1, k = 4

// Output: 2

// Explanation:

// The two good integers are 4 and 8.

// Example 3:

// Input: n = 5, k = 6

// Output: 2468

 

// Constraints:

// 1 <= n <= 10
// 1 <= k <= 9

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

// hard coding possible due to constraints. also fastest
const vals = [null,
  [1, 9, 4, 3, 2, 1, 1, 1, 1, 1],
  [2, 9, 4, 3, 2, 1, 1, 1, 1, 1],
  [3, 243, 108, 69, 54, 27, 30, 33, 27, 23],
  [4, 252, 172, 84, 98, 52, 58, 76, 52, 28],
  [5, 10935, 7400, 3573, 4208, 2231, 2468, 2665, 2231, 1191],
  [6, 10944, 9064, 3744, 6992, 3256, 3109, 3044, 5221, 1248],
  [7, 617463, 509248, 206217, 393948, 182335, 170176, 377610, 292692, 68739],
  [8, 617472, 563392, 207840, 494818, 237112, 188945, 506388, 460048, 69280],
  [9, 41457015, 37728000, 13726509, 33175696, 15814071, 12476696, 36789447, 30771543, 4623119],
  [10, 41457024, 39718144, 13831104, 37326452, 19284856, 13249798, 40242031, 35755906, 4610368]];

var countGoodIntegers = function(n, k) {
  return vals[n][k];
};

var countGoodIntegers = function(n, k) {
  const fact = [1];
  for (let i = 1; i <= n; i++) fact[i] = fact[i - 1] * i;

  const half = Math.floor((n + 1) / 2), start = 10 ** (half - 1), end = 10 ** half;
  const seen = new Set();
  let res = 0;

  for (let i = start; i < end; i++) {
      let left = i.toString(), right = left.split('').reverse().join('');
      if (n % 2) right = right.slice(1);
      let pal = left + right;
      if (parseInt(pal) % k !== 0) continue;

      let sorted = pal.split('').sort().join('');
      if (seen.has(sorted)) continue;
      seen.add(sorted);

      let count = {}, total = n - (pal.match(/0/g)?.length || 0);
      for (let d of pal) count[d] = (count[d] || 0) + 1;

      let perms = total * fact[n - 1];
      for (let f of Object.values(count)) perms /= fact[f];
      res += perms;
  }

  return res;
}