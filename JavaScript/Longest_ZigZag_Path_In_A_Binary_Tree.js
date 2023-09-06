// You are given the root of a binary tree.

// A ZigZag path for a binary tree is defined as follow:

// Choose any node in the binary tree and a direction (right or left).
// If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
// Change the direction from right to left or from left to right.
// Repeat the second and third steps until you can't move in the tree.
// Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

// Return the longest ZigZag path contained in that tree.

// Example 1:
// Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1,null,1]
// Output: 3
// Explanation: Longest ZigZag path in blue nodes (right -> left -> right).

let ans = 0;

var dfs = (root,left,steps) => {
    if(root == undefined){
        return 
    }

    ans = Math.max(ans,steps)

    if(left){
        dfs(root.left, !left, steps+1)
        dfs(root.right, left, 1)
    }
    else{
        dfs(root.left, left, 1)
        dfs(root.right, !left, steps+1)
    }
}

var longestZigZag = function(root) {
    ans = 0

    dfs(root,true,0)
    dfs(root,false,0)

    return ans;
};