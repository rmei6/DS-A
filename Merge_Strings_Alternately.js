// You are given two strings word1 and word2. 
// Merge the strings by adding letters in alternating order, starting with word1. 
// If a string is longer than the other, 
// append the additional letters onto the end of the merged string.

// Return the merged string.

function merge_alt(word1, word2) {
  let len = Math.min(word1.length,word2.length)
  let merged = []
  for(let i=0;i<len;i++){
      merged.push(word1[i])
      merged.push(word2[i])
  }
  return merged.join('') + word1.substring(len) + word2.substring(len)
}