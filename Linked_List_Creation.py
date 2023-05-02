def createLinkedList(head):
    # Write your code here
    new_node = head
    result = new_node
    previous_node = None
    current_node = head
    odd = True
    while(current_node.next):
        current_node = current_node.next
        odd = not(odd)
        if(odd):
            new_node.next = current_node
            new_node = new_node.next
        else:
            if(previous_node):
                previous_node.next = current_node
                previous_node = previous_node.next
            else:
                # print(head.data)
                head = current_node
                # print(head.data)
                previous_node = current_node
    new_node.next = head
    # print(current_node.next.data)
    # print(current_node.data)
    if(previous_node):
        previous_node.next = None
    return result

#Doesn't always work
#didn't understand problem
#Solution

def get_odds_then_remove(node): # Time(n) Space(1)
    new_link = SinglyLinkedListNode(None)
    old_link = SinglyLinkedListNode(None)
    old_link.next = node
    res1 = new_link
    res2 = old_link
    
    while old_link and old_link.next:
        if old_link.next:
            new_link.next = SinglyLinkedListNode(old_link.next.data)
            new_link = new_link.next
            
        old_link.next = old_link.next.next
        old_link = old_link.next

    return res1.next, new_link, res2.next


def createLinkedList(head): # Time(n log n) Space(1)
    dummy = SinglyLinkedListNode(None)
    res = dummy
    
    while head:
        new_link, new_link_tail, head = get_odds_then_remove(head)
        dummy.next = new_link
        dummy = new_link_tail
    
    return res.next