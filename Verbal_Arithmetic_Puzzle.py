# Given an equation, represented by words on the left side and the result on the right side.

# You need to check if the equation is solvable under the following rules:

# Each character is decoded as one digit (0 - 9).
# No two characters can map to the same digit.
# Each words[i] and result are decoded as one number without leading zeros.
# Sum of numbers on the left side (words) will equal to the number on the right side (result).
# Return true if the equation is solvable, otherwise return false.

 

# Example 1:

# Input: words = ["SEND","MORE"], result = "MONEY"
# Output: true
# Explanation: Map 'S'-> 9, 'E'->5, 'N'->6, 'D'->7, 'M'->1, 'O'->0, 'R'->8, 'Y'->'2'
# Such that: "SEND" + "MORE" = "MONEY" ,  9567 + 1085 = 10652
# Example 2:

# Input: words = ["SIX","SEVEN","SEVEN"], result = "TWENTY"
# Output: true
# Explanation: Map 'S'-> 6, 'I'->5, 'X'->0, 'E'->8, 'V'->7, 'N'->2, 'T'->1, 'W'->'3', 'Y'->4
# Such that: "SIX" + "SEVEN" + "SEVEN" = "TWENTY" ,  650 + 68782 + 68782 = 138214
# Example 3:

# Input: words = ["LEET","CODE"], result = "POINT"
# Output: false
# Explanation: There is no possible mapping to satisfy the equation, so we return false.
# Note that two different characters cannot map to the same digit.
 

# Constraints:

# 2 <= words.length <= 5
# 1 <= words[i].length, result.length <= 7
# words[i], result contain only uppercase English letters.
# The number of different characters used in the expression is at most 10.

# backtracking approach

from typing import List

class Solution:
    def isSolvable(self, words: List[str], result: str) -> bool:
        if max(map(len, words)) > len(result): return False # edge case 
        
        words.append(result)
        digits = [0]*10 
        mp = {} # mapping from letter to digit 
        
        def fn(i, j, val): 
            """Find proper mapping for words[i][~j] and result[~j] via backtracking."""
            if j == len(result): return val == 0 # base condition 
            if i == len(words): return val % 10 == 0 and fn(0, j + 1, val//10)
            
            if j >= len(words[i]): return fn(i + 1, j, val)
            if words[i][~j] in mp: 
                if j and j + 1 == len(words[i]) and mp[words[i][~j]] == 0: return # backtrack (no leading 0)
                if i + 1 == len(words): return fn(i + 1, j, val - mp[words[i][~j]])
                else: return fn(i + 1, j, val + mp[words[i][~j]])
            else: 
                for k, x in enumerate(digits): 
                    if not x and (k or j == 0 or j + 1 < len(words[i])): 
                        mp[words[i][~j]] = k
                        digits[k] = 1
                        if i + 1 == len(words) and fn(i + 1, j, val - k): return True 
                        if i + 1 < len(words) and fn(i + 1, j, val + k): return True 
                        digits[k] = 0
                        mp.pop(words[i][~j])
        
        return fn(0, 0, 0)