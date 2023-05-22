# Given the head of a linked list, remove the nth node from the end of the list and return its head.

 

# Example 1:


# Input: head = [1,2,3,4,5], n = 2
# Output: [1,2,3,5]
# Example 2:

# Input: head = [1], n = 1
# Output: []

def delete_from_end(head, k):
    # Write your code here
    #Attempt
    # prev = head
    # curr = head.next
    # end = head
    # count = 0
    # while(end.next):
    #     end = end.next
    #     count += 1
    #     if(count > k):
    #         prev = prev.next
    #         curr = curr.next
    # prev.next = curr.next
    # return head

    #Solution
    fast = head
    slow = head
    # advance fast to nth position
    for i in range(k):
        fast = fast.next
            
    if not fast:
        return head.next
    # then advance both fast and slow now they are nth postions apart
    # when fast gets to None, slow will be just before the item to be deleted
    while fast.next:
        slow = slow.next
        fast = fast.next
    # delete the node
    slow.next = slow.next.next
    return head