# Hard
# You are given nums, an array of positive integers of size 2 * n. You must perform n operations on this array.

# In the ith operation (1-indexed), you will:

# Choose two elements, x and y.
# Receive a score of i * gcd(x, y).
# Remove x and y from nums.
# Return the maximum score you can receive after performing n operations.

# The function gcd(x, y) is the greatest common divisor of x and y.

 

# Example 1:

# Input: nums = [1,2]
# Output: 1
# Explanation: The optimal choice of operations is:
# (1 * gcd(1, 2)) = 1
# Example 2:

# Input: nums = [3,4,6,8]
# Output: 11
# Explanation: The optimal choice of operations is:
# (1 * gcd(3, 6)) + (2 * gcd(4, 8)) = 3 + 8 = 11
# Example 3:

# Input: nums = [1,2,3,4,5,6]
# Output: 14
# Explanation: The optimal choice of operations is:
# (1 * gcd(1, 5)) + (2 * gcd(2, 4)) + (3 * gcd(3, 6)) = 1 + 4 + 9 = 14

class Solution:
    def maxScore(self, nums: List[int]) -> int:
        # def fn(nums, k): 
        #     """Return max score from nums at kth step."""
        #     if not nums: return 0 # boundary condition 
        #     ans = 0 
        #     for i in range(len(nums)):
        #         for j in range(i+1, len(nums)): 
        #             rest = nums[:i] + nums[i+1:j] + nums[j+1:]
        #             ans = max(ans, k*gcd(nums[i], nums[j]) + fn(tuple(rest), k+1))
        #     return ans
        
        # return fn(tuple(nums), 1)
        # n = len(nums)
        #Bitmap Implementation
        n = len(nums)
        
        def fn(mask, k): 
            """Return maximum score at kth operation with available numbers by mask."""
            if mask == 0: return 0 # no more numbers 
            ans = 0
            for i in range(n): 
                if mask & 1 << i:
                    for j in range(i+1, n): 
                        if mask & 1 << j: 
                            mask0 = mask & ~(1<<i) & ~(1<<j) # unset ith & jth bit
                            ans = max(ans, k*gcd(nums[i], nums[j]) + fn(mask0, k+1))
            return ans 
        
        return fn((1<<n) - 1, 1)