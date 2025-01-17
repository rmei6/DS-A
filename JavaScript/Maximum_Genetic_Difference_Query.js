// There is a rooted tree consisting of n nodes numbered 0 to n - 1. Each node's number denotes its unique genetic value (i.e. the genetic value of node x is x). The genetic difference between two genetic values is defined as the bitwise-XOR of their values. You are given the integer array parents, where parents[i] is the parent for node i. If node x is the root of the tree, then parents[x] == -1.

// You are also given the array queries where queries[i] = [nodei, vali]. For each query i, find the maximum genetic difference between vali and pi, where pi is the genetic value of any node that is on the path between nodei and the root (including nodei and the root). More formally, you want to maximize vali XOR pi.

// Return an array ans where ans[i] is the answer to the ith query.

 

// Example 1:


// Input: parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
// Output: [2,3,7]
// Explanation: The queries are processed as follows:
// - [0,2]: The node with the maximum genetic difference is 0, with a difference of 2 XOR 0 = 2.
// - [3,2]: The node with the maximum genetic difference is 1, with a difference of 2 XOR 1 = 3.
// - [2,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.
// Example 2:


// Input: parents = [3,7,-1,2,0,7,0,2], queries = [[4,6],[1,15],[0,5]]
// Output: [6,14,7]
// Explanation: The queries are processed as follows:
// - [4,6]: The node with the maximum genetic difference is 0, with a difference of 6 XOR 0 = 6.
// - [1,15]: The node with the maximum genetic difference is 1, with a difference of 15 XOR 1 = 14.
// - [0,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.
 

// Constraints:

// 2 <= parents.length <= 105
// 0 <= parents[i] <= parents.length - 1 for every node i that is not the root.
// parents[root] == -1
// 1 <= queries.length <= 3 * 104
// 0 <= nodei <= parents.length - 1
// 0 <= vali <= 2 * 105

// dfs and trie

class Trie{
  constructor(){
      this.T = [-1, -1]
  }
  insert(val){
      let cur = this.T, firstchangeNode = null, fcIndex = null
      for(let i = 17; i >= 0; i--){ // a node can be up to (10^5), whose log2 is 17, so at most we need 17 bits
          let next = Number(Boolean(val & (1 << i)))
          if(cur[next] === -1){
              if(firstchangeNode === null)
                  firstchangeNode = cur, fcIndex = next
              cur[next] = [-1, -1]
          }
          cur = cur[next]
      }
      // memorize the first change made during the insertion of val
      return [firstchangeNode, fcIndex] 
  }
  search(val){
      let cur = this.T, res = 0
      for(let i = 17; i >= 0; i--){
          let xor = 1 ^ Number(Boolean(val&(1 << i)))
          if(cur[xor] !== -1)
              cur = cur[xor], res |= (1 << i)
          else
              cur = cur[xor ^ 1]
      }
      return res
  }
}

/**
* @param {number[]} parents
* @param {number[][]} queries
* @return {number[]}
*/
var maxGeneticDifference = function(parents, queries) {
  let root, n = parents.length, res = [...Array(n)].map(d=>{}),
      Q = [...Array(n)].map(d=>[]), adj = [...Array(n)].map(d=>[])
  for(let [node,val] of queries)
      Q[node].push(val),
      res[node]={}, res[node][val] = undefined
  // adjacency list
  for(let i = 0; i < parents.length; i++)
      if(parents[i] !== -1)
          adj[parents[i]].push(i)
      else 
          root = i
  let T = new Trie()
  let dfs = (node) => {
      let [fnode, index] = T.insert(node)
      for(let q of Q[node])
          res[node][q] = T.search(q) 
      for(let nei of adj[node])
          dfs(nei)
      if(fnode !== null) // if trie was changed, revert the change
          fnode[index] =- 1
  }
  dfs(root)
  return queries.map(([node,val])=>res[node][val])
};