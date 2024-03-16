# Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

 

# Example 1:

# Input: nums = [0,1]
# Output: 2
# Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
# Example 2:

# Input: nums = [0,1,0]
# Output: 2
# Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
 

# Constraints:

# 1 <= nums.length <= 105
# nums[i] is either 0 or 1.

from typing import List

class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        n = len(nums)
        n1 = 0
        n0 = 0
        maxLen = 0
        mp = {}
        mp[0] = -1
        for i in range(n):
            n1 += nums[i]
            n0 = (i + 1) - n1
            if (n1 - n0) in mp:
                maxLen = max(maxLen, i - mp[n1 - n0])
            else:
                mp[n1 - n0] = i
        return maxLen