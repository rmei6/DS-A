# There is an undirected graph consisting of n nodes numbered from 1 to n. You are given the integer n and a 2D array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi. The graph can be disconnected.

# You can add at most two additional edges (possibly none) to this graph so that there are no repeated edges and no self-loops.

# Return true if it is possible to make the degree of each node in the graph even, otherwise return false.

# The degree of a node is the number of edges connected to it.

 

# Example 1:


# Input: n = 5, edges = [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]]
# Output: true
# Explanation: The above diagram shows a valid way of adding an edge.
# Every node in the resulting graph is connected to an even number of edges.
# Example 2:


# Input: n = 4, edges = [[1,2],[3,4]]
# Output: true
# Explanation: The above diagram shows a valid way of adding two edges.
# Example 3:


# Input: n = 4, edges = [[1,2],[1,3],[1,4]]
# Output: false
# Explanation: It is not possible to obtain a valid graph with adding at most 2 edges.
 

# Constraints:

# 3 <= n <= 105
# 2 <= edges.length <= 105
# edges[i].length == 2
# 1 <= ai, bi <= n
# ai != bi
# There are no repeated edges.

from typing import List

class Solution:
    def isPossible(self, n: int, edges: List[List[int]]) -> bool:
        neighbors = [set() for _ in range(n)]
        for edge in edges:
            a, b = edge
            a -= 1
            b -= 1
            neighbors[a].add(b)
            neighbors[b].add(a)
        oddDegreesNodes = [i for i in range(n) if (len(neighbors[i]) % 2 == 1)]
        numOdd = len(oddDegreesNodes)
        if numOdd == 0:
            return True
        elif numOdd == 4:
            # Only possible if there are two pairs of vertices which are not connected
            o1, o2, o3, o4 = oddDegreesNodes
            return (o1 not in neighbors[o2] and o3 not in neighbors[o4]) or (o1 not in neighbors[o3] and o2 not in neighbors[o4]) or (o1 not in neighbors[o4] and o2 not in neighbors[o3])
        elif numOdd == 2:
            # Only possible if both not connected or both connected but there is another node to connect to
            o1, o2 = oddDegreesNodes
            if o1 not in neighbors[o2]:
                 # Case 1: Not connected
                return True
            # Case 2
            bothConnectedTo = neighbors[o1] | neighbors[o2]
            # no other node to connect to
            return len(bothConnectedTo) != n
        return False