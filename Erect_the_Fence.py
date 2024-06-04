# You are given an array trees where trees[i] = [xi, yi] represents the location of a tree in the garden.

# Fence the entire garden using the minimum length of rope, as it is expensive. The garden is well-fenced only if all the trees are enclosed.

# Return the coordinates of trees that are exactly located on the fence perimeter. You may return the answer in any order.

 

# Example 1:


# Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
# Output: [[1,1],[2,0],[4,2],[3,3],[2,4]]
# Explanation: All the trees will be on the perimeter of the fence except the tree at [2, 2], which will be inside the fence.
# Example 2:


# Input: trees = [[1,2],[2,2],[4,2]]
# Output: [[4,2],[2,2],[1,2]]
# Explanation: The fence forms a line that passes through all the trees.
 

# Constraints:

# 1 <= trees.length <= 3000
# trees[i].length == 2
# 0 <= xi, yi <= 100
# All the given positions are unique.

from typing import List
import itertools

# Monotone Chain Algorithm
class Solution(object):
    def outerTrees(self, trees: List[List[int]]) -> List[List[int]]:
	
        def ccw(A, B, C):
            return (B[0]-A[0])*(C[1]-A[1]) - (B[1]-A[1])*(C[0]-A[0])

        if len(trees) <= 1:
            return trees

        hull = []
        trees.sort()
        for i in itertools.chain(range(len(trees)), reversed(range(len(trees)-1))):
            while len(hull) >= 2 and ccw(hull[-2], hull[-1], trees[i]) < 0:
                hull.pop()
            hull.append(trees[i])
        hull.pop()

        for i in range(1, (len(hull)+1)//2):
            if hull[i] != hull[-1]:
                break
            hull.pop()
        return hull