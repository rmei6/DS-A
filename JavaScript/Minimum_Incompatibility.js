// You are given an integer array nums​​​ and an integer k. You are asked to distribute this array into k subsets of equal size such that there are no two equal elements in the same subset.

// A subset's incompatibility is the difference between the maximum and minimum elements in that array.

// Return the minimum possible sum of incompatibilities of the k subsets after distributing the array optimally, or return -1 if it is not possible.

// A subset is a group integers that appear in the array with no particular order.

 

// Example 1:

// Input: nums = [1,2,1,4], k = 2
// Output: 4
// Explanation: The optimal distribution of subsets is [1,2] and [1,4].
// The incompatibility is (2-1) + (4-1) = 4.
// Note that [1,1] and [2,4] would result in a smaller sum, but the first subset contains 2 equal elements.
// Example 2:

// Input: nums = [6,3,8,1,3,1,2,2], k = 4
// Output: 6
// Explanation: The optimal distribution of subsets is [1,2], [2,3], [6,8], and [1,3].
// The incompatibility is (2-1) + (3-2) + (8-6) + (3-1) = 6.
// Example 3:

// Input: nums = [5,3,3,6,3,3], k = 3
// Output: -1
// Explanation: It is impossible to distribute nums into 3 subsets where no two elements are equal in the same subset.
 

// Constraints:

// 1 <= k <= nums.length <= 16
// nums.length is divisible by k
// 1 <= nums[i] <= nums.length

let memo = new Uint8Array(65536);
let selections = new Uint8Array(16);

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumIncompatibility = function (nums, k) {
  let n = nums.length;
  let s = Math.floor(n / k);
  nums.sort((a, b) => a - b);

  let l = 0;
  for (let i = 0; i < n; ++i) {
    if (nums[i] != nums[i + 1]) {
      if (i - l + 1 > k) return -1;
      l = i + 1;
    }
  }

  let full = 1 << n;
  let available = full - 1;
  memo.fill(0, 0, available + 1);
  let res = 1000;
  let cur = 0;

  function bt(d) {
    if (d % s) {
      let btRes = 1000;

      for (let b = selections[d - 1] + 1; b < n; ++b) {
        if (!(available & (1 << b))) continue;
        if (nums[selections[d - 1]] == nums[b]) continue;

        selections[d] = b;
        available ^= 1 << b;
        btRes = Math.min(btRes, bt(d + 1));
        available ^= 1 << b;
      }

      return btRes;
    } else {
      let lastSum = nums[selections[d - 1]] - nums[selections[d - s]];
      if (cur + lastSum >= res) return 1000;
      if (d == n) {
        res = cur + lastSum;
        return lastSum;
      }
      if (memo[available]) {
        res = Math.min(res, cur + lastSum + memo[available]);
        return lastSum + memo[available];
      }

      for (let b = 0; b < n; ++b) {
        if (available & (1 << b)) {
          cur += lastSum;
          selections[d] = b;
          available ^= 1 << b;
          let btRes = bt(d + 1);
          available ^= 1 << b;
          memo[available] = btRes;
          if (d) btRes += lastSum;
          cur -= lastSum;
          return btRes;
        }
      }
    }
  }

  return bt(0);
};