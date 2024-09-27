// You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.

// If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.

// Return the maximum coins you can collect by bursting the balloons wisely.

 

// Example 1:

// Input: nums = [3,1,5,8]
// Output: 167
// Explanation:
// nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
// coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167
// Example 2:

// Input: nums = [1,5]
// Output: 10
 

// Constraints:

// n == nums.length
// 1 <= n <= 300
// 0 <= nums[i] <= 100

// brute force

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
  const N = nums.length;

const B = new Array(N + 2).fill(1);
for (let i = 1; i <= N; i++) {
    B[i] = nums[i - 1];
}

const dp = Array.from({ length: N + 2 }, () => Array(N + 2).fill(0));

for (let length = 1; length <= N; length++) {
    for (let left = 1; left <= N - length + 1; left++) {
        const right = left + length - 1;
        for (let last = left; last <= right; last++) {
            dp[left][right] = Math.max(
                dp[left][right],
                dp[left][last - 1] + B[left - 1] * B[last] * B[right + 1] + dp[last + 1][right]
            );
        }
    }
}

return dp[1][N];
};