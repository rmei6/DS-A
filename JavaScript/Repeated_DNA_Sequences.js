var findRepeatedDnaSequences = function(s) {
  let count = {}
  let dup = []
  for(let i = 0;i <= s.length - 10;i++){
      let sub = s.substring(i,i+10)
      if(count[sub] == undefined){
          count[sub] = 1
      }else{
          count[sub] += 1
      }
  }
  for(var key in count){
      if(count[key] > 1){dup.push(key)}
  }
  return dup
};