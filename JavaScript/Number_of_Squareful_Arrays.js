// An array is squareful if the sum of every pair of adjacent elements is a perfect square.

// Given an integer array nums, return the number of permutations of nums that are squareful.

// Two permutations perm1 and perm2 are different if there is some index i such that perm1[i] != perm2[i].

 

// Example 1:

// Input: nums = [1,17,8]
// Output: 2
// Explanation: [1,8,17] and [17,8,1] are the valid permutations.
// Example 2:

// Input: nums = [2,2,2]
// Output: 1
 

// Constraints:

// 1 <= nums.length <= 12
// 0 <= nums[i] <= 10^9

/**
 * @param {number[]} nums
 * @return {number}
 */
const isSquare = (a,b) => {
  const root = parseInt(Math.sqrt(a + b));
  return root * root === a + b;
}

var numSquarefulPerms = function(nums) {
  // edge case for array with one element
  if (nums.length == 1) {return 0;}
  let results = 0;
  let res = [];
  let used = {};
  
  nums.sort((a, b) => a - b);
  var traverse = function() {
      if (res.length === nums.length) {
          return results++;
      }
  
      let lastPushed;
      for (let i = 0; i < nums.length; i++) {
          if (used[i] || nums[i] === lastPushed || (res.length && !isSquare(nums[i], res[res.length - 1]))) {
              continue;
          }

          used[i] = true;
          lastPushed = nums[i];
          res.push(nums[i]);
          traverse();
          res.pop();
          used[i] = false;
      }
  }
  traverse(0);

  return results;
};