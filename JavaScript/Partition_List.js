// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

 

// Example 1:


// Input: head = [1,4,3,2,5,2], x = 3
// Output: [1,2,2,4,3,5]
// Example 2:

// Input: head = [2,1], x = 2
// Output: [1,2]
 

// Constraints:

// The number of nodes in the list is in the range [0, 200].
// -100 <= Node.val <= 100
// -200 <= x <= 200

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
  let before = new ListNode(0);
  let after = new ListNode(0);
  let before_curr = before;
  let after_curr = after;
  
  while(head !== null) {
      if(head.val < x) {
          before_curr.next = head;
          before_curr = before_curr.next;
      } else {
          after_curr.next = head;
          after_curr = after_curr.next;
      }
      head = head.next;
  }
  
  after_curr.next = null;
  before_curr.next = after.next;
  
  return before.next;
};