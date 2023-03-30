var isIsomorphic = function(s, t) {
  l_to_l = {}
  for(let i = 0; i < s.length;i++){
      if(l_to_l[s[i]] === undefined){
          if(Object.values(l_to_l).includes(t[i])){
              return false
          }
          l_to_l[s[i]] = t[i]
      }else if(l_to_l[s[i]] != t[i]){
          return false
      }
  }
  return true
};