# Given four integers sx, sy, tx, and ty, return true if it is possible to convert the point (sx, sy) to the point (tx, ty) through some operations, or false otherwise.

# The allowed operation on some point (x, y) is to convert it to either (x, x + y) or (x + y, y).

 

# Example 1:

# Input: sx = 1, sy = 1, tx = 3, ty = 5
# Output: true
# Explanation:
# One series of moves that transforms the starting point to the target is:
# (1, 1) -> (1, 2)
# (1, 2) -> (3, 2)
# (3, 2) -> (3, 5)
# Example 2:

# Input: sx = 1, sy = 1, tx = 2, ty = 2
# Output: false
# Example 3:

# Input: sx = 1, sy = 1, tx = 1, ty = 1
# Output: true
 

# Constraints:

# 1 <= sx, sy, tx, ty <= 109

class Solution:
    def reachingPoints(self, sx: int, sy: int, tx: int, ty: int) -> bool:
        while tx >= sx + ty or ty >= sy + tx: # make sure we can still make substractions
            if tx > ty:
                tx = sx + (tx - sx) % ty # the smallest we can get by deducting ty from tx
            else:
                ty = sy + (ty - sy) % tx # the smallest we can get by subtracting tx from ty

        return tx == sx and ty == sy