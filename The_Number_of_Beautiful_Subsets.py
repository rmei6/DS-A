# You are given an array nums of positive integers and a positive integer k.

# A subset of nums is beautiful if it does not contain two integers with an absolute difference equal to k.

# Return the number of non-empty beautiful subsets of the array nums.

# A subset of nums is an array that can be obtained by deleting some (possibly none) elements from nums. Two subsets are different if and only if the chosen indices to delete are different.

 

# Example 1:

# Input: nums = [2,4,6], k = 2
# Output: 4
# Explanation: The beautiful subsets of the array nums are: [2], [4], [6], [2, 6].
# It can be proved that there are only 4 beautiful subsets in the array [2,4,6].
# Example 2:

# Input: nums = [1], k = 1
# Output: 1
# Explanation: The beautiful subset of the array nums is [1].
# It can be proved that there is only 1 beautiful subset in the array [1].
 

# Constraints:

# 1 <= nums.length <= 20
# 1 <= nums[i], k <= 1000

from typing import List
from collections import defaultdict
from functools import cache

class Solution:
    def beautifulSubsets(self, nums: List[int], k: int) -> int:
        @cache
        # ways of choosing from streaks[si][i:]
        def ways(i, si):
            if i >= len(streaks[si]):
                return 1
            # there are 2**rep-1 ways of choosing at least 
            # one of streak[i].
            return ways(i+1, si) + (2**reps[streaks[si][i]]-1) * ways(i+2, si)
        
        reps = defaultdict(int)
        mark = {} # -1 for start of streak, 1 otherwise

        for num in nums:
            mark[num] = -1

        for num in nums:
            if reps[num]:
                reps[num] += 1
            else:
                if num - k in mark:
                    mark[num] = 1
                reps[num] = 1

        streaks = []
        for num in nums:
            if num not in mark or mark[num] == 1:
                continue
            curr = num
            streaks.append([])
            while curr in mark:
                streaks[-1].append(curr)
                del mark[curr]
                curr = curr + k
        
        prod = 1
        for i in range(len(streaks)):
            prod *= ways(0, i)
        return prod - 1 # don't consider empty subset