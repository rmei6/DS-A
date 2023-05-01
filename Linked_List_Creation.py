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