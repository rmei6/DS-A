# You are given the head of a non-empty linked list representing a non-negative integer without leading zeroes.

# Return the head of the linked list after doubling it.

 

# Example 1:


# Input: head = [1,8,9]
# Output: [3,7,8]
# Explanation: The figure above corresponds to the given linked list which represents the number 189. Hence, the returned linked list represents the number 189 * 2 = 378.
# Example 2:


# Input: head = [9,9,9]
# Output: [1,9,9,8]
# Explanation: The figure above corresponds to the given linked list which represents the number 999. Hence, the returned linked list reprersents the number 999 * 2 = 1998. 
 

# Constraints:

# The number of nodes in the list is in the range [1, 104]
# 0 <= Node.val <= 9
# The input is generated such that the list represents a number that does not have leading zeros, except the number 0 itself.


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def doubleIt(self, head: ListNode) -> ListNode:
        curr = head
        prev = None

        # Traverse the linked list
        while curr:
            twice_of_val = curr.val * 2

            # If the doubled value is less than 10
            if twice_of_val < 10:
                curr.val = twice_of_val
            # If doubled value is 10 or greater
            elif prev:  # other than first node
                # Update current node's value with units digit of the doubled value
                curr.val = twice_of_val % 10
                # Add the carry to the previous node's value
                prev.val += 1
            else:  # first node
                # Create a new node with carry as value and link it to the current node
                head = ListNode(1, curr)
                # Update current node's value with units digit of the doubled value
                curr.val = twice_of_val % 10

            # Update prev and curr pointers
            prev = curr
            curr = curr.next

        return head