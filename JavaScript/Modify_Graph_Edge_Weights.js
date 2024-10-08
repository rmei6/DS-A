// You are given an undirected weighted connected graph containing n nodes labeled from 0 to n - 1, and an integer array edges where edges[i] = [ai, bi, wi] indicates that there is an edge between nodes ai and bi with weight wi.

// Some edges have a weight of -1 (wi = -1), while others have a positive weight (wi > 0).

// Your task is to modify all edges with a weight of -1 by assigning them positive integer values in the range [1, 2 * 109] so that the shortest distance between the nodes source and destination becomes equal to an integer target. If there are multiple modifications that make the shortest distance between source and destination equal to target, any of them will be considered correct.

// Return an array containing all edges (even unmodified ones) in any order if it is possible to make the shortest distance from source to destination equal to target, or an empty array if it's impossible.

// Note: You are not allowed to modify the weights of edges with initial positive weights.

 

// Example 1:



// Input: n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
// Output: [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
// Explanation: The graph above shows a possible modification to the edges, making the distance from 0 to 1 equal to 5.
// Example 2:



// Input: n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
// Output: []
// Explanation: The graph above contains the initial edges. It is not possible to make the distance from 0 to 2 equal to 6 by modifying the edge with weight -1. So, an empty array is returned.
// Example 3:



// Input: n = 4, edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], source = 0, destination = 2, target = 6
// Output: [[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
// Explanation: The graph above shows a modified graph having the shortest distance from 0 to 2 as 6.
 

// Constraints:

// 1 <= n <= 100
// 1 <= edges.length <= n * (n - 1) / 2
// edges[i].length == 3
// 0 <= ai, bi < n
// wi = -1 or 1 <= wi <= 107
// ai != bi
// 0 <= source, destination < n
// source != destination
// 1 <= target <= 109
// The graph is connected, and there are no self-loops or repeated edges

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @param {number} target
 * @return {number[][]}
 */
var modifiedGraphEdges = function(n, edges, source, destination, target) {
  // Custom priority queue class to help with Dijkstra's algorithm
  class PriorityQueue {
      constructor() {
          this.elements = [];
      }

      // Adds an element to the queue with a given priority
      enqueue(element, priority) {
          this.elements.push({element, priority});
          // Sort by priority to always dequeue the smallest element first
          this.elements.sort((a, b) => a.priority - b.priority);
      }

      // Removes and returns the element with the highest priority (lowest value)
      dequeue() {
          return this.elements.shift();
      }

      // Checks if the queue is empty
      isEmpty() {
          return this.elements.length === 0;
      }
  }

  // Initialize adjacency list for the graph
  const adjacencyList = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
      const [nodeA, nodeB] = edges[i];
      adjacencyList[nodeA].push([nodeB, i]);
      adjacencyList[nodeB].push([nodeA, i]);
  }

  // Initialize distances array for two runs of Dijkstra's algorithm
  const distances = Array.from({ length: n }, () => [Infinity, Infinity]);
  distances[source] = [0, 0];

  // Run Dijkstra's algorithm for the first pass (with initial weights)
  runDijkstra(adjacencyList, edges, distances, source, 0, 0);
  const difference = target - distances[destination][0];

  // If the shortest path is longer than the target, return an empty list
  if (difference < 0) return [];

  // Run Dijkstra's algorithm for the second pass (with adjusted weights)
  runDijkstra(adjacencyList, edges, distances, source, difference, 1);

  // If the shortest path with adjusted weights is still less than target, return empty list
  if (distances[destination][1] < target) return [];

  // Set all unassigned edge weights (-1) to 1 as a default
  for (const edge of edges) {
      if (edge[2] === -1) edge[2] = 1;
  }

  return edges;

  /**
   * Dijkstra's algorithm implementation
   * @param {Array} adjacencyList - Adjacency list representing the graph
   * @param {Array} edges - Array of edges
   * @param {Array} distances - Array to store distances from the source
   * @param {number} source - The source node
   * @param {number} difference - The difference used for adjusting weights in the second run
   * @param {number} run - Indicator of the first or second run of Dijkstra
   */
  function runDijkstra(adjacencyList, edges, distances, source, difference, run) {
      const pq = new PriorityQueue();
      pq.enqueue(source, 0);
      distances[source][run] = 0;

      while (!pq.isEmpty()) {
          const {element: currentNode, priority: currentDistance} = pq.dequeue();

          // Skip if the current distance is not optimal
          if (currentDistance > distances[currentNode][run]) continue;

          // Traverse all neighbors of the current node
          for (const [nextNode, edgeIndex] of adjacencyList[currentNode]) {
              let weight = edges[edgeIndex][2];

              // If edge weight is unassigned (-1), assume it is 1 for now
              if (weight === -1) weight = 1;

              // Adjust edge weights on the second run to try and match the target path length
              if (run === 1 && edges[edgeIndex][2] === -1) {
                  const newWeight = difference + distances[nextNode][0] - distances[currentNode][1];
                  if (newWeight > weight) {
                      edges[edgeIndex][2] = weight = newWeight;
                  }
              }

              // Update the distance to nextNode if a shorter path is found
              if (distances[nextNode][run] > distances[currentNode][run] + weight) {
                  distances[nextNode][run] = distances[currentNode][run] + weight;
                  pq.enqueue(nextNode, distances[nextNode][run]);
              }
          }
      }
  }
};