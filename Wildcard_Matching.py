# Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

# '?' Matches any single character.
# '*' Matches any sequence of characters (including the empty sequence).
# The matching should cover the entire input string (not partial).

 

# Example 1:

# Input: s = "aa", p = "a"
# Output: false
# Explanation: "a" does not match the entire string "aa".
# Example 2:

# Input: s = "aa", p = "*"
# Output: true
# Explanation: '*' matches any sequence.
# Example 3:

# Input: s = "cb", p = "?a"
# Output: false
# Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
 

# Constraints:

# 0 <= s.length, p.length <= 2000
# s contains only lowercase English letters.
# p contains only lowercase English letters, '?' or '*'.

class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        i = j = 0  
        back_j = -1  
        match_i = 0   
        m = len(s)
        n = len(p)
        while i < m:
            if j < n and (s[i] == p[j] or p[j] == '?'):  
                i += 1
                j += 1
            elif j < n and p[j] == '*':  
                back_j = j  
                match_i = i  
                j += 1  
            elif back_j != -1:  
                j = back_j + 1
                match_i += 1  
                i = match_i
            else:  
                return False
            print(p[j:])
        return list(p[j:]).count('*') == len(p[j:])