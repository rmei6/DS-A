// Design your implementation of the circular double-ended queue (deque).

// Implement the MyCircularDeque class:

// MyCircularDeque(int k) Initializes the deque with a maximum size of k.
// boolean insertFront() Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
// boolean insertLast() Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
// boolean deleteFront() Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
// boolean deleteLast() Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
// int getFront() Returns the front item from the Deque. Returns -1 if the deque is empty.
// int getRear() Returns the last item from Deque. Returns -1 if the deque is empty.
// boolean isEmpty() Returns true if the deque is empty, or false otherwise.
// boolean isFull() Returns true if the deque is full, or false otherwise.
 

// Example 1:

// Input
// ["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
// [[3], [1], [2], [3], [4], [], [], [], [4], []]
// Output
// [null, true, true, true, false, 2, true, true, true, 4]

// Explanation
// MyCircularDeque myCircularDeque = new MyCircularDeque(3);
// myCircularDeque.insertLast(1);  // return True
// myCircularDeque.insertLast(2);  // return True
// myCircularDeque.insertFront(3); // return True
// myCircularDeque.insertFront(4); // return False, the queue is full.
// myCircularDeque.getRear();      // return 2
// myCircularDeque.isFull();       // return True
// myCircularDeque.deleteLast();   // return True
// myCircularDeque.insertFront(4); // return True
// myCircularDeque.getFront();     // return 4
 

// Constraints:

// 1 <= k <= 1000
// 0 <= value <= 1000
// At most 2000 calls will be made to insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, isFull.

/**
 * @param {number} k
 */
var MyCircularDeque = function(k) {
  this.capacity = k
  this.size = 0;
  this.head = 0;
  this.buffer = new Array(k)
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {
  if (this.isFull()) return false;
  this.head = (this.head - 1 + this.capacity) % this.capacity
  this.buffer[this.head] = value;
  this.size++; 
  return true;
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {
  if (this.isFull()) return false;
  const enqueueIdx = (this.head + this.size) % this.capacity
  this.buffer[enqueueIdx] = value;
  this.size++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {
  if (this.isEmpty()) return false
  this.head = (this.head + 1) % this.capacity
  this.size--;
  return true;    
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {
  if (this.isEmpty()) return false;
  this.size--;
  return true;
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {
  if (this.isEmpty()) return -1;
  return this.buffer[this.head]    
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {
  if (this.isEmpty()) return -1;
  const rearIdx = (this.head + this.size - 1) % this.capacity
  return this.buffer[rearIdx]
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
  return this.size === 0    
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
  return this.size === this.capacity
};

/** 
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */