# Given a string s, find the longest palindromic subsequence's length in s.

# A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

 

# Example 1:

# Input: s = "bbbab"
# Output: 4
# Explanation: One possible longest palindromic subsequence is "bbbb".
# Example 2:

# Input: s = "cbbd"
# Output: 2
# Explanation: One possible longest palindromic subsequence is "bb".
 

# Constraints:

# 1 <= s.length <= 1000
# s consists only of lowercase English letters.

class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        def lcs(x,y):
            n = len(x)
            dp = [[None]*(n + 1) for _ in range(n + 1)]
            
            for i in range(n + 1):
                for j in range(n + 1):
                    if i == 0 or j == 0: dp[i][j] = 0
                    elif x[i - 1] == y[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]
                    else: dp[i][j] = max(dp[i - 1][j],dp[i][j - 1])
            #for i in dp:print(i)
            return dp[-1][-1]
        return lcs(s,s[::-1])