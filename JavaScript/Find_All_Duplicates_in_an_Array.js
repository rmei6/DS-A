// Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

// You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output

 

// Example 1:

// Input: nums = [4,3,2,7,8,2,3,1]
// Output: [2,3]
// Example 2:

// Input: nums = [1,1,2]
// Output: [1]
// Example 3:

// Input: nums = [1]
// Output: []
 

// Constraints:

// n == nums.length
// 1 <= n <= 105
// 1 <= nums[i] <= n
// Each element in nums appears once or twice.

// time and space: O(n)
// histogram method

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
  if (!nums.length || nums.length === 1)
      return [];

  const hist = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++)
      hist[nums[i]]++;

  return hist.map((e, i) => (e > 1) ? i : -1).filter((e) => e !== -1);
};