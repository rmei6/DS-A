# We are given an array asteroids of integers representing asteroids in a row.

# For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

# Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

 

# Example 1:

# Input: asteroids = [5,10,-5]
# Output: [5,10]
# Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
# Example 2:

# Input: asteroids = [8,-8]
# Output: []
# Explanation: The 8 and -8 collide exploding each other.

class Solution:
    def asteroidCollision(self, asteroids: List[int]) -> List[int]:
        s = []
        for a in asteroids:
            while s and s[-1] > 0 and a < 0:
                if s[-1] + a < 0: s.pop()
                elif s[-1] + a > 0: break    
                else: s.pop(); break
            else: s.append(a)        
        return s