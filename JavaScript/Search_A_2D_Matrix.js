// You are given an m x n integer matrix matrix with the following two properties:

// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.

// You must write a solution in O(log(m * n)) time complexity.

var searchMatrix = function(matrix, target) {
  let start = 0, end = (matrix.length * matrix[0].length) - 1
  while(start <= end) {
      let mid = Math.floor((start + end) / 2)
      let midNum = 
          matrix[Math.floor(mid / matrix[0].length)][mid % matrix[0].length]
      
      if(midNum === target) return true    
      else if(midNum < target) start = mid + 1
      else end = mid - 1
  }
  return false
};