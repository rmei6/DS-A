# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
		    dummy = ListNode(None, head)
		    prev = dummy
		    curr = head
		    while(curr and curr.next):
				prev.next = cur.next
				    cur.next = cur.next.next
				    prev.next.next = cur
				    prev = cur
				    cur = cur.next
				return dummy.next