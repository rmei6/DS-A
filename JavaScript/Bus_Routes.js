// You are given an array routes representing bus routes where routes[i] is a bus route that the ith bus repeats forever.

// For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ... forever.
// You will start at the bus stop source (You are not on any bus initially), and you want to go to the bus stop target. You can travel between bus stops by buses only.

// Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.

 

// Example 1:

// Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
// Output: 2
// Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.
// Example 2:

// Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
// Output: -1
 

 

// Constraints:

// 1 <= routes.length <= 500.
// 1 <= routes[i].length <= 105
// All the values of routes[i] are unique.
// sum(routes[i].length) <= 105
// 0 <= routes[i][j] < 106
// 0 <= source, target < 106

// time: O(n)
// space: O(n^2)

/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function(routes, source, target) {
  // If source and target are the same, no buses are needed.
  if (source === target) {
      return 0;
  }

  // Create an adjacency list to represent stops and the routes that include each stop.
  const adjList = new Map();
  for (let route = 0; route < routes.length; route++) {
      for (let stop of routes[route]) {
          adjList.set(stop, (adjList.get(stop) || []).concat(route));
      }
  }

  // Initialize a queue for BFS and a set to keep track of visited routes.
  const q = [];
  const vis = new Set();

  // Insert all the routes in the queue that have the source stop.
  for (let route of adjList.get(source) || []) {
      q.push(route);
      vis.add(route);
  }

  let busCount = 1; // Initialize the bus count.

  // Perform BFS to find the minimum number of buses needed.
  while (q.length > 0) {
      const size = q.length;

      for (let i = 0; i < size; i++) {
          const route = q.shift();

          // Iterate over the stops in the current route.
          for (let stop of routes[route]) {
              // Return the current count if the target is found.
              if (stop === target) {
                  return busCount;
              }

              // Iterate over the next possible routes from the current stop.
              for (let nextRoute of adjList.get(stop) || []) {
                  if (!vis.has(nextRoute)) {
                      vis.add(nextRoute);
                      q.push(nextRoute);
                  }
              }
          }
      }
      busCount++;
  }

  // If no route is found, return -1.
  return -1;
};
