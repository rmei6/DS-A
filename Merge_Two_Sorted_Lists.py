# You are given the heads of two sorted linked lists list1 and list2.

# Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

# Return the head of the merged linked list.

 

# Example 1:


# Input: list1 = [1,2,4], list2 = [1,3,4]
# Output: [1,1,2,3,4,4]
# Example 2:

# Input: list1 = [], list2 = []
# Output: []
# Example 3:

# Input: list1 = [], list2 = [0]
# Output: [0]
 

# Constraints:

# The number of nodes in both lists is in the range [0, 50].
# -100 <= Node.val <= 100
# Both list1 and list2 are sorted in non-decreasing order.

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

from typing import Optional

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        if(not list1 or not list2):
            return list1 if not list2 else list2
        head1,head2 = list1,list2
        result = None
        if(head1.val < head2.val):
            result = head1
            head1 = head1.next
        else:
            result = head2
            head2 = head2.next
        merged_head = result
        while head1 and head2:
            if(head1.val < head2.val):
                result.next = head1
                head1 = head1.next
            else:
                result.next = head2
                head2 = head2.next
            result = result.next
        result.next = head1 if head1 else head2
        return merged_head