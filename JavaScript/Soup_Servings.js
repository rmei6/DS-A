// You have two soups, A and B, each starting with n mL. On every turn, one of the following four serving operations is chosen at random, each with probability 0.25 independent of all previous turns:

// pour 100 mL from type A and 0 mL from type B
// pour 75 mL from type A and 25 mL from type B
// pour 50 mL from type A and 50 mL from type B
// pour 25 mL from type A and 75 mL from type B
// Note:

// There is no operation that pours 0 mL from A and 100 mL from B.
// The amounts from A and B are poured simultaneously during the turn.
// If an operation asks you to pour more than you have left of a soup, pour all that remains of that soup.
// The process stops immediately after any turn in which one of the soups is used up.

// Return the probability that A is used up before B, plus half the probability that both soups are used up in the same turn. Answers within 10-5 of the actual answer will be accepted.

 

// Example 1:

// Input: n = 50
// Output: 0.62500
// Explanation: 
// If we perform either of the first two serving operations, soup A will become empty first.
// If we perform the third operation, A and B will become empty at the same time.
// If we perform the fourth operation, B will become empty first.
// So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.
// Example 2:

// Input: n = 100
// Output: 0.71875
// Explanation: 
// If we perform the first serving operation, soup A will become empty first.
// If we perform the second serving operations, A will become empty on performing operation [1, 2, 3], and both A and B become empty on performing operation 4.
// If we perform the third operation, A will become empty on performing operation [1, 2], and both A and B become empty on performing operation 3.
// If we perform the fourth operation, A will become empty on performing operation 1, and both A and B become empty on performing operation 2.
// So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.71875.
 

// Constraints:

// 0 <= n <= 10^9

/**
 * @param {number} n
 * @return {number}
 */
var soupServings = function (n) {
    if (n > 5000) return 1.0;
    const N = Math.ceil(n / 25);
    const memo = Array.from({ length: N + 1 }, () => Array(N + 1).fill(-1));

    const dfs = function (a, b) {
        if (a <= 0 && b <= 0) return 0.5;
        if (a <= 0) return 1.0;
        if (b <= 0) return 0.0;
        if(memo[a][b] !== -1) return memo[a][b];

        memo[a][b] = 0.25 * (
            dfs(a - 4, b) +
            dfs(a - 3, b - 1) +
            dfs(a - 2, b - 2) +
            dfs(a - 1, b - 3)
        );
        return memo[a][b];
    }
    return dfs(N, N);
};