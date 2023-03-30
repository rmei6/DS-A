var isSubPath = function(head, root) {
  if(head === null){
      return true
  }
  let first_path = false
  let second_path = false
  if(root.val == head.val){
      first_path = isEqual(head,root)
  }else{
      if(root.left){first_path = isSubPath(head,root.left)}
      if(root.right){second_path = isSubPath(head,root.right)}
  }
  return first_path || second_path
};

var isEqual = function(head,root){
  if(head === null){return true}
  // if((!root && head) && head.val != root.val){return false}
  if(head.val != root.val){return false}
  if(head.next === null && !root.left && !root.right){return true}
  let left_value = false
  let right_value = false
  if(root.left){left_value = isEqual(head.next,root.left)}
  if(root.right){right_value = isEqual(head.next,root.right)}
  return left_value || right_value
}

// Solution?
// var isSubPath= function(head, root) {
//         if (!root) {
//             return false;
//         }

//         if (head.val === root.val && this.inTree(head, root)) {
//             return true;
//         }

//         return isSubPath(head, root.left) || isSubPath(head, root.right);
//     }

//  var inTree= function(curr, node) {
//         if (!curr) {
//             return true;
//         }

//         if ((!node && curr) || curr.val !== node.val) {
//             return false;
//         }

//         return inTree(curr.next, node.left) || inTree(curr.next, node.right);
//     }