# You have a function printNumber that can be called with an integer parameter and prints it to the console.

# For example, calling printNumber(7) prints 7 to the console.
# You are given an instance of the class ZeroEvenOdd that has three functions: zero, even, and odd. The same instance of ZeroEvenOdd will be passed to three different threads:

# Thread A: calls zero() that should only output 0's.
# Thread B: calls even() that should only output even numbers.
# Thread C: calls odd() that should only output odd numbers.
# Modify the given class to output the series "010203040506..." where the length of the series must be 2n.

# Implement the ZeroEvenOdd class:

# ZeroEvenOdd(int n) Initializes the object with the number n that represents the numbers that should be printed.
# void zero(printNumber) Calls printNumber to output one zero.
# void even(printNumber) Calls printNumber to output one even number.
# void odd(printNumber) Calls printNumber to output one odd number.
 

# Example 1:

# Input: n = 2
# Output: "0102"
# Explanation: There are three threads being fired asynchronously.
# One of them calls zero(), the other calls even(), and the last one calls odd().
# "0102" is the correct output.
# Example 2:

# Input: n = 5
# Output: "0102030405"
 

# Constraints:

# 1 <= n <= 1000

from threading import Lock
from typing import Callable

class ZeroEvenOdd:
    def __init__(self, n):
        self.n = n
        self.zero_lock = Lock()
        self.nonzero_lock = Lock()
        self.odd_lock = Lock()
        self.even_lock = Lock()
        self.nonzero_lock.acquire()
        self.even_lock.acquire()
        
        
	# printNumber(x) outputs "x", where x is an integer.
    def zero(self, printNumber: 'Callable[[int], None]') -> None:
        for _ in range(self.n):
            self.zero_lock.acquire()
            printNumber(0)
            self.nonzero_lock.release()
        
        
    def even(self, printNumber: 'Callable[[int], None]') -> None:
        for num in range(2, self.n+1, 2):
            self.even_lock.acquire()
            self.nonzero_lock.acquire()
            printNumber(num)
            self.zero_lock.release()
            self.odd_lock.release()
        
        
    def odd(self, printNumber: 'Callable[[int], None]') -> None:
        for num in range(1, self.n+1, 2):
            self.odd_lock.acquire()
            self.nonzero_lock.acquire()
            printNumber(num)
            self.zero_lock.release()
            self.even_lock.release()
        