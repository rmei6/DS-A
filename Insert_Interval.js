function insert_interval(intervals, newInterval) {
  // // console.log(intervals)
  // // console.log(newInterval)
  // if((newInterval[0] > intervals[intervals.length-1][1]) && (newInterval[1] < intervals[intervals.length-1][0])){
  //     intervals.push(newInterval)
  //     // console.log(intervals)
  //     return intervals
  // }else if(newInterval[1] < intervals[0][0]){
  //     intervals.unshift(newInterval)
  //     // console.log(intervals)
  //     return intervals
  // }
  // let interval = [null,null]
  // let pastIntervals = []
  // for(let i = 0; i < intervals.length; i++){
  //         if(interval[0] === null){
  //             if((intervals[i][0] <= newInterval[0]) && (intervals[i][1] >= newInterval[0])){
  //                 interval[0] = intervals[i][0]
  //             }else{
  //                 pastIntervals.push(intervals[i])
  //             }
  //         }else if(interval[1] === null){
  //             if(intervals[i][0] > newInterval[1]){
  //                 interval[1] = Math.max(newInterval[1],intervals[i-1][1])
  //                 pastIntervals.push(interval)
  //                 // console.log(pastIntervals.concat(intervals.slice(i)))
  //                 return pastIntervals.concat(intervals.slice(i)) 
  //             }else if(intervals[i][1] > newInterval[1]){
  //                 interval[1] = intervals[i][1]
  //                 pastIntervals.push(interval)
  //                 // console.log(pastIntervals.concat(intervals.slice(i+1)))
  //                 return pastIntervals.concat(intervals.slice(i+1))
  //             }
  //         }
  // }
  let n = intervals.length

  if (n === 0) return [newInterval]
  if (newInterval[1] < intervals[0][0]) return [newInterval, ...intervals]
  if (newInterval[0] > intervals[n-1][1]) return [...intervals, newInterval]

  let res = new Array()
  let i = 0
  for (i ; i < n; i++) {
      let s = newInterval[0]
      if (s > intervals[i][1]) res.push(intervals[i])
      else if ( s >= intervals[i][0] && s <= intervals[i][1]) {
          newInterval[0] = intervals[i][0]
          break
      }
      else if (s < intervals[i][0]) {
          break
      }
  }

  for (i ; i < n; i++) {
      let e = newInterval[1]
      if (e >= intervals[i][0] && e <= intervals[i][1]) {
          newInterval[1] = intervals[i][1]
          res.push(newInterval)
          i++
          break
      }
      else if (e > intervals[i][1] && i == n-1) {
          res.push(newInterval)
      }
      else if (e < intervals[i][0]) {
          res.push(newInterval)
          break
      }
  }

  for (i; i<n ; i++) {
      res.push(intervals[i])
  }
  return res
}