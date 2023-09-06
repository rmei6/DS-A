// Write a function, max_path_sum, that takes in the root of a binary tree that contains number values. The function should return the maximum sum of any root to leaf path within the tree.
// You may assume that the input tree is non-empty.

//Attempts
const max_path_sum = function(a){
  return get_sum(a,0)	
}
  
const get_sum = function(a,sum){
  if(a == Null){
    return Number.NEGATIVE_INFINITY
  }
  let total_sum = sum + a.val
  let left_sum = get_sum(a.left,total_sum)
  let right_sum = get_sum(a.right,total_sum)
  return Math.max(left_sum,right_sum)
}
  
const get_sum1 = function(a,sum){
  let total_sum = sum + a.val
  let left_sum = Number.NEGATIVE_INFINITY
  let right_sum = Number.NEGATIVE_INFINITY
  if(a.left != Null){
    left_sum = get_sum1(a.left,total_sum)
  }
  if(a.right != Null){
    right_sum = get_sum1(a.right,total_sum)
  }
  if( left_sum == Number.NEGATIVE_INFINITY && right_sum == Number.NEGATIVE_INFINITY){
    return sum
  }
  return Math.max(left_sum,right_sum)
}
  
//Solution
const maxPathSum = (root) => {
  if (root === null) return -Infinity;
  if (root.left === null && root.right === null) return root.val;

  return root.val + Math.max(maxPathSum(root.left), maxPathSum(root.right));
};
