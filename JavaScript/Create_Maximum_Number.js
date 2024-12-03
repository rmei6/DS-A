// You are given two integer arrays nums1 and nums2 of lengths m and n respectively. nums1 and nums2 represent the digits of two numbers. You are also given an integer k.

// Create the maximum number of length k <= m + n from digits of the two numbers. The relative order of the digits from the same array must be preserved.

// Return an array of the k digits representing the answer.

 

// Example 1:

// Input: nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
// Output: [9,8,6,5,3]
// Example 2:

// Input: nums1 = [6,7], nums2 = [6,0,4], k = 5
// Output: [6,7,6,0,4]
// Example 3:

// Input: nums1 = [3,9], nums2 = [8,9], k = 3
// Output: [9,8,9]
 

// Constraints:

// m == nums1.length
// n == nums2.length
// 1 <= m, n <= 500
// 0 <= nums1[i], nums2[i] <= 9
// 1 <= k <= m + n

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
var maxNumber = function(nums1, nums2, k) {
  // helper function to find max subsequence of length t using a stack
const maxSubsequence = (nums, t) => {
  let drop = nums.length - t, stack = [];
  for (let num of nums) {
    while (drop && stack.length && stack[stack.length - 1] < num) {
      stack.pop();
      drop--;
    }
    stack.push(num);
  }
  return stack.slice(0, t);
};

// helper function to merge two subsequences to form the largest possible number
const merge = (sub1, sub2) => {
  const merged = [];
  while (sub1.length || sub2.length) {
    merged.push(sub1 > sub2 ? sub1.shift() : sub2.shift());
  }
  return merged;
};

let result = [];
for (let i = Math.max(0, k - nums2.length); i <= Math.min(k, nums1.length); i++) {
  const currentMax = merge(maxSubsequence(nums1, i), maxSubsequence(nums2, k - i));
  if (currentMax > result) result = currentMax;
}
return result;
};