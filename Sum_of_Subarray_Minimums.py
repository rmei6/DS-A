# Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.

 

# Example 1:

# Input: arr = [3,1,2,4]
# Output: 17
# Explanation: 
# Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
# Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
# Sum is 17.
# Example 2:

# Input: arr = [11,81,94,43,3]
# Output: 444
 

# Constraints:

# 1 <= arr.length <= 3 * 104
# 1 <= arr[i] <= 3 * 104

from typing import List
import math

class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        arr = [-math.inf] + arr + [-math.inf]
        n = len(arr)
        st = []
        res = 0
        
        for i in range(n):
            
            while st and arr[st[-1]] > arr[i]: # monotonic increasing stack
                mid = st.pop()
                left = st[-1] # previous smaller element
                right = i #next smaller element
                
                res += arr[mid] * (mid - left) * (right - mid)
            
            st.append(i)
        return res %(10**9 + 7)