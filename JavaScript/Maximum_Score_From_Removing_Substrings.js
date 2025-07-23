// You are given a string s and two integers x and y. You can perform two types of operations any number of times.

// Remove substring "ab" and gain x points.
// For example, when removing "ab" from "cabxbae" it becomes "cxbae".
// Remove substring "ba" and gain y points.
// For example, when removing "ba" from "cabxbae" it becomes "cabxe".
// Return the maximum points you can gain after applying the above operations on s.

 

// Example 1:

// Input: s = "cdbcbbaaabab", x = 4, y = 5
// Output: 19
// Explanation:
// - Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.
// - Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.
// - Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.
// - Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.
// Total score = 5 + 4 + 5 + 5 = 19.
// Example 2:

// Input: s = "aabbaaxybbaabb", x = 5, y = 4
// Output: 20
 

// Constraints:

// 1 <= s.length <= 10^5
// 1 <= x, y <= 10^4
// s consists of lowercase English letters.

/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var maximumGain = function(s, x, y) {
    
    const solve = (text, pattern, score) => {
        const stack = [];
        let points = 0;
        for (const char of text) {
            if (stack.length > 0 && stack[stack.length - 1] === pattern[0] && char === pattern[1]) {
                stack.pop();
                points += score;
            } else {
                stack.push(char);
            }
        }
        return { points, remainingText: stack.join('') };
    };

    let totalPoints = 0;
    let highPriorityPair, lowPriorityPair, highPriorityScore, lowPriorityScore;

    if (x > y) {
        highPriorityPair = "ab";
        highPriorityScore = x;
        lowPriorityPair = "ba";
        lowPriorityScore = y;
    } else {
        highPriorityPair = "ba";
        highPriorityScore = y;
        lowPriorityPair = "ab";
        lowPriorityScore = x;
    }

    const { points: points1, remainingText: afterFirstPass } = solve(s, highPriorityPair, highPriorityScore);
    totalPoints += points1;

    const { points: points2 } = solve(afterFirstPass, lowPriorityPair, lowPriorityScore);
    totalPoints += points2;

    return totalPoints;
};