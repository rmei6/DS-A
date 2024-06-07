# Given a positive integer n, return the number of the integers in the range [0, n] whose binary representations do not contain consecutive ones.

 

# Example 1:

# Input: n = 5
# Output: 5
# Explanation:
# Here are the non-negative integers <= 5 with their corresponding binary representations:
# 0 : 0
# 1 : 1
# 2 : 10
# 3 : 11
# 4 : 100
# 5 : 101
# Among them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule. 
# Example 2:

# Input: n = 1
# Output: 2
# Example 3:

# Input: n = 2
# Output: 3
 

# Constraints:

# 1 <= n <= 109

class Solution:
    def findIntegers(self, n: int) -> int:
        # fibonacci method
        f = [1,2]
        for i in range(2,30):
            f.append(f[-1] + f[-2])
        
        ans = last_seen = 0

        for i in range(29,-1,-1):
            if (1 << i) & n:
                ans += f[i]
                if last_seen :
                    return ans
                last_seen = 1
            else:
                last_seen = 0
        return ans + 1