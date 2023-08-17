# Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

# You must write an algorithm that runs in O(n) time.

 

# Example 1:

# Input: nums = [100,4,200,1,3,2]
# Output: 4
# Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
# Example 2:

# Input: nums = [0,3,7,2,5,8,4,6,0,1]
# Output: 9
 

# Constraints:

# 0 <= nums.length <= 105
# -109 <= nums[i] <= 109

from typing import List
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums) #O(n)
        longest = 0

        # find starting numbers
        #     numbers that do not have a consecutive number preceding it
        # keep track of length of sequence
        # compare current length with longest length thus far
        #     update length when needed

        for n in num_set:
            current_length = 1
            preceding_val = n-1

            if preceding_val not in num_set:
                current_val = n

                while current_val+1 in num_set:
                    current_length += 1
                    current_val += 1
                
                longest = max(current_length, longest)

        return longest
