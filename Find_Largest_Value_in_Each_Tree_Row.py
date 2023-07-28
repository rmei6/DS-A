# Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

 

# Example 1:


# Input: root = [1,3,2,5,3,null,9]
# Output: [1,3,9]
# Example 2:

# Input: root = [1,2,3]
# Output: [1,3]
 

# Constraints:

# The number of nodes in the tree will be in the range [0, 104].
# -231 <= Node.val <= 231 - 1

# Definition for a binary tree node.

from typing import Optional
from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node=root, level=0):
            if not node:
                return
            if len(res)-1 < level:
                res.append(node.val)
            else:
                res[level] = max(node.val, res[level])
            dfs(node.left, level+1)
            dfs(node.right, level+1)
        dfs()
        return res