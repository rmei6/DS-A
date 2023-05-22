# You are given the head of a linked list, and an integer k.

# Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

def swapNodes(head, k):
    # Write your code here
    #attempt
    prev = head
    first = head
    last_prev = head
    last = head
    for i in range(1, k):
        prev = first
        first = first.next
    null_checker = first 
    while null_checker.next:
        last_prev = last
        last = last.next
        null_checker = null_checker.next
    prev.next, last_prev.next = last_prev.next, prev.next
    last.next, first.next = first.next, last.next
    return head