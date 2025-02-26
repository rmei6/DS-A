// Given a string s that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

// Return a list of unique strings that are valid with the minimum number of removals. You may return the answer in any order.

 

// Example 1:

// Input: s = "()())()"
// Output: ["(())()","()()()"]
// Example 2:

// Input: s = "(a)())()"
// Output: ["(a())()","(a)()()"]
// Example 3:

// Input: s = ")("
// Output: [""]
 

// Constraints:

// 1 <= s.length <= 25
// s consists of lowercase English letters and parentheses '(' and ')'.
// There will be at most 20 parentheses in s.

/**
 * @param {string} s
 * @return {string[]}
 */
var isValid = string => {
  let open = 0;
  for (const c of string) {
      if (c === '(') open++;
      else if (c === ')') {
          if (open === 0) return false;
          open--;
      }
  }
  
  return open === 0;
};

var removeInvalidParentheses = function(s) {
  if (!s || s.length === 0) return [''];
  
  const queue = [s], seen = new Set(), result = [];
  seen.add(s);
  
  let validFound = false;
  
  while (queue.length > 0) {
      let expression = queue.shift();
      
      if (isValid(expression)) {
          result.push(expression);
          validFound = true;
      }
      
      if (validFound) continue;
      
      for (let i = 0; i < expression.length; i++) {
          if (expression[i] !== '(' && expression[i] !== ')') {
              continue;
          }
          let next = expression.substring(0, i) + expression.substring(i + 1);
          if (!seen.has(next)) {
              seen.add(next);
              queue.push(next);
          }
      }
  }
  
  return result;
};