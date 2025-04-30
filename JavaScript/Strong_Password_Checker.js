// A password is considered strong if the below conditions are all met:

// It has at least 6 characters and at most 20 characters.
// It contains at least one lowercase letter, at least one uppercase letter, and at least one digit.
// It does not contain three repeating characters in a row (i.e., "Baaabb0" is weak, but "Baaba0" is strong).
// Given a string password, return the minimum number of steps required to make password strong. if password is already strong, return 0.

// In one step, you can:

// Insert one character to password,
// Delete one character from password, or
// Replace one character of password with another character.
 

// Example 1:

// Input: password = "a"
// Output: 5
// Example 2:

// Input: password = "aA1"
// Output: 3
// Example 3:

// Input: password = "1337C0d3"
// Output: 0
 

// Constraints:

// 1 <= password.length <= 50
// password consists of letters, digits, dot '.' or exclamation mark '!'.

/**
 * @param {string} password
 * @return {number}
 */
var removeAnyExceded = function(password){
  let subPassword;
  for (let i = 0; i < password.length; i++) {
      subPassword = password.substr(0, i) + password.substr(i + 1);
      if (
          (/[A-Z]/g.test(subPassword) && /[A-Z]/g.test(password[i])) ||
          (/[a-z]/g.test(subPassword) && /[a-z]/g.test(password[i])) ||
          (/[0-9]/g.test(subPassword) && /[0-9]/g.test(password[i]))
      ) {
          return subPassword;
      }
  }
  return subPassword;
};

var optimalRemove = function(password, extraLength){
  if (extraLength === 0) {
      return password;
  }
  let localMax = Array(password.length).fill(1);
  for (let i = 1; i <= password.length; i++) {
      if (password[i] === password[i - 1]) {
          localMax[i] += localMax[i - 1];
      }
  }
  let indexes = localMax.map((v, i, a) => v >= 3 && !(a[i + 1] > a[i]) ? i : 0).filter(x => x);
  for (let index of indexes) {
      if (localMax[index] % 3 === 0) {
          return optimalRemove(password.substr(0, index) + password.substr(index + 1), extraLength - 1)
      }
  }

  for (let index of indexes) {
      if (localMax[index] % 3 === 1) {
          return optimalRemove(password.substr(0, index) + password.substr(index + 1), extraLength - 1)
      }
  }

  for (let index of indexes) {
      if (localMax[index] % 3 === 2) {
          return optimalRemove(password.substr(0, index) + password.substr(index + 1), extraLength - 1)
      }
  }

  return optimalRemove(removeAnyExceded(password), extraLength - 1)
}

var strongPasswordChecker = function(password){
  let MIN_LENGTH = 6;
  let MAX_LENGTH = 20;
  let length = password.length;

  if (length <= 3) {
      return MIN_LENGTH - length;
  }

  let hasUpperCaseLetter = /[A-Z]/g.test(password);
  let hasLowerCaseLetter = /[a-z]/g.test(password);
  let hasNumber = /[0-9]/g.test(password);
  let changesInRepeating = password
      .split('')
      .map((_, i, a) => +(a[i] === a[i-1]))
      .join('')
      .split('0')
      .map(s => (s.length + 1) / 3 | 0)
      .reduce((a, b) => a + b);

  let totalLessCharackers = +!hasUpperCaseLetter + !hasLowerCaseLetter + !hasNumber;

  if (length <= MAX_LENGTH) {
      return Math.max(totalLessCharackers, changesInRepeating, MIN_LENGTH - length);

  }
  let extraLength = length - MAX_LENGTH;
  return extraLength + strongPasswordChecker(optimalRemove(password, extraLength));
};