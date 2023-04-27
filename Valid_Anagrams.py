def is_anagrams(s):
    # Write your code here
    if(len(s) == 1):
        return True
    letters = {}
    for letter in s[0]:
        if(letter in letters):
            letters[letter] += 1
        else:
            letters[letter] = 1
    length = len(s[0])
    for word in s:
        match = {}
        if(len(word) != length):
            return False
        for letter in word:
            if(letter in match):
                match[letter] += 1
            else:
                match[letter] = 1
        for letter in match:
            if( not(letter in letters) or (letters[letter] != match[letter])):
                return False
    return True