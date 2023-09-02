# The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

# For example, for arr = [2,3,4], the median is 3.
# For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
# Implement the MedianFinder class:

# MedianFinder() initializes the MedianFinder object.
# void addNum(int num) adds the integer num from the data stream to the data structure.
# double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
 

# Example 1:

# Input
# ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
# [[], [1], [2], [], [3], []]
# Output
# [null, null, null, 1.5, null, 2.0]

# Explanation
# MedianFinder medianFinder = new MedianFinder();
# medianFinder.addNum(1);    // arr = [1]
# medianFinder.addNum(2);    // arr = [1, 2]
# medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
# medianFinder.addNum(3);    // arr[1, 2, 3]
# medianFinder.findMedian(); // return 2.0
 

# Constraints:

# -105 <= num <= 105
# There will be at least one element in the data structure before calling findMedian.
# At most 5 * 104 calls will be made to addNum and findMedian.

import heapq

class MedianFinder:
    #Brute Force?
    # def __init__(self):
    #     self.nums = []
    #     self.mid = -1
    #     self.even = True

    # def addNum(self, num: int) -> None:
    #     self.nums.append(num)
    #     self.nums = sorted(self.nums)
    #     if(self.even):
    #         self.mid += 1
    #     self.even = not self.even

    # def findMedian(self) -> float:
    #     if(self.even):
    #         return (self.nums[self.mid] + self.nums[self.mid + 1]) / 2
    #     return self.nums[self.mid]

    def __init__(self):
        self.lo = []  
        self.hi = []  

    def addNum(self, num):
        heapq.heappush(self.lo, -num)             # lo is maxheap, so -1 * num
        heapq.heappush(self.hi, -self.lo[0])      # hi is minheap
        heapq.heappop(self.lo)
        
        if len(self.lo) < len(self.hi):
            heapq.heappush(self.lo, -self.hi[0])
            heapq.heappop(self.hi)
            
    def findMedian(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]                  
        else:
            return (self.hi[0] - self.lo[0]) / 2  # - as low has -ve values


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()