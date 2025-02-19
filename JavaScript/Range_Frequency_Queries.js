// Design a data structure to find the frequency of a given value in a given subarray.

// The frequency of a value in a subarray is the number of occurrences of that value in the subarray.

// Implement the RangeFreqQuery class:

// RangeFreqQuery(int[] arr) Constructs an instance of the class with the given 0-indexed integer array arr.
// int query(int left, int right, int value) Returns the frequency of value in the subarray arr[left...right].
// A subarray is a contiguous sequence of elements within an array. arr[left...right] denotes the subarray that contains the elements of nums between indices left and right (inclusive).

 

// Example 1:

// Input
// ["RangeFreqQuery", "query", "query"]
// [[[12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]], [1, 2, 4], [0, 11, 33]]
// Output
// [null, 1, 2]

// Explanation
// RangeFreqQuery rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
// rangeFreqQuery.query(1, 2, 4); // return 1. The value 4 occurs 1 time in the subarray [33, 4]
// rangeFreqQuery.query(0, 11, 33); // return 2. The value 33 occurs 2 times in the whole array.
 

// Constraints:

// 1 <= arr.length <= 10^5
// 1 <= arr[i], value <= 10^4
// 0 <= left <= right < arr.length
// At most 10^5 calls will be made to query

// using segmented tree and hash table

class Node {
  constructor(freq = new Map()) {
      this.map = freq;
  }
};

class SegTree {
  constructor(n) {
      let size = 1;

      while(size < n) 
          size *= 2;
      
      this.segSize = size;
      this.segData = new Array(size * 2).fill(new Node());
  }

  merge(left, right) {
      const map = new Map();

      if(left && left.map) {
          for(const [key, val] of left.map)
              map.set(key, (map.get(key) || 0) + val);
      }

      if(right && right.map) {
          for(const [key, val] of right.map)
              map.set(key, (map.get(key) || 0) + val);
      }

      return new Node(map);
  }

  build(arr, lx = 0, rx = this.segSize, ni = 0) {
      if(rx - lx === 1) {

          if(lx < arr.length)
              this.segData[ni] = new Node(new Map([[arr[lx], 1 ]]));
  
          return;
      }

      const mid = Math.floor((lx + rx) / 2);
      const left = ni * 2 + 1, right = ni * 2 + 2;

      this.build(arr, lx, mid, left);
      this.build(arr, mid, rx, right);

      this.segData[ni] = this.merge(this.segData[left], this.segData[right]);
  }

  getRange(l, r, lx = 0, rx = this.segSize, ni = 0) {

      if(l >= rx || r <= lx)
          return new Node();

      if(l <= lx && r >= rx)
          return this.segData[ni];

      const mid = Math.floor((lx + rx) / 2);
      const left = ni * 2 + 1, right = ni * 2 + 2;

      return this.merge(this.getRange(l, r, lx, mid, left), this.getRange(l, r, mid, rx, right));
  }
};

/**
* @param {number[]} arr
*/
var RangeFreqQuery = function(arr) {
  const n = arr.length;

  this.segTree = new SegTree(n);
  this.segTree.build(arr);
};

/** 
* @param {number} left 
* @param {number} right 
* @param {number} value
* @return {number}
*/
RangeFreqQuery.prototype.query = function(left, right, value) {
  return this.segTree.getRange(left, right + 1).map.get(value) || 0;
};

/** 
* Your RangeFreqQuery object will be instantiated and called as such:
* var obj = new RangeFreqQuery(arr)
* var param_1 = obj.query(left,right,value)
*/