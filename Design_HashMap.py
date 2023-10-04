# Design a HashMap without using any built-in hash table libraries.

# Implement the MyHashMap class:

# MyHashMap() initializes the object with an empty map.
# void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
# int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
# void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.
 

# Example 1:

# Input
# ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
# [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
# Output
# [null, null, null, 1, -1, null, 1, null, -1]

# Explanation
# MyHashMap myHashMap = new MyHashMap();
# myHashMap.put(1, 1); // The map is now [[1,1]]
# myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
# myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
# myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
# myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
# myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
# myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
# myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]
 

# Constraints:

# 0 <= key, value <= 106
# At most 104 calls will be made to put, get, and remove.

class ListNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class MyHashMap:

    def __init__(self):
        self.size = 1000
        self.hash_table = [None] * self.size 

    def put(self, key: int, value: int) -> None:
        index = key % self.size 
    
        if self.hash_table[index] == None:
            self.hash_table[index] = ListNode(key, value)
        else:
            curr_node = self.hash_table[index]
            while True:
                if curr_node.key == key:
                    curr_node.value = value
                    return 
                if curr_node.next == None: break
                curr_node = curr_node.next 
            curr_node.next = ListNode(key, value)

    def get(self, key: int) -> int:
        index = key % self.size 
        
        curr_node = self.hash_table[index]
        
        while curr_node:
            if curr_node.key == key:
                return curr_node.value 
            else:
                curr_node = curr_node.next
        
        return -1

    def remove(self, key: int) -> None:
        index = key % self.size 
        
        curr_node = prev_node = self.hash_table[index]
        
        if not curr_node: return 
        
        if curr_node.key == key:
            self.hash_table[index] = curr_node.next
        else:
            curr_node = curr_node.next
            
            while curr_node:
                if curr_node.key == key:
                    prev_node.next = curr_node.next 
                    break
                else:
                    prev_node, curr_node = prev_node.next, curr_node.next


# Your MyHashMap object will be instantiated and called as such:
# obj = MyHashMap()
# obj.put(key,value)
# param_2 = obj.get(key)
# obj.remove(key)