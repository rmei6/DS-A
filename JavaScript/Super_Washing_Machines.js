// You have n super washing machines on a line. Initially, each washing machine has some dresses or is empty.

// For each move, you could choose any m (1 <= m <= n) washing machines, and pass one dress of each washing machine to one of its adjacent washing machines at the same time.

// Given an integer array machines representing the number of dresses in each washing machine from left to right on the line, return the minimum number of moves to make all the washing machines have the same number of dresses. If it is not possible to do it, return -1.

 

// Example 1:

// Input: machines = [1,0,5]
// Output: 3
// Explanation:
// 1st move:    1     0 <-- 5    =>    1     1     4
// 2nd move:    1 <-- 1 <-- 4    =>    2     1     3
// 3rd move:    2     1 <-- 3    =>    2     2     2
// Example 2:

// Input: machines = [0,3,0]
// Output: 2
// Explanation:
// 1st move:    0 <-- 3     0    =>    1     2     0
// 2nd move:    1     2 --> 0    =>    1     1     1
// Example 3:

// Input: machines = [0,2,0]
// Output: -1
// Explanation:
// It's impossible to make all three washing machines have the same number of dresses.
 

// Constraints:

// n == machines.length
// 1 <= n <= 10^4
// 0 <= machines[i] <= 10^5

/**
 * @param {number[]} machines
 * @return {number}
 */
var findMinMoves = function(machines) {
    const totalDresses = machines.reduce((acc, dresses) => acc + dresses, 0);
    const numMachines = machines.length;
    if (totalDresses % numMachines !== 0) {
        return -1;
    }
    const targetDresses = totalDresses / numMachines;
    let balance = 0;
    let maxImbalance = 0;
    for (let i = 0; i < numMachines; i++) {
        const imbalance = machines[i] - targetDresses;
        balance += imbalance;
        maxImbalance = Math.max(maxImbalance, Math.abs(balance), imbalance);
    }
    return maxImbalance;
};