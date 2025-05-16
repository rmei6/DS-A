// You are playing a variation of the game Zuma.

// In this variation of Zuma, there is a single row of colored balls on a board, where each ball can be colored red 'R', yellow 'Y', blue 'B', green 'G', or white 'W'. You also have several colored balls in your hand.

// Your goal is to clear all of the balls from the board. On each turn:

// Pick any ball from your hand and insert it in between two balls in the row or on either end of the row.
// If there is a group of three or more consecutive balls of the same color, remove the group of balls from the board.
// If this removal causes more groups of three or more of the same color to form, then continue removing each group until there are none left.
// If there are no more balls on the board, then you win the game.
// Repeat this process until you either win or do not have any more balls in your hand.
// Given a string board, representing the row of balls on the board, and a string hand, representing the balls in your hand, return the minimum number of balls you have to insert to clear all the balls from the board. If you cannot clear all the balls from the board using the balls in your hand, return -1.

 

// Example 1:

// Input: board = "WRRBBW", hand = "RB"
// Output: -1
// Explanation: It is impossible to clear all the balls. The best you can do is:
// - Insert 'R' so the board becomes WRRRBBW. WRRRBBW -> WBBW.
// - Insert 'B' so the board becomes WBBBW. WBBBW -> WW.
// There are still balls remaining on the board, and you are out of balls to insert.
// Example 2:

// Input: board = "WWRRBBWW", hand = "WRBRW"
// Output: 2
// Explanation: To make the board empty:
// - Insert 'R' so the board becomes WWRRRBBWW. WWRRRBBWW -> WWBBWW.
// - Insert 'B' so the board becomes WWBBBWW. WWBBBWW -> WWWW -> empty.
// 2 balls from your hand were needed to clear the board.
// Example 3:

// Input: board = "G", hand = "GGGGG"
// Output: 2
// Explanation: To make the board empty:
// - Insert 'G' so the board becomes GG.
// - Insert 'G' so the board becomes GGG. GGG -> empty.
// 2 balls from your hand were needed to clear the board.
 

// Constraints:

// 1 <= board.length <= 16
// 1 <= hand.length <= 5
// board and hand consist of the characters 'R', 'Y', 'B', 'G', and 'W'.
// The initial row of balls on the board will not have any groups of three or more consecutive balls of the same color.

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */

// dijkstra's approach
// runtime exceeded, passed 37/56
var findMinStep = function(board, hand) { 
    var map = {};
    var recursion = function (board, hand) {
        if (board.length === 0) return 0;
        var key = board + '-' + hand;
        if (map[key]) return map[key];

        var res = hand.length + 1;
        var set = new Set();
        for (var i = 0; i < hand.length; i++) {
            if (set.has(hand[i])) continue;
            for (var j = 0; j < board.length; j++) {
                if (j < board.length - 1 && board[j] === board[j + 1] && hand[i] === board[j]) continue;
                var newBoard = board.slice(0, j + 1) + hand[i] + board.slice(j + 1);
                var newHand = hand.slice(0, i) + hand.slice(i + 1);
                res = Math.min(res, recursion(reduceBoard(newBoard), newHand) + 1);
            }
            set.add(hand[i]);
        }
        map[key] = res;
        return res;
    }
    
    var result = recursion(board, hand);
    return result > hand.length ? -1 : result;
};

var reduceBoard = function(board) {
    var str = '';
    for (var i = 0; i < board.length; i++) {
        if (i < board.length - 2 && board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
            var start = i;
            i += 2;
            while (board[i] === board[i + 1]) i++;
            return reduceBoard(board.slice(0, start) + board.slice(i + 1));
        }
        else {
            str += board[i];
        }
    }
    return str;
}