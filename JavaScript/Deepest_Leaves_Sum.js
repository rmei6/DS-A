// Given the root of a binary tree, return the sum of values of its deepest leaves.
 

// Example 1:


// Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
// Output: 15
// Example 2:

// Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
// Output: 19
 

// Constraints:

// The number of nodes in the tree is in the range [1, 10^4].
// 1 <= Node.val <= 100

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function(root) {
  function getDepth(node) {
      if(!node) return 0;
      return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
  }

  function dfs(node, height) {
      if(!node) return 0;
      if(height === 1) return node.val;
      return dfs(node.left, height - 1) + dfs(node.right, height - 1);
  }

  let depth = getDepth(root);
  return dfs(root, depth);
};