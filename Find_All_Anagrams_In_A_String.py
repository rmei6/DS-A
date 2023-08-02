# Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

# An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

 

# Example 1:

# Input: s = "cbaebabacd", p = "abc"
# Output: [0,6]
# Explanation:
# The substring with start index = 0 is "cba", which is an anagram of "abc".
# The substring with start index = 6 is "bac", which is an anagram of "abc".
# Example 2:

# Input: s = "abab", p = "ab"
# Output: [0,1,2]
# Explanation:
# The substring with start index = 0 is "ab", which is an anagram of "ab".
# The substring with start index = 1 is "ba", which is an anagram of "ab".
# The substring with start index = 2 is "ab", which is an anagram of "ab".
 

# Constraints:

# 1 <= s.length, p.length <= 3 * 104
# s and p consist of lowercase English letters.

from typing import List
from typing import DefaultDict

class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        char_freqs, indices, len_p, len_s = DefaultDict(int), [], len(p), len(s)
        
        # s cannot have p anangrams if len(p) > len(s)
        if len_p > len_s:
            return indices

        # build map of character frequencies in p
        for char in p:
            char_freqs[char] += 1

        # initial full pass over the window, except last element which we will pass over later
        for i in range(len_p - 1):
            if s[i] in char_freqs:
                char_freqs[s[i]] -= 1
            
        # slide the window with stride 1, adding the value "sliding out" and subtracting the value "sliding in"
        for i in range(-1, len_s - len_p + 1):
            if i > -1 and s[i] in char_freqs:
                char_freqs[s[i]] += 1
            if i + len_p < len_s and s[i + len_p] in char_freqs: 
                char_freqs[s[i + len_p]] -= 1
                
            # check whether we encountered an anagram by seeing if all frequencies add up to 0
            if not any(char_freqs.values()): 
                indices.append(i + 1)
                
        return indices