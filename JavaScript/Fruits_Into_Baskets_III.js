// You are given two arrays of integers, fruits and baskets, each of length n, where fruits[i] represents the quantity of the ith type of fruit, and baskets[j] represents the capacity of the jth basket.

// From left to right, place the fruits according to these rules:

// Each fruit type must be placed in the leftmost available basket with a capacity greater than or equal to the quantity of that fruit type.
// Each basket can hold only one type of fruit.
// If a fruit type cannot be placed in any basket, it remains unplaced.
// Return the number of fruit types that remain unplaced after all possible allocations are made.

 

// Example 1:

// Input: fruits = [4,2,5], baskets = [3,5,4]

// Output: 1

// Explanation:

// fruits[0] = 4 is placed in baskets[1] = 5.
// fruits[1] = 2 is placed in baskets[0] = 3.
// fruits[2] = 5 cannot be placed in baskets[2] = 4.
// Since one fruit type remains unplaced, we return 1.

// Example 2:

// Input: fruits = [3,6,1], baskets = [6,4,7]

// Output: 0

// Explanation:

// fruits[0] = 3 is placed in baskets[0] = 6.
// fruits[1] = 6 cannot be placed in baskets[1] = 4 (insufficient capacity) but can be placed in the next available basket, baskets[2] = 7.
// fruits[2] = 1 is placed in baskets[1] = 4.
// Since all fruits are successfully placed, we return 0.

 

// Constraints:

// n == fruits.length == baskets.length
// 1 <= n <= 10^5
// 1 <= fruits[i], baskets[i] <= 10^9

// used segment tree to get largest basket and used left-first approach
// time: O(nlogn), n for tree and logn for placing fruit
// space: O(4n) -> O(n)

/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
var numOfUnplacedFruits = function(fruits, baskets) {
    const n = baskets.length;
    const seg = new Array(4 * n).fill(0);

    // helper function for building tree
    function build(idx, l, r) {
        if (l === r) {
            seg[idx] = baskets[l];
            return seg[idx];
        }
        const mid = Math.floor((l + r) / 2);
        seg[idx] = Math.max(
            build(2 * idx + 1, l, mid),
            build(2 * idx + 2, mid + 1, r)
        );
        return seg[idx];
    }

    // helper function for placing fruit
    function place(idx, l, r, val) {
        if (seg[idx] < val) return false;
        if (l === r) {
            seg[idx] = -1;
            return true;
        }
        const mid = Math.floor((l + r) / 2);
        let placed = place(2 * idx + 1, l, mid, val);
        if (!placed) placed = place(2 * idx + 2, mid + 1, r, val);
        seg[idx] = Math.max(seg[2 * idx + 1], seg[2 * idx + 2]);
        return placed;
    }

    build(0, 0, n - 1);

    let unplaced = 0;
    for (const fruit of fruits) {
        if (seg[0] < fruit || !place(0, 0, n - 1, fruit)) {
            unplaced++;
        }
    }

    return unplaced;
};