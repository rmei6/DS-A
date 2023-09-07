# Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

# You have the following three operations permitted on a word:

# Insert a character
# Delete a character
# Replace a character
 

# Example 1:

# Input: word1 = "horse", word2 = "ros"
# Output: 3
# Explanation: 
# horse -> rorse (replace 'h' with 'r')
# rorse -> rose (remove 'r')
# rose -> ros (remove 'e')
# Example 2:

# Input: word1 = "intention", word2 = "execution"
# Output: 5
# Explanation: 
# intention -> inention (remove 't')
# inention -> enention (replace 'i' with 'e')
# enention -> exention (replace 'n' with 'x')
# exention -> exection (replace 'n' with 'c')
# exection -> execution (insert 'u')
 

# Constraints:

# 0 <= word1.length, word2.length <= 500
# word1 and word2 consist of lowercase English letters.

from functools import lru_cache

class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        w1, w2 = len(word1), len(word2)
        
        @lru_cache(None)
        def dp(i, j):

            if i >= w1             : return w2-j                # word1 used up, so all inserts
            if j >= w2             : return w1-i                # word2 used up, so all deletes
            if word1[i] == word2[j]: return dp(i+1, j+1)        # letters match, so no operation

            return min(dp(i,j+1), dp(i+1,j), dp(i+1,j+1)) + 1   # insert, delete, replace

        return dp(0,0)