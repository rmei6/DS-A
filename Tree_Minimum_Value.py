# Write a function, treeMinValue, that takes in the root of a binary tree that contains number values. The function should return the minimum value within the tree.
# You may assume that the input tree is non-empty.

def treeMinValue(root):
	if(root == None):
		return float('inf')
	return min(root.val,treeMinValue(root.left),treeMinValue(root.right))

