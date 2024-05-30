# Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome. If there is a tie, return the smaller one.

# The closest is defined as the absolute difference minimized between two integers.

 

# Example 1:

# Input: n = "123"
# Output: "121"
# Example 2:

# Input: n = "1"
# Output: "0"
# Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.
 

# Constraints:

# 1 <= n.length <= 18
# n consists of only digits.
# n does not have leading zeros.
# n is representing an integer in the range [1, 1018 - 1].

class Solution:
    def nearestPalindromic(self, n: str) -> str:

        k = len(n)
        cands = {str(c:=pow(10,k)+1), str((c-1)//10-1)}         # The two edge-case candidates
                                                                # (e.g: "10001" and "999" 
                                                                #       for any 4-digit n)

        pref = (str(int(n[:(k + 1)//2])+i) for i in (-1,0,1))   # left sides of the remaining
                                                                # three candidates 
        for left in pref:
            rght = left[-2::-1] if k%2 else left[::-1]          # complete these three candidates 
            cands.add(left + rght)                              # with their right sides

        cands.discard(n)                                        # n is prohibited from candidacy

        return min(cands, key=lambda x:                         # return the winner
                   (abs(int(x) - int(n)), int(x)))