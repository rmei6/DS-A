# Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

 

# Example 1:


# Input: heights = [2,1,5,6,2,3]
# Output: 10
# Explanation: The above is a histogram where width of each bar is 1.
# The largest rectangle is shown in the red area, which has an area = 10 units.
# Example 2:


# Input: heights = [2,4]
# Output: 4
 

# Constraints:

# 1 <= heights.length <= 105
# 0 <= heights[i] <= 104

from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        maxArea = 0
        stack = []

        # Iterate through each index and height in the heights array
        for index, height in enumerate(heights):
            start = index

            # Check if the stack is not empty and the height at the top of the stack is greater than the current height
            while start and stack[-1][1] > height:
                i, h = stack.pop()
                # Calculate the area for the popped element and update maxArea if needed
                maxArea = max(maxArea, (index - i) * h)
                start = i

            # Push the current index and height onto the stack
            stack.append((start, height))

        # Process any remaining elements in the stack
        for index, height in stack:
            maxArea = max(maxArea, (len(heights) - index) * height)

        return maxArea