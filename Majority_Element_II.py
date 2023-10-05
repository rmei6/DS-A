# Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

 

# Example 1:

# Input: nums = [3,2,3]
# Output: [3]
# Example 2:

# Input: nums = [1]
# Output: [1]
# Example 3:

# Input: nums = [1,2]
# Output: [1,2]
 

# Constraints:

# 1 <= nums.length <= 5 * 104
# -109 <= nums[i] <= 109
 

# Follow up: Could you solve the problem in linear time and in O(1) space?

from typing import List

class Solution:
	def majorityElement(self, nums: List[int]) -> List[int]:
			candidates = {}
			k = 3
			for num in nums:
				if num in candidates:
					candidates[num] += 1
				elif len(candidates) < k:
					candidates[num] = 1
				else:
					temp={}
					for c in candidates:
						candidates[c]-=1
						if candidates[c] >= 1:
							temp[c] = candidates[c]
					candidates = temp
			out = [k for k in candidates if nums.count(k) > len(nums) // 3]          
			return out