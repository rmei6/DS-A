# There are n couples sitting in 2n seats arranged in a row and want to hold hands.

# The people and seats are represented by an integer array row where row[i] is the ID of the person sitting in the ith seat. The couples are numbered in order, the first couple being (0, 1), the second couple being (2, 3), and so on with the last couple being (2n - 2, 2n - 1).

# Return the minimum number of swaps so that every couple is sitting side by side. A swap consists of choosing any two people, then they stand up and switch seats.

 

# Example 1:

# Input: row = [0,2,1,3]
# Output: 1
# Explanation: We only need to swap the second (row[1]) and third (row[2]) person.
# Example 2:

# Input: row = [3,2,0,1]
# Output: 0
# Explanation: All couples are already seated side by side.
 

# Constraints:

# 2n == row.length
# 2 <= n <= 30
# n is even.
# 0 <= row[i] < 2n
# All the elements of row are unique.

from typing import List

class Solution:
    def minSwapsCouples(self, row: List[int]) -> int:
        dic = dict()
        for i in range(len(row)):
            dic[row[i]] = i
        count = 0
        for i in range(0, len(row), 2):
            if row[i] % 2 == 0:
                partner = row[i] + 1
            else:
                partner = row[i] - 1

            stranger = row[i + 1]
            if stranger != partner:
                row[i + 1], row[dic[partner]] = partner, stranger
                dic[partner], dic[stranger] = i + 1, dic[partner]
                count += 1
        return count