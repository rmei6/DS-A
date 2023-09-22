# Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.

 

# Example 1:

# Input: n = 13
# Output: 6
# Example 2:

# Input: n = 0
# Output: 0
 

# Constraints:

# 0 <= n <= 109

class Solution:
    def countDigitOne(self, n: int) -> int:
        ans = 0
        for i in range(len(str(n))):
            curr = 10**(i+1)
            hi,lo = int('1'+'9'*i), int('1'+'0'*i)
            ans += (n//curr) * 10**i
            if (pot:=n%curr) >= hi: ans += 10**i
            elif lo <= pot < hi: 
                ans += pot - lo + 1
        return ans