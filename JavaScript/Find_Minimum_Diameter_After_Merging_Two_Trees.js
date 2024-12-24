// There exist two undirected trees with n and m nodes, numbered from 0 to n - 1 and from 0 to m - 1, respectively. You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.

// You must connect one node from the first tree with another node from the second tree with an edge.

// Return the minimum possible diameter of the resulting tree.

// The diameter of a tree is the length of the longest path between any two nodes in the tree.

 

// Example 1:

// Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]

// Output: 3

// Explanation:

// We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.

// Example 2:


// Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]

// Output: 5

// Explanation:

// We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.

 

// Constraints:

// 1 <= n, m <= 105
// edges1.length == n - 1
// edges2.length == m - 1
// edges1[i].length == edges2[i].length == 2
// edges1[i] = [ai, bi]
// 0 <= ai, bi < n
// edges2[i] = [ui, vi]
// 0 <= ui, vi < m
// The input is generated such that edges1 and edges2 represent valid trees.

/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
var minimumDiameterAfterMerge = function (edges1, edges2) {
  var getDiameter = function (edges) {
      let map = Array(edges.length + 1).fill().map(() => []);

      for (let [i, j] of edges) {
          map[i].push(j);
          map[j].push(i);
      }

      let res = 0;

      var dfs = function (node, parent) {
          let maxDepth = 1;
          for (let neighbor of map[node]) {
              if (neighbor === parent) continue;
              let depth = dfs(neighbor, node);
              res = Math.max(res, maxDepth + depth);
              maxDepth = Math.max(maxDepth, 1 + depth);
          }
          return maxDepth;
      };

      dfs(0, -1);

      return res;
  };

  let d1 = getDiameter(edges1);
  let d2 = getDiameter(edges2);

  return Math.max(d1 - 1, d2 - 1, Math.floor(d1 / 2) + Math.floor(d2 / 2) + 1);
};