function smallest_not_included(A) {
  let hash = {}
  for(let i =0;i< A.length;i++){
      if(hash[A[i]] == undefined){hash[A[i]] = 1}
  }
  let num = 1
  while(hash[num] != undefined){num += 1}
  return num
}