# Given a string representing a code snippet, implement a tag validator to parse the code and return whether it is valid.

# A code snippet is valid if all the following rules hold:

# The code must be wrapped in a valid closed tag. Otherwise, the code is invalid.
# A closed tag (not necessarily valid) has exactly the following format : <TAG_NAME>TAG_CONTENT</TAG_NAME>. Among them, <TAG_NAME> is the start tag, and </TAG_NAME> is the end tag. The TAG_NAME in start and end tags should be the same. A closed tag is valid if and only if the TAG_NAME and TAG_CONTENT are valid.
# A valid TAG_NAME only contain upper-case letters, and has length in range [1,9]. Otherwise, the TAG_NAME is invalid.
# A valid TAG_CONTENT may contain other valid closed tags, cdata and any characters (see note1) EXCEPT unmatched <, unmatched start and end tag, and unmatched or closed tags with invalid TAG_NAME. Otherwise, the TAG_CONTENT is invalid.
# A start tag is unmatched if no end tag exists with the same TAG_NAME, and vice versa. However, you also need to consider the issue of unbalanced when tags are nested.
# A < is unmatched if you cannot find a subsequent >. And when you find a < or </, all the subsequent characters until the next > should be parsed as TAG_NAME (not necessarily valid).
# The cdata has the following format : <![CDATA[CDATA_CONTENT]]>. The range of CDATA_CONTENT is defined as the characters between <![CDATA[ and the first subsequent ]]>.
# CDATA_CONTENT may contain any characters. The function of cdata is to forbid the validator to parse CDATA_CONTENT, so even it has some characters that can be parsed as tag (no matter valid or invalid), you should treat it as regular characters.
 

# Example 1:

# Input: code = "<DIV>This is the first line <![CDATA[<div>]]></DIV>"
# Output: true
# Explanation: 
# The code is wrapped in a closed tag : <DIV> and </DIV>. 
# The TAG_NAME is valid, the TAG_CONTENT consists of some characters and cdata. 
# Although CDATA_CONTENT has an unmatched start tag with invalid TAG_NAME, it should be considered as plain text, not parsed as a tag.
# So TAG_CONTENT is valid, and then the code is valid. Thus return true.
# Example 2:

# Input: code = "<DIV>>>  ![cdata[]] <![CDATA[<div>]>]]>]]>>]</DIV>"
# Output: true
# Explanation:
# We first separate the code into : start_tag|tag_content|end_tag.
# start_tag -> "<DIV>"
# end_tag -> "</DIV>"
# tag_content could also be separated into : text1|cdata|text2.
# text1 -> ">>  ![cdata[]] "
# cdata -> "<![CDATA[<div>]>]]>", where the CDATA_CONTENT is "<div>]>"
# text2 -> "]]>>]"
# The reason why start_tag is NOT "<DIV>>>" is because of the rule 6.
# The reason why cdata is NOT "<![CDATA[<div>]>]]>]]>" is because of the rule 7.
# Example 3:

# Input: code = "<A>  <B> </A>   </B>"
# Output: false
# Explanation: Unbalanced. If "<A>" is closed, then "<B>" must be unmatched, and vice versa.
 

# Constraints:

# 1 <= code.length <= 500
# code consists of English letters, digits, '<', '>', '/', '!', '[', ']', '.', and ' '.

class Solution:
  def isValid(self, code: str) -> bool:
    if code[0] != '<' or code[-1] != '>':
      return False
    containsTag = False  # Flag to check if code contains a tag
    stack = []  # Stack to keep track of tags

    def isValidCdata(s: str) -> bool:  # Check if a given string is valid CDATA
        return s.find('[CDATA[') == 0

    def isValidTagName(tagName: str, isEndTag: bool) -> bool:  # Check if a given tag name is valid
        nonlocal containsTag
        if not tagName or len(tagName) > 9:  # Check tag name length
            return False
        if any(not c.isupper() for c in tagName):  # Check if all characters in tag name are uppercase
            return False

        if isEndTag:  # Check if end tag is valid
            return stack and stack.pop() == tagName

        containsTag = True  # Set flag to True
        stack.append(tagName)  # Push tag to stack
        return True

    i = 0
    while i < len(code):
        if not stack and containsTag:  # If stack is empty but code contains a tag, return False
            return False
        if code[i] == '<':
            if stack and code[i + 1] == '!':  # Check if CDATA
                closeIndex = code.find(']]>', i + 2)
                if closeIndex == -1 or not isValidCdata(code[i + 2:closeIndex]):  # Check if CDATA is valid
                    return False
            elif code[i + 1] == '/':  # Check if end tag
                closeIndex = code.find('>', i + 2)
                if closeIndex == -1 or not isValidTagName(code[i + 2:closeIndex], True):  # Check if end tag is valid
                    return False
            else:  # Check if start tag
                closeIndex = code.find('>', i + 1)
                if closeIndex == -1 or not isValidTagName(code[i + 1:closeIndex], False):  # Check if start tag is valid
                    return False
            i = closeIndex  # Set index to end of tag
        i += 1

    return not stack and containsTag  # Check if stack is empty and code contains a tag