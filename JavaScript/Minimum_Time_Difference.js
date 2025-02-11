// Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.
 

// Example 1:

// Input: timePoints = ["23:59","00:00"]
// Output: 1
// Example 2:

// Input: timePoints = ["00:00","23:59","00:00"]
// Output: 0
 

// Constraints:

// 2 <= timePoints.length <= 2 * 10^4
// timePoints[i] is in the format "HH:MM".

/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {

  timePoints.sort();
  timePoints = timePoints.map(ele => {
      let [hours, minutes] = ele.split(':');

      return Number(hours) * 60 + Number(minutes);
  })

  timePoints.push(timePoints[0] + 1440);
  let minDiff = Infinity;
  
  for (let i = 1; i < timePoints.length; i++) {
      minDiff = Math.min(minDiff, timePoints[i] - timePoints[i - 1]);
  }

  return minDiff;
};