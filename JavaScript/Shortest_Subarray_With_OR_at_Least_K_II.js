// You are given an array nums of non-negative integers and an integer k.

// An array is called special if the bitwise OR of all of its elements is at least k.

// Return the length of the shortest special non-empty 
// subarray
//  of nums, or return -1 if no special subarray exists.

 

// Example 1:

// Input: nums = [1,2,3], k = 2

// Output: 1

// Explanation:

// The subarray [3] has OR value of 3. Hence, we return 1.

// Example 2:

// Input: nums = [2,1,8], k = 10

// Output: 3

// Explanation:

// The subarray [2,1,8] has OR value of 11. Hence, we return 3.

// Example 3:

// Input: nums = [1,2], k = 0

// Output: 1

// Explanation:

// The subarray [1] has OR value of 1. Hence, we return 1.

 

// Constraints:

// 1 <= nums.length <= 2 * 105
// 0 <= nums[i] <= 109
// 0 <= k <= 109

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function(nums, k) {
  const bitArray = new Array(10 * 5).fill(0);
  let res = Number.MAX_VALUE;
  let left = 0;
  for (let rightBorder = 0; rightBorder < nums.length ; rightBorder++) {
    let curSum = 0;
    // compute the bit/sum.
    for (let idx = 0; idx < bitArray.length; idx++) {
      bitArray[idx] += (nums[rightBorder] >> idx) & 1 === 1 ? 1 : 0;
      if (bitArray[idx] >= 1) {
        curSum |= (1 << idx);
      }
    }
    while (left <= rightBorder && curSum >= k) {
      res = Math.min(res, rightBorder - left + 1);
      curSum = 0;
      for (let idx = 0; idx < bitArray.length; idx++) {
        bitArray[idx] += (nums[left] >> idx) & 1 === 1 ? -1 : 0;
        if (bitArray[idx] >= 1) {
          curSum |= (1 << idx);
        }
      }
      left++;
    }
  }
  return res === Number.MAX_VALUE ? -1 : res;
};