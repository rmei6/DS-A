// You are given two integers red and blue representing the count of red and blue colored balls. You have to arrange these balls to form a triangle such that the 1st row will have 1 ball, the 2nd row will have 2 balls, the 3rd row will have 3 balls, and so on.

// All the balls in a particular row should be the same color, and adjacent rows should have different colors.

// Return the maximum height of the triangle that can be achieved.

 

// Example 1:

// Input: red = 2, blue = 4

// Output: 3

// Explanation:



// The only possible arrangement is shown above.

// Example 2:

// Input: red = 2, blue = 1

// Output: 2

// Explanation:


// The only possible arrangement is shown above.

// Example 3:

// Input: red = 1, blue = 1

// Output: 1

// Example 4:

// Input: red = 10, blue = 1

// Output: 2

// Explanation:


// The only possible arrangement is shown above.

 

// Constraints:

// 1 <= red, blue <= 100

// used formula for arithmetic series and then used quadratic formula
// time and space: O(1)

/**
 * @param {number} red
 * @param {number} blue
 * @return {number}
 */
var maxHeightOfTriangle = function (red, blue) {
  let roots = (first, second) => {
    const root1 = Math.trunc(Math.sqrt(first));
    const root2 = Math.trunc((Math.sqrt(4 * second + 1) - 1) / 2);
    if (root1 > root2) {
      if (root1 === root2 + 1) return root1 + root2;
      return root2 * 2 + 1;
    }
    return root1 * 2;
  };
  return Math.max(roots(red, blue), roots(blue, red));
};