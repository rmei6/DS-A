# There is an n x n grid, with the top-left cell at (0, 0) and the bottom-right cell at (n - 1, n - 1). You are given the integer n and an integer array startPos where startPos = [startrow, startcol] indicates that a robot is initially at cell (startrow, startcol).

# You are also given a 0-indexed string s of length m where s[i] is the ith instruction for the robot: 'L' (move left), 'R' (move right), 'U' (move up), and 'D' (move down).

# The robot can begin executing from any ith instruction in s. It executes the instructions one by one towards the end of s but it stops if either of these conditions is met:

# The next instruction will move the robot off the grid.
# There are no more instructions left to execute.
# Return an array answer of length m where answer[i] is the number of instructions the robot can execute if the robot begins executing from the ith instruction in s.

 

# Example 1:


# Input: n = 3, startPos = [0,1], s = "RRDDLU"
# Output: [1,5,4,3,1,0]
# Explanation: Starting from startPos and beginning execution from the ith instruction:
# - 0th: "RRDDLU". Only one instruction "R" can be executed before it moves off the grid.
# - 1st:  "RDDLU". All five instructions can be executed while it stays in the grid and ends at (1, 1).
# - 2nd:   "DDLU". All four instructions can be executed while it stays in the grid and ends at (1, 0).
# - 3rd:    "DLU". All three instructions can be executed while it stays in the grid and ends at (0, 0).
# - 4th:     "LU". Only one instruction "L" can be executed before it moves off the grid.
# - 5th:      "U". If moving up, it would move off the grid.
# Example 2:


# Input: n = 2, startPos = [1,1], s = "LURD"
# Output: [4,1,0,0]
# Explanation:
# - 0th: "LURD".
# - 1st:  "URD".
# - 2nd:   "RD".
# - 3rd:    "D".
# Example 3:


# Input: n = 1, startPos = [0,0], s = "LRUD"
# Output: [0,0,0,0]
# Explanation: No matter which instruction the robot begins execution from, it would move off the grid.
 

# Constraints:

# m == s.length
# 1 <= n, m <= 500
# startPos.length == 2
# 0 <= startrow, startcol < n
# s consists of 'L', 'R', 'U', and 'D'.

from typing import List

def f(a, b):
    return (min(a[0], b[0]), max(a[1], b[1]))


class IntervalTree:
    def __init__(self, t):
        pow2 = 1
        n = len(t)
        while pow2 < n:
            pow2 <<= 1
        self.first_leaf = pow2 - 1
        self.t = [None] * self.first_leaf
        self.t.extend(t)
        self.t.extend((0, 0) for _ in range(pow2 - n))
        for i in reversed(range(self.first_leaf)):
            self.t[i] = f(self.t[2 * i + 1], self.t[2 * i + 2])
    
    def query(self, lpos, rpos):
        l = lpos + self.first_leaf
        r = rpos + self.first_leaf
        res = f(self.t[l], self.t[r])
        while (l - 1) // 2 < (r - 1) // 2:
            if l & 1:
                res = f(res, self.t[l + 1])
            if not r & 1:
                res = f(self.t[r - 1], res)
            l = (l - 1) // 2
            r = (r - 1) // 2
        return res
    
    def get(self, pos):
        i = pos + self.first_leaf
        return self.t[i]

class Solution:
    def executeInstructions(self, n: int, startPos: List[int], s: str) -> List[int]:
        # brute force method
        # def num_of_valid_instructions(s, pos, start, end):
        #     row, colon = pos
        #     k = 0
        #     for i in range(start, end):
        #         cur = s[i]
        #         row += (cur == 'D') - (cur == 'U')
        #         colon += (cur == 'R') - (cur == 'L')
        #         if not (0 <= row < n and 0 <= colon < n):
        #             return k
        #         k += 1
        #     return k
        # ans = []
        # for i in range(len(s)):
        #     ans.append(num_of_valid_instructions(s, startPos, i, len(s)))
        # return ans
        # Interval tree method
        r, c = 0, 0
        rs = []
        cs = []
        for ch in s:
            if ch == 'L':
                c -= 1
            elif ch == 'R':
                c += 1
            elif ch == 'U':
                  r -= 1
            else:
                r += 1
            rs.append((r, r))
            cs.append((c, c))
        rit = IntervalTree(rs)
        cit = IntervalTree(cs)
        answer = []
        for i in range(len(s)):
            lx, rx = i, len(s)
            while lx < rx:
                mx = lx + (rx - lx) // 2
                rr = rit.query(i, mx)
                cc = cit.query(i, mx)
                if i:
                    rstart = rit.get(i - 1)[0]
                    cstart = cit.get(i - 1)[0]
                else:
                    rstart, cstart = 0, 0
                if startPos[0] + rr[0] - rstart in range(n) and startPos[0] + rr[1] - rstart in range(n) and \
                    startPos[1] + cc[0] - cstart in range(n) and startPos[1] + cc[1] - cstart in range(n):
                    lx = mx + 1
                else:
                    rx = mx
            answer.append(lx - i)      
        return answer