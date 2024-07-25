# Given an array of integers nums, sort the array in ascending order and return it.

# You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.

 

# Example 1:

# Input: nums = [5,2,3,1]
# Output: [1,2,3,5]
# Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
# Example 2:

# Input: nums = [5,1,1,2,0,0]
# Output: [0,0,1,1,2,5]
# Explanation: Note that the values of nums are not necessairly unique.
 

# Constraints:

# 1 <= nums.length <= 5 * 104
# -5 * 104 <= nums[i] <= 5 * 104

from typing import List

class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        def mergeSort(array, l, r):
            if l >= r:
                return
            
            mid = (l + r) // 2
            mergeSort(array, l, mid)
            mergeSort(array, mid + 1, r)

            left = array[l:mid+1]
            right = array[mid+1:r+1]

            i = j = 0
            k = l
            
            while i < len(left) or j < len(right):
                if i < len(left) and j < len(right):
                    if left[i] <= right[j]:
                        array[k] = left[i]
                        i += 1
                    else:
                        array[k] = right[j]
                        j += 1
                    k += 1
                else:
                    if i < len(left):
                        array[k] = left[i]
                        i += 1
                        k += 1
                    else:
                        array[k] = right[j]
                        j += 1
                        k += 1
        
        mergeSort(nums, 0, len(nums)-1)
        return nums

        