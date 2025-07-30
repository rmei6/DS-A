// You are given an integer array nums of size n.

// Consider a non-empty subarray from nums that has the maximum possible bitwise AND.

// In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
// Return the length of the longest such subarray.

// The bitwise AND of an array is the bitwise AND of all the numbers in it.

// A subarray is a contiguous sequence of elements within an array.

 

// Example 1:

// Input: nums = [1,2,3,3,2,2]
// Output: 2
// Explanation:
// The maximum possible bitwise AND of a subarray is 3.
// The longest subarray with that value is [3,3], so we return 2.
// Example 2:

// Input: nums = [1,2,3,4]
// Output: 1
// Explanation:
// The maximum possible bitwise AND of a subarray is 4.
// The longest subarray with that value is [4], so we return 1.
 

// Constraints:

// 1 <= nums.length <= 105
// 1 <= nums[i] <= 106

// time: O(2n) => O(n)
// space: O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
  let length = 0;
  let maxVal = 0;

  // find max value
  for (let i = 0; i < nums.length; i++) {
      maxVal = Math.max(maxVal, nums[i]);
  }

  // find longest contiguous subarray of max value
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
      if (nums[i] === maxVal) {
          count++;
          length = Math.max(length, count);
      } else {
          count = 0;
      }
  }

  return length;
};

/**
 * @param {number[]} nums
 * @return {number}
 */

// better single pass approach
var longestSubarray = function(nums) {
    let max_num = 0;
    let i = 0;
    let k = 0;
    let ans = 0;
    for (i = nums.length - 1; i >= 0; i--) {
        if (nums[i] > max_num) {
            max_num = nums[i];
            k = 1;
            ans = 1;
        } else if (nums[i] == max_num) {
            k++;
            if (k > ans) {
                ans = k;
            }
        } else {
            k = 0;
        }
    };
    return ans;
};