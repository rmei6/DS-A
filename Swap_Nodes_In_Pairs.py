# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

from typing import Optional
from typing import ListNode
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
		    dummy = ListNode(None, head)
        prev = dummy
		    curr = head
		    while(curr and curr.next):
						prev.next = curr.next
				    curr.next = curr.next.next
				    prev.next.next = curr
				    prev = curr
				    curr = curr.next
				return dummy.next