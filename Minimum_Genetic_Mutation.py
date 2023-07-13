# A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.

# Suppose we need to investigate a mutation from a gene string startGene to a gene string endGene where one mutation is defined as one single character changed in the gene string.

# For example, "AACCGGTT" --> "AACCGGTA" is one mutation.
# There is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it a valid gene string.

# Given the two gene strings startGene and endGene and the gene bank bank, return the minimum number of mutations needed to mutate from startGene to endGene. If there is no such a mutation, return -1.

# Note that the starting point is assumed to be valid, so it might not be included in the bank.

 

# Example 1:

# Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
# Output: 1
# Example 2:

# Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
# Output: 2
 

# Constraints:

# 0 <= bank.length <= 10
# startGene.length == endGene.length == bank[i].length == 8
# startGene, endGene, and bank[i] consist of only the characters ['A', 'C', 'G', 'T'].

from typing import Deque
from typing import List

class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        # Create a set of all valid genes in the bank for faster access
        bankSet = set(bank)
        
        # Define the possible mutations for each character
        options = ['A', 'C', 'G', 'T']
        
        # Create a queue to store the genes to be checked
        queue = Deque()
        queue.append(startGene)
        
        # Create a set to mark visited genes
        visited = set()
        visited.add(startGene)
        
        # Counter to keep track of the minimum mutations required to reach end gene
        count = 0
        
        # Perform BFS
        while queue:
            size = len(queue)
            for i in range(size):
                gene = queue.popleft()
                if gene == endGene:
                    return count
                for j in range(8):
                    for option in options:
                        newGene = gene[:j] + option + gene[j+1:]
                        if newGene in bankSet and newGene not in visited:
                            visited.add(newGene)
                            queue.append(newGene)
            count += 1
        
        # If end gene not found
        return -1