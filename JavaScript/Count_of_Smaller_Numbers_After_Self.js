// Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].

 

// Example 1:

// Input: nums = [5,2,6,1]
// Output: [2,1,1,0]
// Explanation:
// To the right of 5 there are 2 smaller elements (2 and 1).
// To the right of 2 there is only 1 smaller element (1).
// To the right of 6 there is 1 smaller element (1).
// To the right of 1 there is 0 smaller element.
// Example 2:

// Input: nums = [-1]
// Output: [0]
// Example 3:

// Input: nums = [-1,-1]
// Output: [0,0]
 

// Constraints:

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

Array.prototype.bisect_left = function(target) {
  let start = 0,
    end = this.length - 1,
    mid = 0;
  while (this[mid] !== target) {
    mid = (start + end) >> 1;
    if (this[mid] > target) end = mid - 1;
    else if (this[mid] < target) start = mid + 1;
  }
  while (this[mid] === this[mid - 1]) mid--;
  return mid;
}


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function(nums) {
  let arr = [...nums].sort((a, b) => a - b), ans = [];
//   console.log({length: nums.length});
  if (nums.length > 999)
    for(let i = 0; i < nums.length; i++) {
      ans[i] = arr.bisect_left(nums[i]);
      arr.splice(ans[i], 1);
    }
  else
    for(let i = 0; i < nums.length; i++) {
      ans[i] = arr.indexOf(nums[i]);
      arr.splice(ans[i], 1);
    }
  return ans;
};