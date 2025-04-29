// Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.

// You must write an algorithm that runs in linear time and uses linear extra space.

 

// Example 1:

// Input: nums = [3,6,9,1]
// Output: 3
// Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.
// Example 2:

// Input: nums = [10]
// Output: 0
// Explanation: The array contains less than 2 elements, therefore return 0.
 

// Constraints:

// 1 <= nums.length <= 10^5
// 0 <= nums[i] <= 10^9

// bucket sort
// time and space: O(n), fitting requirements

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
  if (nums.length < 2) return 0
  let hi = 0, lo = 2e9, ans = 0
  for (let n of nums)
      hi = Math.max(hi, n), lo = Math.min(lo, n)
  let bsize = ~~((hi - lo) / (nums.length - 1)) || 1,
      buckets = Array.from({length: ~~((hi - lo) / bsize) + 1}, () => [])
  for (let n of nums)
      buckets[~~((n - lo) / bsize)].push(n)
  let currhi = 0
  for (let b of buckets) {
      if (!b.length) continue
      let prevhi = currhi || b[0], currlo = b[0]
      for (let n of b) 
          currhi = Math.max(currhi, n), currlo = Math.min(currlo, n)
      ans = Math.max(ans, currlo - prevhi)
  }
  return ans
};