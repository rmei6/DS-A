// Given an array rectangles where rectangles[i] = [xi, yi, ai, bi] represents an axis-aligned rectangle. The bottom-left point of the rectangle is (xi, yi) and the top-right point of it is (ai, bi).

// Return true if all the rectangles together form an exact cover of a rectangular region.

 

// Example 1:


// Input: rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
// Output: true
// Explanation: All 5 rectangles together form an exact cover of a rectangular region.
// Example 2:


// Input: rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
// Output: false
// Explanation: Because there is a gap between the two rectangular regions.
// Example 3:


// Input: rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
// Output: false
// Explanation: Because two of the rectangles overlap with each other.
 

// Constraints:

// 1 <= rectangles.length <= 2 * 104
// rectangles[i].length == 4
// -105 <= xi < ai <= 105
// -105 <= yi < bi <= 105

/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var isRectangleCover = function(rectangles) {
  let cornerSet = new Set();
  let totalArea = 0, minX = Infinity, maxX = 0, maxY = 0, minY = Infinity;

  let cornerKey = (x, y) => `${x},${y}`;

  for (let [x1, y1, x2, y2] of rectangles) {
      minX = Math.min(minX, x1);
      maxX = Math.max(maxX, x2);
      maxY = Math.max(maxY, y2);
      minY = Math.min(minY, y1);
      totalArea += (x2 - x1) * (y2 - y1);

      [cornerKey(x1, y1), cornerKey(x1, y2), cornerKey(x2, y1), cornerKey(x2, y2)].forEach(corner =>
      cornerSet.has(corner) ? cornerSet.delete(corner) : cornerSet.add(corner)
      );
  }

  return totalArea === (maxX - minX) * (maxY - minY) &&
      cornerSet.size === 4 &&
      cornerSet.has(cornerKey(minX, minY)) &&
      cornerSet.has(cornerKey(minX, maxY)) &&
      cornerSet.has(cornerKey(maxX, minY)) &&
      cornerSet.has(cornerKey(maxX, maxY));
};