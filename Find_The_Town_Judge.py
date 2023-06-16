# In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.

# If the town judge exists, then:

# The town judge trusts nobody.
# Everybody (except for the town judge) trusts the town judge.
# There is exactly one person that satisfies properties 1 and 2.
# You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi. If a trust relationship does not exist in trust array, then such a trust relationship does not exist.

# Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

 

# Example 1:

# Input: n = 2, trust = [[1,2]]
# Output: 2
# Example 2:

# Input: n = 3, trust = [[1,3],[2,3]]
# Output: 3
# Example 3:

# Input: n = 3, trust = [[1,3],[2,3],[3,1]]
# Output: -1

class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        if(len(trust) == 0):
            if(n == 1):
                return 1
            return -1
        people = {}
        trusting = set([])
        for a,b in trust:
            if(b not in people):
                people[b] = set([])
            people[b].add(a)
            trusting.add(a)
        possible_judges = []
        for person in people.keys():
            if(len(people[person]) == n-1):
                possible_judges.append(person)
        if(len(possible_judges) == 0):
            return -1
        result = [x for x in possible_judges if x not in trusting]
        if(len(result) == 0):
            return -1
        return result[0]