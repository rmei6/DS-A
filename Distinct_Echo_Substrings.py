# Return the number of distinct non-empty substrings of text that can be written as the concatenation of some string with itself (i.e. it can be written as a + a where a is some string).

 

# Example 1:

# Input: text = "abcabcabc"
# Output: 3
# Explanation: The 3 substrings are "abcabc", "bcabca" and "cabcab".
# Example 2:

# Input: text = "leetcodeleetcode"
# Output: 2
# Explanation: The 2 substrings are "ee" and "leetcodeleetcode".
 

# Constraints:

# 1 <= text.length <= 2000
# text has only lowercase English letters.

class Solution:
    def distinctEchoSubstrings(self, text: str) -> int:
        n = len(text)
        ans = set()

        for i in range(n):
            for j in range(i+1,n+1):
                tmp = text[i:j]*2
                if tmp in text and tmp not in ans:
                    ans.add(tmp)

        return len(ans)
        # one liner
        return len(set(s[i:(j+i)//2] for i in range(len(s)) for j in range(i+2, len(s)+1, 2) if s[i:(j+i)//2]*2 == s[i:j]))