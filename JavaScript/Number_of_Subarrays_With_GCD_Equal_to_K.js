// Given an integer array nums and an integer k, return the number of subarrays of nums where the greatest common divisor of the subarray's elements is k.

// A subarray is a contiguous non-empty sequence of elements within an array.

// The greatest common divisor of an array is the largest integer that evenly divides all the array elements.

 

// Example 1:

// Input: nums = [9,3,1,2,6,3], k = 3
// Output: 4
// Explanation: The subarrays of nums where 3 is the greatest common divisor of all the subarray's elements are:
// - [9,3,1,2,6,3]
// - [9,3,1,2,6,3]
// - [9,3,1,2,6,3]
// - [9,3,1,2,6,3]
// Example 2:

// Input: nums = [4], k = 7
// Output: 0
// Explanation: There are no subarrays of nums where 7 is the greatest common divisor of all the subarray's elements.
 

// Constraints:

// 1 <= nums.length <= 1000
// 1 <= nums[i], k <= 109

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarrayGCD = function(nums, k) {
  const GCD = (A, B) => {
      if (B == 0) return A;
      return GCD(B, A % B);
  }
 
  let ans = 0;
  for(let i = 0; i < nums.length; i++){
      if(nums[i] == k) ans++;
      let gcd = nums[i];
      for(let j = i + 1; j < nums.length; j++){
          let res = GCD(gcd, nums[j]);
          if(res == k) ans++;
          gcd = res;
      }
  }
  return ans;
 
};