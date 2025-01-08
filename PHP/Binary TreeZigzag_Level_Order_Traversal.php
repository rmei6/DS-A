<!-- Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

 

Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-100 <= Node.val <= 100
-->

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     public $val = null;
 *     public $left = null;
 *     public $right = null;
 *     function __construct($val = 0, $left = null, $right = null) {
 *         $this->val = $val;
 *         $this->left = $left;
 *         $this->right = $right;
 *     }
 * }
 */
class Solution {

    /**
     * @param TreeNode $root
     * @return Integer[][]
     */
    function zigzagLevelOrder($root) {
        if ($root === null) {
            return [];
        }

        $result = [];
        $queue = [$root];
        $leftToRight = true;

        while (!empty($queue)) {
            $levelSize = count($queue);
            $level = [];

            for ($i = 0; $i < $levelSize; $i++) {
                $node = array_shift($queue);

                if ($leftToRight) {
                    $level[] = $node->val;
                } else {
                    array_unshift($level, $node->val);
                }

                if ($node->left !== null) {
                    $queue[] = $node->left;
                }
                if ($node->right !== null) {
                    $queue[] = $node->right;
                }
            }

            $result[] = $level;
            $leftToRight = !$leftToRight;
        }

        return $result;
    }
}