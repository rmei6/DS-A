// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

 

// Example 1:


// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]
// Example 2:


// Input: head = [1,2,3,4,5], k = 3
// Output: [3,2,1,4,5]
 

// Constraints:

// The number of nodes in the list is n.
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  const reverseNextKNodes = (head, k) => {
      let tempHead = head;
      for (let i = 0; i < k; i++) {
          if (tempHead.next === null) {
              return tempHead;
          }
          tempHead = tempHead.next;
      }

      let nodeFirst = head.next;
      let prevNode = head;
      let currentNode = nodeFirst;
      for (let i = 0; i < k; i++) {
          let temp = currentNode.next;
          currentNode.next = prevNode;
          prevNode = currentNode;
          currentNode = temp;
      }

      nodeFirst.next = currentNode;
      head.next = prevNode;

      return nodeFirst;
  }

  if (head === null || k <= 1) {
      return head;
  }

  const tempNode = new ListNode(0);
  tempNode.next = head;

  head = tempNode;
  while (head.next !== null) {
      head = reverseNextKNodes(head, k);
  }

  return tempNode.next;
};