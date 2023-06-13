# Given an m x n grid of characters board and a string word, return true if word exists in the grid.

# The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

# Example 1:


# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
# Output: true
# Example 2:


# Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
# Output: true


#
# Complete the 'exist' function below.
#
# The function is expected to return a BOOLEAN.
# The function accepts following parameters:
#  1. 2D_STRING_ARRAY board
#  2. STRING word
#

def exist(board: list, word: str) -> bool:
    # Write your code here
    letters = {}
    for letter in word:
        letters[letter] = []
    for m,row in enumerate(board):
        for n,letter in enumerate(row):
            if(letter in word):
                letters[letter].append([m,n])
    for letter in word:
        if(len(letters[letter]) < word.count(letter)):
            return False
    def find(letters,word,index,visited,position) -> bool:
        if(index == len(word)):
            return True
        letter = word[index]
        possible_positions = [[position[0]-1,position[1]],[position[0],position[1]-1],[position[0],position[1]+1],[position[0]+1,position[1]]]
        results = []
        for position in letters[letter]:
            if(position in possible_positions and position not in visited):
                if(find(letters,word,index+1,visited+[position],position)):
                    return True
        return False
    for position in letters[word[0]]:
        if(find(letters,word,1,[position],position)):
            return True
    return False
    # def find(letters,word,index,visited,position) -> bool:
    #     if(index == len(word)):
    #         return True
    #     letter = word[index]
    #     possible_positions = [[position[0]-1,position[1]],[position[0],position[1]-1],[position[0],position[1]+1],[position[0]+1,position[1]]]
    #     results = []
    #     for position in letters[letter]:
    #         if(position in possible_positions and position not in visited):
    #             if(find(letters,word,index+1,visited+[position])):
    #                 return True
    #     return False
        