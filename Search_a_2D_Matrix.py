# You are given an m x n integer matrix matrix with the following two properties:

# Each row is sorted in non-decreasing order.
# The first integer of each row is greater than the last integer of the previous row.
# Given an integer target, return true if target is in matrix or false otherwise.

# You must write a solution in O(log(m * n)) time complexity.

 

# Example 1:


# Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
# Output: true
# Example 2:


# Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
# Output: false
 

# Constraints:

# m == matrix.length
# n == matrix[i].length
# 1 <= m, n <= 100
# -104 <= matrix[i][j], target <= 104

from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # find row in which target could be
        row = len(matrix) - 1
        for i in range(len(matrix)-1):
            if(target >= matrix[i][0] and target < matrix[i+1][0]):
                row = i
                break
        # search row for target
        # stop when nums are larger than target
        for num in matrix[row]:
            if(num == target):
                return True
            elif(num > target):
                return False
        return False