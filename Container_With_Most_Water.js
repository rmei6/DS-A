var maxArea = function(height) {
  let vol = 0
  let i=0,j=height.length - 1
  while(i < j){
      let new_vol = Math.min(height[i],height[j]) * (j-i)
      if (new_vol > vol){vol = new_vol}
      if(height[i] <= height[j]){
          i += 1
      }else{
          j -= 1
      }
  }
  return vol
};  //pairboarding