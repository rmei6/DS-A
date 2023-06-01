class KthLargest:
    def __init__(self, k, nums):
        self.nums = nums
        self.k = k

    def add(self, val) -> int:
        self.nums.append(val)
        self.nums.sort()
        return self.nums[-self.k]