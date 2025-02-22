// You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCoursei, nextCoursei], representing a prerequisite relationship between course prevCoursei and course nextCoursei: course prevCoursei has to be taken before course nextCoursei. Also, you are given the integer k.

// In one semester, you can take at most k courses as long as you have taken all the prerequisites in the previous semesters for the courses you are taking.

// Return the minimum number of semesters needed to take all courses. The testcases will be generated such that it is possible to take every course.

 

// Example 1:


// Input: n = 4, relations = [[2,1],[3,1],[1,4]], k = 2
// Output: 3
// Explanation: The figure above represents the given graph.
// In the first semester, you can take courses 2 and 3.
// In the second semester, you can take course 1.
// In the third semester, you can take course 4.
// Example 2:


// Input: n = 5, relations = [[2,1],[3,1],[4,1],[1,5]], k = 2
// Output: 4
// Explanation: The figure above represents the given graph.
// In the first semester, you can only take courses 2 and 3 since you cannot take more than two per semester.
// In the second semester, you can take course 4.
// In the third semester, you can take course 1.
// In the fourth semester, you can take course 5.
 

// Constraints:

// 1 <= n <= 15
// 1 <= k <= n
// 0 <= relations.length <= n * (n-1) / 2
// relations[i].length == 2
// 1 <= prevCoursei, nextCoursei <= n
// prevCoursei != nextCoursei
// All the pairs [prevCoursei, nextCoursei] are unique.
// The given graph is a directed acyclic graph.

// using bitmask to get prereqs
// time: O(2^n * n)
// space: O(2^n)


/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number} k
 * @return {number}
 */
var minNumberOfSemesters = function(n, relations, k) {
    // use bit masks to get prerequisites
    const prereq = new Array(n).fill(0);
    for (const [prev, next] of relations) {
        prereq[next - 1] |= (1 << (prev - 1));
    }

    // array to store minimum semesters needed for each state
    const dp = new Array(1 << n).fill(Infinity);
    dp[0] = 0;

    for (let state = 0; state < (1 << n); state++) {
        if (dp[state] === Infinity) continue;

        // Find available courses
        let available = 0;
        for (let course = 0; course < n; course++) {
            if (!(state & (1 << course)) && // course not taken
                (prereq[course] & state) === prereq[course]) { // all prerequisites met
                available |= (1 << course);
            }
        }

        // optimize subset generation for available courses
        let subset = available;
        while (subset) {
            if (countBits(subset) <= k) {
                dp[state | subset] = Math.min(dp[state | subset], dp[state] + 1);
            }
            subset = (subset - 1) & available;
        }
    }

    return dp[(1 << n) - 1];
};

// optimized bit counting function
var countBits = function(n) {
    let count = 0;
    while (n) {
        n &= (n - 1); // clear the least significant bit
        count++;
    }
    return count;
};