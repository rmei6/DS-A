// Given a data stream input of non-negative integers a1, a2, ..., an, summarize the numbers seen so far as a list of disjoint intervals.

// Implement the SummaryRanges class:

// SummaryRanges() Initializes the object with an empty stream.
// void addNum(int value) Adds the integer value to the stream.
// int[][] getIntervals() Returns a summary of the integers in the stream currently as a list of disjoint intervals [starti, endi]. The answer should be sorted by starti.
 

// Example 1:

// Input
// ["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
// [[], [1], [], [3], [], [7], [], [2], [], [6], []]
// Output
// [null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]

// Explanation
// SummaryRanges summaryRanges = new SummaryRanges();
// summaryRanges.addNum(1);      // arr = [1]
// summaryRanges.getIntervals(); // return [[1, 1]]
// summaryRanges.addNum(3);      // arr = [1, 3]
// summaryRanges.getIntervals(); // return [[1, 1], [3, 3]]
// summaryRanges.addNum(7);      // arr = [1, 3, 7]
// summaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]
// summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
// summaryRanges.getIntervals(); // return [[1, 3], [7, 7]]
// summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
// summaryRanges.getIntervals(); // return [[1, 3], [6, 7]]
 

// Constraints:

// 0 <= value <= 10^4
// At most 3 * 10^4 calls will be made to addNum and getIntervals.
// At most 10^2 calls will be made to getIntervals.

// time: O(logn), space: O(n)


var SummaryRanges = function() {
    this.intervals = [[-Infinity, -Infinity],[Infinity, Infinity]];
};

/** 
 * @param {number} value
 * @return {void}
 */
SummaryRanges.prototype.addNum = function(value) {
    if (this.intervals.length === 0) {
        this.intervals.push([value, value]);
        return;
    }

    let l = 0;
    let r = this.intervals.length - 1;
    let m;
    while (l < r) {
        m = l + Math.floor((r - l) / 2);
        if (value <= this.intervals[m][1] || value <= this.intervals[m][0]) {
            r = m;
        } else {
            l = m + 1;
        }
    }

    if (this.intervals[l][0] <= value && this.intervals[l][1] >= value) {
        return;
    }

    let fromLeftConnected = false;
    if (l > 1 && this.intervals[l - 1][1] === value - 1) {
        this.intervals[l - 1][1] = value;
        fromLeftConnected = true;
    } else if (l === 1 && this.intervals[l][1] === value - 1) {
        this.intervals[l][1] = value;
        return;
    }

    let fromRightConnected = false;
    if (this.intervals[l][0] === value + 1) {
        if (l > 0 && fromLeftConnected) {
            this.intervals[l - 1][1] = this.intervals[l][1];
        } else {
            this.intervals[l][0] = value;
        }
        fromRightConnected = true;
    }

    if (fromLeftConnected && fromRightConnected) {
        this.intervals.splice(l, 1);
        return;
    }

    if (!fromLeftConnected && !fromRightConnected) {
        this.intervals.splice(l, 0, [value, value]);
    }
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function() {
    return this.intervals.slice(1, -1);
};

/** 
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(value)
 * var param_2 = obj.getIntervals()
 */