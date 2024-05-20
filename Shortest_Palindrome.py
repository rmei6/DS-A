# You are given a string s. You can convert s to a 
# palindrome
#  by adding characters in front of it.

# Return the shortest palindrome you can find by performing this transformation.

 

# Example 1:

# Input: s = "aacecaaa"
# Output: "aaacecaaa"
# Example 2:

# Input: s = "abcd"
# Output: "dcbabcd"
 

# Constraints:

# 0 <= s.length <= 5 * 104
# s consists of lowercase English letters only.

# KMP approach 
# time: O(n), space: O(n) 
class Solution:
    def shortestPalindrome(self, s: str) -> str:
        r = s[::-1]
        ts = s + "#" + r
        n = len(ts)
        pi = [0 for _ in range(n)]
        for i in range(1, n):
            j = pi[i - 1]
            while j > 0 and ts[i] != ts[j]: j = pi[j - 1]
            if ts[i] == ts[j]: j += 1
            pi[i] = j

        return r[: len(r) - pi[-1]] + s