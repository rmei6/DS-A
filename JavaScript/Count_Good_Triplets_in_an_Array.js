// You are given two 0-indexed arrays nums1 and nums2 of length n, both of which are permutations of [0, 1, ..., n - 1].

// A good triplet is a set of 3 distinct values which are present in increasing order by position both in nums1 and nums2. In other words, if we consider pos1v as the index of the value v in nums1 and pos2v as the index of the value v in nums2, then a good triplet will be a set (x, y, z) where 0 <= x, y, z <= n - 1, such that pos1x < pos1y < pos1z and pos2x < pos2y < pos2z.

// Return the total number of good triplets.

 

// Example 1:

// Input: nums1 = [2,0,1,3], nums2 = [0,1,2,3]
// Output: 1
// Explanation: 
// There are 4 triplets (x,y,z) such that pos1x < pos1y < pos1z. They are (2,0,1), (2,0,3), (2,1,3), and (0,1,3). 
// Out of those triplets, only the triplet (0,1,3) satisfies pos2x < pos2y < pos2z. Hence, there is only 1 good triplet.
// Example 2:

// Input: nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
// Output: 4
// Explanation: The 4 good triplets are (4,0,3), (4,0,2), (4,1,3), and (4,1,2).
 

// Constraints:

// n == nums1.length == nums2.length
// 3 <= n <= 10^5
// 0 <= nums1[i], nums2[i] <= n - 1
// nums1 and nums2 are permutations of [0, 1, ..., n - 1].

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function goodTriplets(nums1, nums2) {
  const n = nums1.length;

  // map value to nums2 index
  const posInNums2 = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    posInNums2[nums2[i]] = i;
  }
  
  // bit stored in Uint32Array with 1-indexed logic.
  const bit = new Uint32Array(n + 1);
  let count = 0;
  
  for (let i = 0; i < n; i++) {
    const pos2 = posInNums2[nums1[i]];
    let left = 0;
    // get prefix sum for pos2
    // Convert to 1-indexed
    let j = pos2 + 1;
    while (j > 0) {
      left += bit[j];
      j -= j & -j;
    }
    
    const totalGreater = n - 1 - pos2;
    const placedGreater = i - left;
    const right = totalGreater - placedGreater;
    count += left * right;
    
    // add 1 at position pos2
    let index = pos2 + 1;
    while (index <= n) {
      bit[index]++;
      index += index & -index;
    }
  }
  
  return count;
}