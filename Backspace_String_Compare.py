# Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

# Note that after backspacing an empty text, the text will continue empty.

 

# Example 1:

# Input: s = "ab#c", t = "ad#c"
# Output: true
# Explanation: Both s and t become "ac".
# Example 2:

# Input: s = "ab##", t = "c#d#"
# Output: true
# Explanation: Both s and t become "".
# Example 3:

# Input: s = "a#c", t = "b"
# Output: false
# Explanation: s becomes "c" while t becomes "b".
 

# Constraints:

# 1 <= s.length, t.length <= 200
# s and t only contain lowercase letters and '#' characters.
 

# Follow up: Can you solve it in O(n) time and O(1) space?

class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:

        def get_next_valid_char_index(s, end):
            backspace_count = 0
            while end >= 0:
                if s[end] == '#':
                    # find "#"
                    backspace_count += 1
                elif backspace_count > 0:
                    # find an alphabet but skip it because we have backspaces
                    backspace_count -= 1
                else:
                    # if we don't have backspaces and current character is alphabet
                    # it's time to compare two characters from s and t
                    break
                end -= 1
            return end # return current end pointer for the next iteration.

        ps = len(s) - 1
        pt = len(t) - 1

        while ps >= 0 or pt >= 0:
            ps = get_next_valid_char_index(s, ps)
            pt = get_next_valid_char_index(t, pt)

            if ps < 0 and pt < 0:
                # example case s = "ab##" t = "c#d#", case 2                
                return True
            if ps < 0 or pt < 0:
                # example case s = "ab#" t = "c#d#", case 3
                return False
            elif s[ps] != t[pt]:
                # example case s = "a#c" t = "b", case 4
                return False

            ps -= 1
            pt -= 1

        # example case s = "ab#c" t = "ad#c", case 1
        return True