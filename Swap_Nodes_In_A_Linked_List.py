# You are given the head of a linked list, and an integer k.

# Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).

#attempt
def swapNodes1(head, k):
    # Write your code here
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

#solution
def grab_nodes(head, k):
    # Initialize pointers
    f, b = None, None
    
    # Create a new head node
    new_head = SinglyLinkedListNode('list-head')
    
    # Set the next of new_head to the original head
    new_head.next = head
    
    # Initialize window_back and window_front pointers
    window_back, window_front = new_head, new_head

    # Find the front node to be swapped
    for i in range(k):
        if i == k - 1:
            f = window_front  # Set f to the front node
        window_front = window_front.next  # Move window_front forward

    # Find the back node to be swapped
    while window_front.next:
        window_front = window_front.next  # Move window_front to the end
        window_back = window_back.next  # Move window_back with window_front

    b = window_back  # Set b to the back node
    
    return f, b, new_head


def swapNodes(head, k):
    # Get front and back nodes to be swapped
    front, back, new_head = grab_nodes(head, k)

    node1 = front.next  # Get the node after front
    node2 = back.next  # Get the node after back

    front.next = node2  # Update front's next to point to node2
    back.next = node1  # Update back's next to point to node1

    node1.next, node2.next = node2.next, node1.next  # Swap the next pointers of node1 and node2

    return new_head.next  # Return the updated linked list