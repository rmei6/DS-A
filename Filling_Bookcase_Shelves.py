# You are given an array books where books[i] = [thicknessi, heighti] indicates the thickness and height of the ith book. You are also given an integer shelfWidth.

# We want to place these books in order onto bookcase shelves that have a total width shelfWidth.

# We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to shelfWidth, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

# Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books.

# For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.
# Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.

 

# Example 1:


# Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
# Output: 6
# Explanation:
# The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
# Notice that book number 2 does not have to be on the first shelf.
# Example 2:

# Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
# Output: 4
 

# Constraints:

# 1 <= books.length <= 1000
# 1 <= thicknessi <= shelfWidth <= 1000
# 1 <= heighti <= 1000

from typing import List
import sys

class Solution:
    def minHeightShelves(self, books: List[List[int]], shelfWidth: int) -> int:
        n = len(books)
        dp = [sys.maxsize] * n
        dp[0] = books[0][1]                                # first book will always on it's own row
        for i in range(1, n):                              # for each book
            cur_w, height_max = books[i][0], books[i][1]
            dp[i] = dp[i-1] + height_max                   # initialize result for current book `dp[i]`
            for j in range(i-1, -1, -1):                   # for each previou `book[j]`, verify if it can be placed in the same row as `book[i]`
                if cur_w + books[j][0] > shelfWidth: break
                cur_w += books[j][0]
                height_max = max(height_max, books[j][1])  # update current max height
                dp[i] = min(dp[i], (dp[j-1] + height_max) if j-1 >= 0 else height_max) # always take the maximum heigh on current row
        return dp[n-1]