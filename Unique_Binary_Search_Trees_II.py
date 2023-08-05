# Given an integer n, return all the structurally unique BST's (binary search trees), which has exactly n nodes of unique values from 1 to n. Return the answer in any order.

 

# Example 1:


# Input: n = 3
# Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
# Example 2:

# Input: n = 1
# Output: [[1]]
 

# Constraints:

# 1 <= n <= 8

# Definition for a binary tree node.

from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        def generate(l, r):   # split between [l, r)
            if (l == r):
                return [None]
            nodes = []
            for i in range(l, r):
                for lchild in generate(l, i):
                    for rchild in generate(i+1, r):
                        node = TreeNode(i+1)   # +1 to convert the index to the actual value
                        node.left = lchild
                        node.right = rchild
                        nodes.append(node)
            return nodes
        return generate(0, n) if n else []