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

class Solution:
    # KMP approach 
    # time: O(n), space: O(n) 
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
    # Rolling Hash approach
    # time: O(n), space: O(n)
    # same time and space complexity, but lower runtime and memory usage
    def shortestPalindrome1(self, s: str) -> str:
        n = len(s)
        P, MOD, POW = 31, 10**9 + 7, 1
        h1 = h2 = max_pan_pref_len = 0
        for i in range(n):
            char_int = ord(s[i]) - ord("a") + 1
            h1 = (h1 * P + char_int) % MOD
            h2 = (char_int * POW + h2) % MOD
            if h1 == h2: max_pan_pref_len = i + 1
            POW = POW * P % MOD

        return s[max_pan_pref_len:][::-1] + s     