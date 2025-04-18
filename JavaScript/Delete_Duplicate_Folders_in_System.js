// Due to a bug, there are many duplicate folders in a file system. You are given a 2D array paths, where paths[i] is an array representing an absolute path to the ith folder in the file system.

// For example, ["one", "two", "three"] represents the path "/one/two/three".
// Two folders (not necessarily on the same level) are identical if they contain the same non-empty set of identical subfolders and underlying subfolder structure. The folders do not need to be at the root level to be identical. If two or more folders are identical, then mark the folders as well as all their subfolders.

// For example, folders "/a" and "/b" in the file structure below are identical. They (as well as their subfolders) should all be marked:
// /a
// /a/x
// /a/x/y
// /a/z
// /b
// /b/x
// /b/x/y
// /b/z
// However, if the file structure also included the path "/b/w", then the folders "/a" and "/b" would not be identical. Note that "/a/x" and "/b/x" would still be considered identical even with the added folder.
// Once all the identical folders and their subfolders have been marked, the file system will delete all of them. The file system only runs the deletion once, so any folders that become identical after the initial deletion are not deleted.

// Return the 2D array ans containing the paths of the remaining folders after deleting all the marked folders. The paths may be returned in any order.

 

// Example 1:


// Input: paths = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
// Output: [["d"],["d","a"]]
// Explanation: The file structure is as shown.
// Folders "/a" and "/c" (and their subfolders) are marked for deletion because they both contain an empty
// folder named "b".
// Example 2:


// Input: paths = [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]]
// Output: [["c"],["c","b"],["a"],["a","b"]]
// Explanation: The file structure is as shown. 
// Folders "/a/b/x" and "/w" (and their subfolders) are marked for deletion because they both contain an empty folder named "y".
// Note that folders "/a" and "/c" are identical after the deletion, but they are not deleted because they were not marked beforehand.
// Example 3:


// Input: paths = [["a","b"],["c","d"],["c"],["a"]]
// Output: [["c"],["c","d"],["a"],["a","b"]]
// Explanation: All folders are unique in the file system.
// Note that the returned array can be in a different order as the order does not matter.
 

// Constraints:

// 1 <= paths.length <= 2 * 10^4
// 1 <= paths[i].length <= 500
// 1 <= paths[i][j].length <= 10
// 1 <= sum(paths[i][j].length) <= 2 * 10^5
// path[i][j] consists of lowercase English letters.
// No two paths lead to the same folder.
// For any folder not at the root level, its parent folder will also be in the input.

/**
 * @param {string[][]} paths
 * @return {string[][]}
 */

// custom trie approach, passed 106/108 cases

// class Node {
//   constructor(val, parent){
//       this.val = val;
//       this.parent = parent;
//       this.children = {};
//       this.hash;
//   };
// };
// class Trie {
//   constructor(){
//       this.root = new Node('');
//       this.hashMemo = {};
//   };
//   insert(path){
//       let cur = this.root;
//       for(let node of path)
//           if(cur.children[node] !== undefined)
//               cur = cur.children[node];
//           else
//               cur.children[node] = new Node(node, cur), cur = cur.children[node];
//   };
//   traverse(node = this.root){
//       node.hash = []
//       if(node.children)
//           for(let child of Object.values(node.children))
//               node.hash.push(this.traverse(child))
//       node.hash = node.hash.join('~')
//       if(node.hash !== ''){
//           if(this.hashMemo[node.hash] === undefined)
//               this.hashMemo[node.hash] = [] 
//           this.hashMemo[node.hash].push(node)
//           return node.val + '/[' + node.hash + ']'
//       }
//       return node.val
//   }
//   delete(node = this.root){
//       if(!node || node.hash === undefined)
//           return
//       else if(this.hashMemo[node.hash] && this.hashMemo[node.hash].length > 1)
//           for(let todelete of this.hashMemo[node.hash])
//               delete todelete.parent.children[todelete.val]
//       else
//           for(let child of Object.values(node.children))
//               this.delete(child)
//   }
//   serialize(node = this.root, stack = [], res = []){
//       if(node.val !== '')
//           stack.push(node.val),
//           res.push([...stack])
//       for(let child of Object.values(node.children))
//           this.serialize(child, stack, res)
//       stack.pop()
//       return res
//   }
// }

// var deleteDuplicateFolder = function(paths) {
//   let T = new Trie()
//   for(let P of paths)
//       T.insert(P)
//   T.traverse()
//   T.delete()
//   return T.serialize()
// };
class TrieNode {
  constructor() {
      this.children = new Map()
      this.del = false
      this.val = ''
  }
}
class Trie {
  constructor() {
      this.root = new TrieNode()
  }
  insert(path) {
      let node = this.root
      for (const folder of path) {
          if (!node.children.has(folder)) {
              node.children.set(folder, new TrieNode())
              node.val = folder
          }
          node = node.children.get(folder)
      }
  }
}
var deleteDuplicateFolder = function (paths) {
  paths.sort()
  let trie = new Trie()
  for (const path of paths) {
      trie.insert(path)
  }
  let root = trie.root
  let map = new Map()
  function dfs(node) {
      if (node.children.size === 0) return node.val
      let output = ''
      for (const [k, child] of node.children.entries()) {
          output += `${k}${dfs(child)}`
      }
      if (output) {
          if (!map.has(output)) {
              map.set(output, [])
          }
          map.get(output).push(node)
      }
      return node.val + output

  }
  dfs(root)
  for (const [k, arr] of map.entries()) {
      if (arr.length > 1) {
          for (const node of arr) {
              node.del = true
          }
      }
  }
  let output = []
  function dfs2(node, path) {
      for (const [k, child] of node.children.entries()) {
          if (!child.del) {

              dfs2(child, [...path, k])
          }
      }
      if (path.length) {
          output.push([...path])
      }

  }
  dfs2(root, [])
  return output
};