# breadth first values
# Write a function, breadthFirstValues, that takes in the root of a binary tree. The function should return an array containing all values of the tree in breadth-first order.



from collections import deque
def BreadthFirstSearch(root):
	if(root == None):
		return []
	queue = deque([root]) #log(n)
	values = []	#n
	while(len(queue) != 0):
		current = queue.popleft()
		values.append(current.val)
		if(current.left):
			queue.append(current.left)
		if(current.right):
			queue.append(current.right)
	return values

