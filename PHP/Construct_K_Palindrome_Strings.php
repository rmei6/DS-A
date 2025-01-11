<!-- Given a string s and an integer k, return true if you can use all the characters in s to construct k palindrome strings or false otherwise.

 

Example 1:

Input: s = "annabelle", k = 2
Output: true
Explanation: You can construct two palindromes using all characters in s.
Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"
Example 2:

Input: s = "leetcode", k = 3
Output: false
Explanation: It is impossible to construct 3 palindromes using all the characters of s.
Example 3:

Input: s = "true", k = 4
Output: true
Explanation: The only possible solution is to put each character in a separate string.
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
1 <= k <= 105 -->

class Solution {

/**
 * @param String $s
 * @param Integer $k
 * @return Boolean
 */
  function canConstruct($s, $k) {
      if($k > strlen($s)){
          return false;
      }
      $map = $this->charFrequency($s);
      $odd = 0;
      
      for($i = 0; $i < 26; $i++){
          if($map[$i] % 2 != 0){
              $odd++;
          }
      }
      
      return $odd <= $k;
  }
  function charFrequency($s){
      $map = array_fill(0, 26, 0);
      for($i = 0; $i < strlen($s); $i++){
          $index = ord($s[$i]) - ord('a');
          $map[$index] += 1;
      }
      return $map;
  }
}