// You are given three positive integers: n, index, and maxSum. You want to construct an array nums (0-indexed) that satisfies the following conditions:

// nums.length == n
// nums[i] is a positive integer where 0 <= i < n.
// abs(nums[i] - nums[i+1]) <= 1 where 0 <= i < n-1.
// The sum of all the elements of nums does not exceed maxSum.
// nums[index] is maximized.
// Return nums[index] of the constructed array.

// Note that abs(x) equals x if x >= 0, and -x otherwise.

 

// Example 1:

// Input: n = 4, index = 2,  maxSum = 6
// Output: 2
// Explanation: nums = [1,2,2,1] is one array that satisfies all the conditions.
// There are no arrays that satisfy all the conditions and have nums[2] == 3, so 2 is the maximum nums[2].
// Example 2:

// Input: n = 6, index = 1,  maxSum = 10
// Output: 3

class Solution {
    public int maxValue(int n, int index, int maxSum) {
        int low = 1, mid = 0, high = 1000000000;
        while(low <= high) {
            mid = (low + high) / 2;
            if(calcAns(mid, index, n) > maxSum) { 
                high = mid - 1;
            } 
            else if(calcAns(mid + 1, index, n)  <= maxSum) {
                low = mid + 1;
            } 
            else {
                break;
            }
        }
        return mid;
    }
    
    public int calcAns(int max, int idx, int n) {
        long ret = calcPart(max - 1, idx) + calcPart(max, n - idx);
        if(ret > 1000000000) {
            return 1000000001;
        } else {
            return (int)ret;
        }
    }
    
    public long calcPart(int a, int num) {
        long an = 0, extraOnes = 0;
        long ans = 0;
        if(num >= a) {
            an = 1;
            extraOnes = num - a;
        } else if(num < a) {
            extraOnes = 0;
            an = a - num + 1;
        }
        ans = ((an + a) * (a - an + 1)) / 2;
        ans += extraOnes;
        return ans;
    }
}