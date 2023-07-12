# Given an integer n, return the number of prime numbers that are strictly less than n.

 

# Example 1:

# Input: n = 10
# Output: 4
# Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
# Example 2:

# Input: n = 0
# Output: 0
# Example 3:

# Input: n = 1
# Output: 0

class Solution:
    def countPrimes(self, n: int) -> int:
        if n<2:
            return 0
        
        #initialize a list of length n
        prime=[1]*n
		#mark 0th  and 1st index as 0
        prime[0]=prime[1]=0
        
		#we will check for multiple from range 2 to sqrt(n)
        for i in range(2,int(sqrt(n))+1):
            if prime[i] == 1:
			#mark all multiple of prime number as  0
                prime[i*i:n:i] = [0] * ((n-1-i*i)//i + 1)
    #return total count of prime 
        return sum(prime)