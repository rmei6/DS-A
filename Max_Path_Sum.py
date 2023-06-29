# ​​max path sum
# Write a function, maxPathSum, that takes in a grid as an argument. The function should return the maximum sum possible by traveling a path from the top-left corner to the bottom-right corner. You may only travel through the grid by moving down or right.

def max_path_sum(grid):
	sums = ([0] * len(grid[0])) * len(grid)
	sums[0][0] = grid[0][0]
	for i in range(len(grid)):
		for j in range(len(grid[0])):
			top_value = 0
			right_value = 0
			if(i - 1 >= 0):
				Top_value = sums[i-1][j]
			if(j - 1 >= 0):
				Right_value = sums[i][j-1]
			sums[i][j] = grid[i][j] + max(top_value,right_value)

# -one base case-coords are out of bounds ->return zero
# -second base case-reached return num at that coords

# -make recursive call going right
# -make recursive call going down

# -output: curr val at 0,0 plus the larger of the two nums returned from the two recursive calls

# -Memoization:
# 	-create unique key(row, col)
# 	-you init the dict in the helper function’s argos {}
# 	-Base Case: if key in dict, return val at dict[key]
	
# 	-Look for the return at the end, replace + add the returned value to the memo at dict[key] = return val


def recursive_max_path_sum(grid):
	visited = {}
	return helper(grid,0,0,visited)
def helper(grid,i,j,visited):
	pos = (i, j)
	if( pos in visited):
		return visited[pos]
	if(i >= len(grid[0]) or j >= len(grid)):
		return 0
	if(i == len(grid[0]) and j == len(grid) - 1):
		return grid[i][j]
	
	visited[pos] = grid[i][j] + max(helper(grid,i+1,j),helper(grid,i,j+1))
	return visited[pos]
	
	

# You can assume that all numbers are non-negative.
# test_00
# const grid = [
#   [1, 3, 12],
#   [5, 1, 1],
#   [3, 6, 1],
# ];
# maxPathSum(grid); // -> 18
# test_01
# const grid = [
#   [1, 2, 8, 1],
#   [3, 1, 12, 10],
#   [4, 0, 6, 3],
# ];
# maxPathSum(grid); // -> 36
# test_02
# const grid = [
#   [1, 2, 8, 1],
#   [3, 10, 12, 10],
#   [4, 0, 6, 3],
# ];
# maxPathSum(grid); // -> 39
# test_03
# const grid = [
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
# ];
# maxPathSum(grid); // -> 27
# test_04
# const grid = [
#   [1, 1, 3, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 2, 1, 1, 6, 1, 1, 5, 1, 1, 0, 0, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 5, 1, 1, 1, 1, 0, 1, 1, 1, 1],
#   [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [2, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1],
#   [2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 42, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
#   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
# ];
# maxPathSum(grid); // -> 82

