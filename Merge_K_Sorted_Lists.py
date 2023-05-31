# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        res = ListNode()
        p = res
        for i, h in enumerate(lists):
            if(h):
                heappush(heap, (h.val, i))
        while(heap):
            val, i = heappop(heap)
            n = lists[i]
            p.next = n
            p = n
            if(n.next):
                heappush(heap, (n.next.val, i))
                lists[i] = n.next
        return res.next