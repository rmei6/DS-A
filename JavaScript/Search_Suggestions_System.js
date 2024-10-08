// You are given an array of strings products and a string searchWord.

// Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

// Return a list of lists of the suggested products after each character of searchWord is typed.

 

// Example 1:

// Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
// Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
// Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
// After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
// After typing mou, mous and mouse the system suggests ["mouse","mousepad"].
// Example 2:

// Input: products = ["havana"], searchWord = "havana"
// Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
// Explanation: The only word "havana" will be always suggested while typing the search word.
 

// Constraints:

// 1 <= products.length <= 1000
// 1 <= products[i].length <= 3000
// 1 <= sum(products[i].length) <= 2 * 104
// All the strings of products are unique.
// products[i] consists of lowercase English letters.
// 1 <= searchWord.length <= 1000
// searchWord consists of lowercase English letters.

class Trie {
  constructor() {
      this.children = {};
      this.word = '';
      this.isWord = false;
  }

  insert(word) {
      let node = this;

      for (const char of word) {
          if (!node.children[char]) node.children[char] = new Trie();
          node = node.children[char];
      }

      node.isWord = true;
      node.word = word;
  }

  startsWith(prefix) {
      let node = this;

      for (const char of prefix) {
          if (!node.children[char]) return [];
          node = node.children[char];
      }

      const suggestions = []
      const traverse = (node) => {
          if (node.isWord) {
              suggestions.push(node.word);
          }

          for (const child in node.children) {
              traverse(node.children[child]);
          }
      }

      traverse(node);
      return suggestions.sort().slice(0, 3);

  }
}

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
const suggestedProducts = function(products, searchWord) {
  // iterative method
  // const result = [];
  // let prefix = '';

  // for (const char of searchWord) {
  //     prefix += char;
  //     const suggestions = [];

  //     for (const product of products) {
  //         if (product.startsWith(prefix)) {
  //             suggestions.push(product);
  //         }
  //     }

  //     result.push(suggestions.sort().slice(0, 3));
  // }

  // return result;
  // trie method
  let root = new Trie();

    for (const product of products) {
        root.insert(product);
    }

    const result = [];
    let prefix = '';

    for (const char of searchWord) {
        const suggestions = root.startsWith(prefix += char);
        result.push(suggestions);
    }

    return result;
};