# There are n dominoes in a line, and we place each domino vertically upright. In the beginning, we simultaneously push some of the dominoes either to the left or to the right.

# After each second, each domino that is falling to the left pushes the adjacent domino on the left. Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.

# When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.

# For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.

# You are given a string dominoes representing the initial state where:

# dominoes[i] = 'L', if the ith domino has been pushed to the left,
# dominoes[i] = 'R', if the ith domino has been pushed to the right, and
# dominoes[i] = '.', if the ith domino has not been pushed.
# Return a string representing the final state.

 

# Example 1:

# Input: dominoes = "RR.L"
# Output: "RR.L"
# Explanation: The first domino expends no additional force on the second domino.
# Example 2:


# Input: dominoes = ".L.R...LR..L.."
# Output: "LL.RR.LLRRLL.."
 

# Constraints:

# n == dominoes.length
# 1 <= n <= 105
# dominoes[i] is either 'L', 'R', or '.'.

class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        # 2 pointer approach
        low, high = 0, len(dominoes) - 1
        dominoes = list(dominoes)
        
        if dominoes[low] == ".":
            for i in range(len(dominoes)):
                if dominoes[i] == "R": 
                    low = i
                    break
                
                if dominoes[i] == "L":
                    for j in range(i):
                        dominoes[j] = "L"
                    break
                    
        if dominoes[high] == ".":
            for i in range(len(dominoes)-1,-1,-1):
                if dominoes[i] == "L": 
                    high = i
                    break
                
                if dominoes[i] == "R":
                    for j in range(i, len(dominoes)):
                        dominoes[j] = "R"
                    break
        
        i = low
        for j in range(low+1, high+1):
            if dominoes[i] == "R" and dominoes[j] == "L":
                mid = (i+j) //2 
                temp = j
                while i != j:
                    if i >= temp:
                        i = j
                        break
                    
                    dominoes[i] = "R"
                    dominoes[temp] = "L"
                    
                    temp-=1
                    i+=1
            
            if dominoes[i] == "R" and dominoes[j] == "R":
                while i != j:
                    dominoes[i] = "R"
                    i+=1
            
            if dominoes[i] == "L" and dominoes[j] == "L":
                while i != j:
                    dominoes[i] = "L"
                    i+=1
                
            if dominoes[i] == "L" and dominoes[j] == "R":
                i = j

        return "".join(dominoes)