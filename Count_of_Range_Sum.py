# Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.

# Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.

 

# Example 1:

# Input: nums = [-2,5,-1], lower = -2, upper = 2
# Output: 3
# Explanation: The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.
# Example 2:

# Input: nums = [0], lower = 0, upper = 0
# Output: 1
 

# Constraints:

# 1 <= nums.length <= 105
# -231 <= nums[i] <= 231 - 1
# -105 <= lower <= upper <= 105
# The answer is guaranteed to fit in a 32-bit integer.

# time: O(nlogn) space: O(n)

from typing import List

class Solution:
    def countRangeSum(self, nums: List[int], lower: int, upper: int) -> int:
        prefix = nums.copy()
        for i in range(1, len(nums)):
            prefix[i] += prefix[i-1]
        self.count = 0
        for n in prefix:
            if lower <= n <= upper:
                self.count += 1
        
        def merge(left_arr, right_arr):
            # counting pairs i, j
            start, end = 0, 0 # index of right_arr
            # loop though left_arr to fix i index
            for i in range(len(left_arr)):
                # find the interval of start to end in right_arr
                # sliding windows [start, end]
                while start < len(right_arr) and right_arr[start] - left_arr[i] < lower:
                    start += 1
                while end < len(right_arr) and right_arr[end] - left_arr[i] <= upper:
                    end += 1
                self.count += end - start

            # merge sorted arrays
            l, r = 0, 0
            sorted_arr = []
            while l < len(left_arr) and r < len(right_arr):
                if left_arr[l] < right_arr[r]:
                    sorted_arr.append(left_arr[l])
                    l += 1
                else:
                    sorted_arr.append(right_arr[r])
                    r += 1
            return sorted_arr + left_arr[l:] + right_arr[r:]
        
        def divide(arr):
            if len(arr) <= 1: return arr
            mid = len(arr)//2
            left_arr = divide(arr[:mid])
            right_arr = divide(arr[mid:])
            return merge(left_arr, right_arr)

        divide(prefix)
        return self.count