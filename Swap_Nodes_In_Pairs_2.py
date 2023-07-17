#!/bin/python3

import math
import os
import random
import re
import sys

class SinglyLinkedListNode:
    def __init__(self, node_data):
        self.data = node_data
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def insert_node(self, node_data):
        node = SinglyLinkedListNode(node_data)

        if not self.head:
            self.head = node
        else:
            self.tail.next = node

        self.tail = node

def print_singly_linked_list(node, sep, fptr):
    while node:
        fptr.write(str(node.data))

        node = node.next

        if node:
            fptr.write(sep)


#
# Complete the 'swapPairs' function below.
#
# The function is expected to return an INTEGER_SINGLY_LINKED_LIST.
# The function accepts INTEGER_SINGLY_LINKED_LIST head as parameter.
#

#
# For your reference:
#
# SinglyLinkedListNode:
#     int data
#     SinglyLinkedListNode next
#
#

def swapPairs(head):
    # Write your code here
    new_head = head
    prev = None
    first = head
    second = head.next
    if(second):
        new_head = second
    else:
        return head
    first = head
    next_first = first
    while(next_first and next_first.next):
        first = next_first
        second = next_first.next
        next_first = second.next
        if(prev != None):
            prev.next = second
        second.next = first
        prev = first
    if(next_first and not(next_first.next)):
        prev.next = next_first
    else:
        prev.next = None
    return new_head

    # dummy = SinglyLinkedListNode(None)
    # prev = dummy
    # curr = head
    # if(not curr.next):
    #     return head
    # while(curr and curr.next):
    #     prev.next = curr.next
    #     curr.next = curr.next.next
    #     prev.next.next = curr
    #     prev = curr
    #     curr = curr.next
    # return dummy.next

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    head_count = int(input().strip())

    head = SinglyLinkedList()

    for _ in range(head_count):
        head_item = int(input().strip())
        head.insert_node(head_item)

    result = swapPairs(head.head)

    print_singly_linked_list(result, '\n', fptr)
    fptr.write('\n')

    fptr.close()
