// You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri].

// Each queries[i] represents the following action on nums:

// Decrement the value at each index in the range [li, ri] in nums by at most 1.
// The amount by which the value is decremented can be chosen independently for each index.
// A Zero Array is an array with all its elements equal to 0.

// Return the maximum number of elements that can be removed from queries, such that nums can still be converted to a zero array using the remaining queries. If it is not possible to convert nums to a zero array, return -1.

 

// Example 1:

// Input: nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]

// Output: 1

// Explanation:

// After removing queries[2], nums can still be converted to a zero array.

// Using queries[0], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
// Using queries[1], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
// Example 2:

// Input: nums = [1,1,1,1], queries = [[1,3],[0,2],[1,3],[1,2]]

// Output: 2

// Explanation:

// We can remove queries[2] and queries[3].

// Example 3:

// Input: nums = [1,2,3,4], queries = [[0,3]]

// Output: -1

// Explanation:

// nums cannot be converted to a zero array even after using all the queries.

 

// Constraints:

// 1 <= nums.length <= 10^5
// 0 <= nums[i] <= 10^5
// 1 <= queries.length <= 10^5
// queries[i].length == 2
// 0 <= li <= ri < nums.length

// good approach, but runtime too long

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var maxRemoval = function(nums, queries) {
    const n = nums.length;
    const m = queries.length;
    const workload = new Array(n + 1).fill(0);

    queries.sort((a, b) => a[0] - b[0]);
    const available = [];
    let qIndex = 0;

    for (let time = 0; time < n; time++) {
        if (time > 0) {
            workload[time] += workload[time - 1];
        }

        while (qIndex < m && queries[qIndex][0] === time) {
            available.push(queries[qIndex][1]);
            qIndex++;
        }

        available.sort((a, b) => b - a);

        while (workload[time] < nums[time]) {
            if (available.length === 0 || available[0] < time) {
                return -1;
            }

            workload[time]++;
            const endTime = available.shift();
            if (endTime + 1 < workload.length) {
                workload[endTime + 1]--;
            }
        }
    }

    return available.length;
}

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */

// greedy and heap

var maxRemoval = function(nums, queries) {
    const g = _.groupBy(queries, x => x[0]);
    const h = new MaxPriorityQueue();
    const d = new Int32Array(nums.length + 1);
    let o = 0;

    const assign = (x, i) => {
        if (o >= x) return true;
        if (h.isEmpty() || h.front() < i) return false;
        o++;
        d[h.front() + 1]--;
        h.pop();
        return assign(x, i);
    };

    for (let i = 0; i < nums.length; i++) {
        o += d[i];
        if (g[i]) {
            g[i].forEach(y => h.enqueue(y[1]));
        }
        if (!assign(nums[i], i)) {
            return -1;
        }
    }
    
    return h.size();
};
