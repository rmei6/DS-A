// Given the array houses where houses[i] is the location of the ith house along a street and an integer k, allocate k mailboxes in the street.

// Return the minimum total distance between each house and its nearest mailbox.

// The test cases are generated so that the answer fits in a 32-bit integer.

 

// Example 1:


// Input: houses = [1,4,8,10,20], k = 3
// Output: 5
// Explanation: Allocate mailboxes in position 3, 9 and 20.
// Minimum total distance from each houses to nearest mailboxes is |3-1| + |4-3| + |9-8| + |10-9| + |20-20| = 5 
// Example 2:


// Input: houses = [2,3,5,12,18], k = 2
// Output: 9
// Explanation: Allocate mailboxes in position 3 and 14.
// Minimum total distance from each houses to nearest mailboxes is |2-3| + |3-3| + |5-3| + |12-14| + |18-14| = 9.
 

// Constraints:

// 1 <= k <= houses.length <= 100
// 1 <= houses[i] <= 104
// All the integers of houses are unique.

// time: O(n^3)
// space: O(n^2)

/**
 * @param {number[]} houses
 * @param {number} k
 * @return {number}
 */
var minDistance = function(houses, k) {
  let n = houses.length;
  let sorted = houses.sort((a,b)=> a - b)
  costs = new Array(n)
  for (let i = 0; i < n; i++){
      costs[i] = new Array(n).fill(0)
  }
  const memo = new Array(100)
  
  for (let i = 0; i < 100; i++){
      memo[i] = new Array(100)
  }
  
  for (let i = 0 ; i < n ; i++){
      for (let j = 0; j < n ; j++){
          let median = sorted[Math.floor((i + j) / 2)]
          for (let t = i; t < j+1; t++){
              costs[i][j] += Math.abs(median - sorted[t])
          }
      }
  }

  const dp = (k, i ) => {
      if (k === 0 && i === n) return 0;
      if (k === 0 || i === n) return Infinity;
      if (memo[k][i] != null) return memo[k][i]
      let ans = Infinity
      for (let j = i; j < n; j++){
          let cost = costs[i][j]
          ans = Math.min(ans , cost + dp(k - 1, j + 1))
      }
      memo[k][i] = ans
      return ans
  }
  
  return dp(k, 0)
};