// You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

// Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

// If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

 

// Example 1:



// Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
// Output: 0.25000
// Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
// Example 2:



// Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
// Output: 0.30000
// Example 3:



// Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
// Output: 0.00000
// Explanation: There is no path between 0 and 2.
 

// Constraints:

// 2 <= n <= 10^4
// 0 <= start, end < n
// start != end
// 0 <= a, b < n
// a != b
// 0 <= succProb.length == edges.length <= 2*10^4
// 0 <= succProb[i] <= 1
// There is at most one edge between every two nodes.

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
var maxProbability = function(n, edges, succProb, start, end) {
  // const graph =  new Array(n).fill(null).map(()=>[]);

  // for(let i=0;i<edges.length;i++){
  //   const [a, b] = edges[i];
  //   graph[a].push([b, succProb[i]]);
  //   graph[b].push([a, succProb[i]])
  // } 
  // const maxProb = new Array(n).fill(0);

  // maxProb[start] = 1;

  // const queue = [[start, 1]];

  // while(queue.length>0){
  //   const [current, currentProb] = queue.shift();

  //   if(current === end){
  //     return currentProb;
  //   }
  //   for(const[next, prob] of graph[current]){
  //     const newProb = currentProb * prob;

  //     if(newProb > maxProb[next]){
  //       maxProb[next] = newProb;
  //       queue.push([next, newProb]);
  //     }
  //   }
  //   queue.sort((a, b) =>{
  //     return b[1]-a[1];
  //   })
  // }
  // return 0;
  // time exceeded

  // better solution
  const MIN = Number.MIN_SAFE_INTEGER;
  const m = edges.length;

  const adjList = {};
  const dists = new Array(n).fill(MIN);
  
  for (let i = 0; i < n; i++) {
      adjList[i] = [];
  }
  
  for (let i = 0; i < m; i++) {
      const [u, v] = edges[i];
      const weight = succProb[i];
      
      adjList[u].push([v, weight]);
      adjList[v].push([u, weight]);
  }
  
  const maxHeap = new MaxPriorityQueue({ priority: x => x[1] });
  
  maxHeap.enqueue([ start, 1 ]);
  
  while (!maxHeap.isEmpty()) {
      const [ node, prob ] = maxHeap.dequeue().element;
      
      if (node === end) return prob;
      if (dists[node] > prob) continue;
      
      for (const [nei, weight] of adjList[node]) {
          if (prob * weight > dists[nei]) {
              dists[nei] = prob * weight;
              maxHeap.enqueue([nei, dists[nei]]);
          }
      }
  }
  
  return 0;
};

