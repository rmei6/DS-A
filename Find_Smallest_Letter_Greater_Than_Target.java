// You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

// Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.

 

// Example 1:

// Input: letters = ["c","f","j"], target = "a"
// Output: "c"
// Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.
// Example 2:

// Input: letters = ["c","f","j"], target = "c"
// Output: "f"
// Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.

class Solution {
  public char nextGreatestLetter(char[] letters, char target) {
      char res=letters[0];
      int start=0;
      int end=letters.length-1;
      while(start<=end)
      {
          int mid=start+(end-start)/2;
          if(letters[mid]==target)
          {
              start=mid+1;
          }
          else if(target>letters[mid])
          {
              start=mid+1;
          }
          else if(letters[mid]>target)
          {
              res=letters[mid];
              end=mid-1;
          }
      }
      return res;
  }
}