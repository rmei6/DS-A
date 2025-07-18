// You are given a 0-indexed integer array nums consisting of 3 * n elements.

// You are allowed to remove any subsequence of elements of size exactly n from nums. The remaining 2 * n elements will be divided into two equal parts:

// The first n elements belonging to the first part and their sum is sumfirst.
// The next n elements belonging to the second part and their sum is sumsecond.
// The difference in sums of the two parts is denoted as sumfirst - sumsecond.

// For example, if sumfirst = 3 and sumsecond = 2, their difference is 1.
// Similarly, if sumfirst = 2 and sumsecond = 3, their difference is -1.
// Return the minimum difference possible between the sums of the two parts after the removal of n elements.

 

// Example 1:

// Input: nums = [3,1,2]
// Output: -1
// Explanation: Here, nums has 3 elements, so n = 1. 
// Thus we have to remove 1 element from nums and divide the array into two equal parts.
// - If we remove nums[0] = 3, the array will be [1,2]. The difference in sums of the two parts will be 1 - 2 = -1.
// - If we remove nums[1] = 1, the array will be [3,2]. The difference in sums of the two parts will be 3 - 2 = 1.
// - If we remove nums[2] = 2, the array will be [3,1]. The difference in sums of the two parts will be 3 - 1 = 2.
// The minimum difference between sums of the two parts is min(-1,1,2) = -1. 
// Example 2:

// Input: nums = [7,9,5,8,1,3]
// Output: 1
// Explanation: Here n = 2. So we must remove 2 elements and divide the remaining array into two parts containing two elements each.
// If we remove nums[2] = 5 and nums[3] = 8, the resultant array will be [7,9,1,3]. The difference in sums will be (7+9) - (1+3) = 12.
// To obtain the minimum difference, we should remove nums[1] = 9 and nums[4] = 1. The resultant array becomes [7,5,8,3]. The difference in sums of the two parts is (7+5) - (8+3) = 1.
// It can be shown that it is not possible to obtain a difference smaller than 1.
 

// Constraints:

// nums.length == 3 * n
// 1 <= n <= 10^5
// 1 <= nums[i] <= 10^5

// time: O(nlog(n)), space: O(n)
// used heap to get min and max sum of subsequences
// compared calculated mins and maxes

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDifference = function(nums) {
    const shiftdown = (arr, i, len) => {
        while (i*2 + 2 < len && (arr[i] > arr[i*2 + 1] || arr[i] > arr[i*2 + 2])) {
            let j = i*2 + 1;
            if (arr[j] > arr[j + 1]) {
                j++;
            }
            const tmp = arr[j];
            arr[j] = arr[i];
            arr[i] = tmp;
            i = j;
        }
        if (i*2 + 2 == len) { // only 1 child
            if (arr[i] > arr[i*2 + 1]) {
                const tmp = arr[i*2 + 1];
                arr[i*2 + 1] = arr[i];
                arr[i] = tmp;
            }
            return;
        }
    }
    const heapify = (arr, len) => {
        for (let i = Math.floor((len - 2)/2); i >= 0; i--) {
            shiftdown(arr, i, len);
        }
        return arr;
    };
    const heapreplace = (arr, len, val) => {
        const top = arr[0];
        arr[0] = val;
        shiftdown(arr, 0, len);
        return top;
    };
    const n = nums.length / 3;
    
    const maxPQ = heapify(nums.slice(0, n).map(x => -x), n);
    const min = Array(n + 1);
    min[0] = maxPQ.reduce((acc, v) => acc - v, 0);
    for (let i = 1; i <= n; i++) {
        if (nums[n - 1 + i] < -maxPQ[0]) {
            const tmp = -heapreplace(maxPQ, n, -nums[n - 1 + i]);
            min[i] = min[i - 1] + nums[n - 1 + i] - tmp;
        } else {
            min[i] = min[i - 1];
        }
    }

    const minPQ = heapify(nums.slice(2*n), n);
    const max = Array(n + 1).fill(0);
    max[n] = minPQ.reduce((acc, v) => acc + v, 0);
    for (let i = 1; i <= n; i++) {
        if (nums[2*n - i] > minPQ[0]) {
            const tmp = heapreplace(minPQ, n, nums[2*n - i]);
            max[n - i] = max[n - i + 1] - tmp + nums[2*n - i];
        } else {
            max[n - i] = max[n - i + 1];
        }
    }

    let ans = Number.MAX_VALUE;
    for (let i = 0; i <= n; i++) {
        ans = Math.min(ans, min[i] - max[i]);
    }
    return ans;
};