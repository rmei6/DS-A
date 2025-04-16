// Given an integer array nums and an integer k, return the number of good subarrays of nums.

// A subarray arr is good if there are at least k pairs of indices (i, j) such that i < j and arr[i] == arr[j].

// A subarray is a contiguous non-empty sequence of elements within an array.

 

// Example 1:

// Input: nums = [1,1,1,1,1], k = 10
// Output: 1
// Explanation: The only good subarray is the array nums itself.
// Example 2:

// Input: nums = [3,1,4,3,2,2,4], k = 2
// Output: 4
// Explanation: There are 4 different good subarrays:
// - [3,1,4,3,2,2] that has 2 pairs.
// - [3,1,4,3,2,2,4] that has 3 pairs.
// - [1,4,3,2,2,4] that has 2 pairs.
// - [4,3,2,2,4] that has 2 pairs.
 

// Constraints:

// 1 <= nums.length <= 10^5
// 1 <= nums[i], k <= 10^9

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function(nums, k) {
  const freq = new Map();
  let left = 0;
  let pairCount = 0;
  let result = 0;

  for (let right = 0; right < nums.length; right++) {
      const count = freq.get(nums[right]) || 0;
      pairCount += count;
      freq.set(nums[right], count + 1);

      while (pairCount >= k) {
          result += nums.length - right;
          const leftCount = freq.get(nums[left]);
          freq.set(nums[left], leftCount - 1);
          pairCount -= leftCount - 1;
          left++;
      }
  }

  return result;
};