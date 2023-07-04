# Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.

# Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].

# For example, swapping at indices 0 and 2 in "abcd" results in "cbad".
 

# Example 1:

# Input: s = "ab", goal = "ba"
# Output: true
# Explanation: You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.
# Example 2:

# Input: s = "ab", goal = "ab"
# Output: false
# Explanation: The only letters you can swap are s[0] = 'a' and s[1] = 'b', which results in "ba" != goal.
# Example 3:

# Input: s = "aa", goal = "aa"
# Output: true
# Explanation: You can swap s[0] = 'a' and s[1] = 'a' to get "aa", which is equal to goal.
 

# Constraints:

# 1 <= s.length, goal.length <= 2 * 104
# s and goal consist of lowercase letters.

class Solution:
    def buddyStrings(self, s: str, goal: str) -> bool:
        if(len(s) != len(goal)):
            return False
        if(s == goal):
            # if(len(s) == 2):
            #     if(s[0] == s[1]):
            #         return True
            #     return False
            founded = dict()
            for char in s:
                if(char in founded):
                    return True
                else:
                    founded[char] = 1
            return False
        first = ''
        second = ''
        found = False
        for i in range(len(s)):
            if(s[i] != goal[i]):
                if(first == ''):
                    first = s[i]
                    second = goal[i]
                elif(not found):
                    if(second == s[i] and first == goal[i]):
                        found = True
                    else:
                        return False
                else:
                    return False
        # print(first)
        # print(second)
        # print(found)
        return found
