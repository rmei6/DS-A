class TreeNode:
     def __init__(self, x):
         self.val = x
         self.left = None
         self.right = None

class KthLargest:
    # Obtain the minimum value of the tree
    def findMin(self) -> int:
        node = self._root;
        while node.left:
            node = node.left
        return node.val
    
    # Obtain the smallest value in the tree > than root->val
    def successor(self, root: TreeNode) -> int:
        root = root.right
        while root.left:
            root = root.left
        return root.val
    
    # Obtain the largest value in the tree <= node->val
    def predecessor(self, root: TreeNode) -> int:
        root = root.left;
        while root.right:
            root = root.right
        return root.val

    # If the tree has an extra node, prune off the smallest one
    def pruneToK(self, root: TreeNode) -> TreeNode:
        if self._size <= self._k:
            return root
        if not root:
            return None
        elif root.left:
            # delete from the left subtree
            root.left = self.pruneToK(root.left)
        else:
            self._size -= 1
            if (not root.left) and (not root.right):
                # the node is a leaf
                root = None
            elif root.right:
                # the node is not a leaf and has a right child
                root.val = self.successor(root)
                root.right = self.deleteNode(root.right, root.val)
        return root
    
    # Delete a node with val=key from the tree rooted at 'root'
    def deleteNode(self, root: TreeNode, key: int) -> TreeNode:
        if not root:
            return None
        if key > root.val:
            # delete from the right subtree
            root.right = self.deleteNode(root.right, key)
        elif key < root.val:
            # delete from the left subtree
            root.left = self.deleteNode(root.left, key)
        else:
            if (not root.left) and (not root.right):
                # the node is a leaf
                root = None
            elif root.right:
                # the node is not a leaf and has a right child
                root.val = self.successor(root)
                root.right = self.deleteNode(root.right, root.val)
            else:
                # the node is not a leaf, has no right child, and has a left child    
                root.val = self.predecessor(root)
                root.left = self.deleteNode(root.left, root.val)
        return root;
    
    # Insert a node into the tree at 'root' with a value 'val'
    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        if not root:
            self._size += 1
            return TreeNode(val);
        elif val > root.val:
            root.right = self.insertIntoBST(root.right, val)
        else:
            root.left = self.insertIntoBST(root.left, val)
        return root;
    
    def __init__(self, k: int, nums: List[int]) -> None:
        self._k = k
        self._root = None
        self._size = 0
        for val in nums:
            self._root = self.insertIntoBST(self._root, val)
            self._root = self.pruneToK(self._root)
    
    def add(self, val: int) -> int:
        self._root = self.insertIntoBST(self._root, val)
        self._root = self.pruneToK(self._root)
        return self.findMin()