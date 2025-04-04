// You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.

// One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.

// Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).

// Note: You cannot rotate an envelope.

 

// Example 1:

// Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
// Output: 3
// Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
// Example 2:

// Input: envelopes = [[1,1],[1,1],[1,1]]
// Output: 1
 

// Constraints:

// 1 <= envelopes.length <= 105
// envelopes[i].length == 2
// 1 <= wi, hi <= 105

// Used Longest Increasing Subsequence (lis)
// time: O(nlogn)
// space: O(n)

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
  // sort envelope
  envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  const lis = [envelopes[0][1]];  // start lis with first height

  for (let i = 1; i < envelopes.length; i++) {
      const height = envelopes[i][1];

      if (height > lis[lis.length - 1]) {
          lis.push(height);
      } else {
        // find position to update lis with binary search
          let left = 0;
          let right = lis.length - 1;
          while (left < right) {
              const mid = Math.floor((left + right) / 2);
              if (lis[mid] < height) {
                  left = mid + 1;
              } else {
                  right = mid;
              }
          }
          lis[left] = height;
      }
  }

  return lis.length;
};