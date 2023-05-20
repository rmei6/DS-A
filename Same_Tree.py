# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        #check value of current node of both trees
        #check for child nodes existence or call recursive function on child nodes and check existence then
        if((p == None and q != None) or (p != None and q == None)):
            return False
        if((p == None and q == None)):
            return True
        if(p.val != q.val):
            return False
        return self.isSameTree(p.right,q.right) and self.isSameTree(p.left,q.left)