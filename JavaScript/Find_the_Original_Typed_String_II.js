// Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.

// You are given a string word, which represents the final output displayed on Alice's screen. You are also given a positive integer k.

// Return the total number of possible original strings that Alice might have intended to type, if she was trying to type a string of size at least k.

// Since the answer may be very large, return it modulo 109 + 7.

 

// Example 1:

// Input: word = "aabbccdd", k = 7

// Output: 5

// Explanation:

// The possible strings are: "aabbccdd", "aabbccd", "aabbcdd", "aabccdd", and "abbccdd".

// Example 2:

// Input: word = "aabbccdd", k = 8

// Output: 1

// Explanation:

// The only possible string is "aabbccdd".

// Example 3:

// Input: word = "aaabbb", k = 3

// Output: 8

 

// Constraints:

// 1 <= word.length <= 5 * 10^5
// word consists only of lowercase English letters.
// 1 <= k <= 2000

/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */

var possibleStringCount = function(word, k) {

    const MOD = 1000000007;
    const n = word.length;
    if (n === 0) return 0;
    if ( k === n ) return 1;
    if ( k > n ) return 0;

    let runs = [];
    let cnt = 1;
    for (let i = 1; i < n; i++) {
        if (word[i] === word[i - 1]) {
            cnt++;
        } else {
            runs.push(cnt);
            cnt = 1;
        }
    }
    runs.push(cnt);

    let totalWays = 1;
    for (let runLength of runs) {
        totalWays = (totalWays * runLength) % MOD;
    }

    if (k <= runs.length) return totalWays;

    const E = k - 1 - runs.length;
    if (E < 0) return totalWays;

    let dp = new Uint32Array(E + 1);
    dp[0] = 1;

    for (let runLength of runs) {
        const maxAdd = runLength - 1;
        if (maxAdd === 0) continue;

        // Build prefix sum
        let prefixSum = new Uint32Array(E + 1);
        let sum = 0;
        for (let s = 0; s <= E; s++) {
            sum = (sum + dp[s]) % MOD;
            prefixSum[s] = sum;
        }

        let newDp = new Uint32Array(E + 1);
        for (let s = 0; s <= E; s++) {
            let val = prefixSum[s];
            if (s - maxAdd - 1 >= 0) {
                val = (val - prefixSum[s - maxAdd - 1] + MOD) % MOD;
            }
            newDp[s] = val;
        }
        dp = newDp;
    }

    let badWays = dp.reduce((sum, val) => (sum + val) % MOD, 0);
    let ans = (totalWays - badWays + MOD) % MOD;
    return ans;
};