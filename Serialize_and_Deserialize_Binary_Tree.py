# Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

# Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

# Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

 

# Example 1:


# Input: root = [1,2,3,null,null,4,5]
# Output: [1,2,3,null,null,4,5]
# Example 2:

# Input: root = []
# Output: []
 

# Constraints:

# The number of nodes in the tree is in the range [0, 104].
# -1000 <= Node.val <= 1000

# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        """
        s=""
        queue=[]
        queue.append(root)
        while(len(queue)!=0):
            node=queue.pop(0)
            if(node==None):
                s=s+"#,"
            else:
                s=s+str(node.val)+","
            if(node!=None):
                queue.append(node.left)
                queue.append(node.right)
        print(s)
        return s

        

    def deserialize(self, data):
        """Decodes your encoded data to tree."""
        if(len(data)==0):
            return None
        lt=data.split(",")
        if(lt[0]=="#"):
            return None
        lt.pop()
        queue=[]
        root=TreeNode(lt[0])
        queue.append(root)
        i=0
        while(len(queue)!=0):
            node=queue.pop(0)
            i=i+1
            if(lt[i]=="#"):
                node.left=None
            else:
                node.left=TreeNode(int(lt[i]))
                queue.append(node.left)
            i=i+1
            if(lt[i]=="#"):
                node.right=None
            else:
                node.right=TreeNode(int(lt[i]))
                queue.append(node.right)
        return root
            


        

# Your Codec object will be instantiated and called as such:
# ser = Codec()
# deser = Codec()
# ans = deser.deserialize(ser.serialize(root))