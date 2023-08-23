# You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

# Return the length of the longest substring containing the same letter you can get after performing the above operations.

 

# Example 1:

# Input: s = "ABAB", k = 2
# Output: 4
# Explanation: Replace the two 'A's with two 'B's or vice versa.
# Example 2:

# Input: s = "AABABBA", k = 1
# Output: 4
# Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
# The substring "BBBB" has the longest repeating letters, which is 4.
# There may exists other ways to achive this answer too.
 

# Constraints:

# 1 <= s.length <= 105
# s consists of only uppercase English letters.
# 0 <= k <= s.length

# JavaScript Solution?
#  use hash to get count of most common char
#  track window length, dist between two pointers
#  while window leng - count of most feq char >= k,
#  keep moving the right pointer to the right,
#  if this becomes invalid, move left pointer until it is true
# var characterReplacement = function(s, k) {
#     let left = 0;
#     let right = 0;
#     let maxCharCount = 0;
#     const visited = {};

#   while (right < s.length) {
#     const char = s[right];
#     visited[char] = visited[char] ? visited[char] + 1 : 1;
#     if (visited[char] > maxCharCount) maxCharCount = visited[char];

#     if (right - left + 1 - maxCharCount > k) {
#         visited[s[left]]--;
#         left++;
#       }

#       right++;
#     }

#   return right - left;
# };

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # max_length = 0
        # current_length = 0
        # letter = s[0]
        # place = 0
        # break_point = False
        # num_rep = k
        # while place < len(s):
          #advance count if you find the same letter
        #     if s[place] == letter:
        #         current_length += 1
        #         place += 1
        #     else:
          # set breakpoint to go back to if it's the first other letter you find
        #         if not break_point:
        #             break_point = place
          # used up the replacements
        #         if num_rep > 0:
        #             current_length += 1
        #             place += 1
        #             num_rep -= 1
          # if the replacements are used up, find max_length and backtrack to breakpoint
        #         else:
        #             max_length = max(max_length,current_length)
        #             current_length = 0
        #             num_rep = k
        #             letter = s[break_point]
        #             place = break_point
        #             break_point = False
        # print(break_point)
        # print(num_rep)
        # print(letter)
          # go backwards if there are replacements to be used for a possible longer substring
        # if(num_rep != 0):
        #     place = break_point - 1
        #     while(place > -1 and num_rep > 0):
        #         if(s[place] != letter):
        #             current_length += 1
        #             num_rep -= 1
        #         place -= 1
        # return max(max_length,current_length)

        l = 0
        c_frequency = {}
        longest_str_len = 0
        for r in range(len(s)):
            
            if not s[r] in c_frequency:
                c_frequency[s[r]] = 0
            c_frequency[s[r]] += 1
            
            # Replacements cost = cells count between left and right - highest frequency
            cells_count = r - l + 1
            if cells_count - max(c_frequency.values()) <= k:
                longest_str_len = max(longest_str_len, cells_count)
                
            else:
                c_frequency[s[l]] -= 1
                if not c_frequency[s[l]]:
                    c_frequency.pop(s[l])
                l += 1
        
        return longest_str_len