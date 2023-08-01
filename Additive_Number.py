# An additive number is a string whose digits can form an additive sequence.

# A valid additive sequence should contain at least three numbers. Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

# Given a string containing only digits, return true if it is an additive number or false otherwise.

# Note: Numbers in the additive sequence cannot have leading zeros, so sequence 1, 2, 03 or 1, 02, 3 is invalid.

 

# Example 1:

# Input: "112358"
# Output: true
# Explanation: 
# The digits can form an additive sequence: 1, 1, 2, 3, 5, 8. 
# 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
# Example 2:

# Input: "199100199"
# Output: true
# Explanation: 
# The additive sequence is: 1, 99, 100, 199. 
# 1 + 99 = 100, 99 + 100 = 199
 

# Constraints:

# 1 <= num.length <= 35
# num consists only of digits.


class Solution:
    def isAdditiveNumber(self, num: str) -> bool:
        n = len(num)
        
        # check if the sequence is valid starting from the first two numbers
        for i in range(1, n):
            for j in range(i+1, n):
                # if the first two numbers have leading zeros, move on to the next iteration
                if num[0] == "0" and i > 1:
                    break
                if num[i] == "0" and j > i+1:
                    break
                    
                # initialize the first two numbers and check if the sequence is valid
                num1 = int(num[:i])
                num2 = int(num[i:j])
                k = j
                while k < n:
                    # calculate the next number in the sequence and check if it matches the remaining string
                    num3 = num1 + num2
                    if num[k:].startswith(str(num3)):
                        k += len(str(num3))
                        num1 = num2
                        num2 = num3
                    else:
                        break
                if k == n:
                    return True
                
        # if no valid sequence is found, return False
        return False