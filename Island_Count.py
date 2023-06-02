# Write a function, island_count, that takes in a grid containing Ws and Ls. W represents water and L represents land. The function should return the number of islands on the grid. An island is a vertically or horizontally connected region of land.
# test_00
# grid = [
#   ['W', 'L', 'W', 'W', 'W'],
#   ['W', 'L', 'W', 'W', 'W'],
#   ['W', 'W', 'W', 'L', 'W'],
#   ['W', 'W', 'L', 'L', 'W'],
#   ['L', 'W', 'W', 'L', 'L'],
#   ['L', 'L', 'W', 'W', 'W'],
# ]

#Attempt
def island_count(grid):
	land = set()
	for i,island in enumerate(grid):
		for j,position in enumerate(island):
      if(position == 'L'):
        land.append([i,j])
  count = 0
  while(land.length > 0):
    get_island()
    count += 1
  return count

  def get_island():
    seen = []
    just_saw = []
    just_saw.append(land[0])
    while(just_saw.length > 0):
      place = just_saw.pop()
      X,y = place[0],place[1]
      possible_land = [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]
      for pos in possible_land:
        if(pos in land):
          just_saw.append(pos)
      seen.append(place)
    land.difference_update(seen)

#Solution
def island_count(grid):
  visited = set()
  count = 0
  for r in range(len(grid)):
    for c in range(len(grid[0])):
      if explore(grid, r, c, visited) == True:
        count += 1
  return count



def explore(grid, r, c, visited):
  row_inbounds = 0 <= r < len(grid)
  col_inbounds = 0 <= c < len(grid[0])
  if not row_inbounds or not col_inbounds:
    return False
  
  if grid[r][c] == 'W':
    return False
  
  pos = (r, c)
  if pos in visited:
    return False
  visited.add(pos)
  
  explore(grid, r - 1, c, visited)
  explore(grid, r + 1, c, visited)  
  explore(grid, r, c - 1, visited)
  explore(grid, r, c + 1, visited)
  
  return True
