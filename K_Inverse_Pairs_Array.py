# For an integer array nums, an inverse pair is a pair of integers [i, j] where 0 <= i < j < nums.length and nums[i] > nums[j].

# Given two integers n and k, return the number of different arrays consist of numbers from 1 to n such that there are exactly k inverse pairs. Since the answer can be huge, return it modulo 109 + 7.

 

# Example 1:

# Input: n = 3, k = 0
# Output: 1
# Explanation: Only the array [1,2,3] which consists of numbers from 1 to 3 has exactly 0 inverse pairs.
# Example 2:

# Input: n = 3, k = 1
# Output: 2
# Explanation: The array [1,3,2] and [2,1,3] have exactly 1 inverse pair.
 

# Constraints:

# 1 <= n <= 1000
# 0 <= k <= 1000

class Solution:
    def kInversePairs(self, n: int, k: int) -> int:
        # cumulative sum approach
        dp = [[0] * (k + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            dp[i][0] = cum_sum = 1

            max_pairs = (i * (i - 1)) // 2
            max_k = min(k, max_pairs)

            for j in range(1, max_k + 1):  # there is no point populating dp[n][k] when k > max_k as it will be zero
                cum_sum += dp[i - 1][j]

                if j >= i:  #sliding window
                    cum_sum -= dp[i - 1][j - i]

                dp[i][j] = cum_sum % 1000000007

        return dp[n][k]