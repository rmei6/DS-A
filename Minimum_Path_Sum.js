var minPathSum = function(grid) {
  distances = []
  for(let i = 0;i < grid.length;i++){
      distances.push(new Array(grid[0].length))
  }
  // console.log(distances)
  distances[0][0] = grid[0][0]
  for(let i = 0;i < grid.length;i++){
      for(let j = 0;j < grid[0].length;j++){
          if(i == 0 && j == 0){continue}
          if(i == 0){
              distances[i][j] = distances[i][j-1] + grid[i][j]
          }else if(j == 0){
              distances[i][j] = distances[i-1][j] + grid[i][j]
          }else{
              distances[i][j] = Math.min(distances[i-1][j],distances[i][j-1]) + grid[i][j]
          }
      }
  }
  return distances[grid.length - 1][grid[0].length - 1]
};