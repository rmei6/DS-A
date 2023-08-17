# Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

 

# Example 1:

# Input: nums = [1,2,3,1], k = 3
# Output: true
# Example 2:

# Input: nums = [1,0,1,1], k = 1
# Output: true
# Example 3:

# Input: nums = [1,2,3,1,2,3], k = 2
# Output: false
 

# Constraints:

# 1 <= nums.length <= 105
# -109 <= nums[i] <= 109
# 0 <= k <= 105

from typing import List

class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        if k == 0: return False

        window = set()
        left, right = 0 , 0

        #store indices in object along with value
            #if we find the value again, we can subtract the difference
        #update value stored in obj if duplicate is not in range

        while right <= len(nums) - 1:

            #conditional that moves the left pointer when our window condition is invalid
            if right - left > k:
                window.discard(nums[left])
                left += 1

            #checking for solution
            if nums[right] in window:
                return True
            window.add(nums[right])
            right += 1
        return False
