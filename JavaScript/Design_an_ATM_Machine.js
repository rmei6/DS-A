// There is an ATM machine that stores banknotes of 5 denominations: 20, 50, 100, 200, and 500 dollars. Initially the ATM is empty. The user can use the machine to deposit or withdraw any amount of money.

// When withdrawing, the machine prioritizes using banknotes of larger values.

// For example, if you want to withdraw $300 and there are 2 $50 banknotes, 1 $100 banknote, and 1 $200 banknote, then the machine will use the $100 and $200 banknotes.
// However, if you try to withdraw $600 and there are 3 $200 banknotes and 1 $500 banknote, then the withdraw request will be rejected because the machine will first try to use the $500 banknote and then be unable to use banknotes to complete the remaining $100. Note that the machine is not allowed to use the $200 banknotes instead of the $500 banknote.
// Implement the ATM class:

// ATM() Initializes the ATM object.
// void deposit(int[] banknotesCount) Deposits new banknotes in the order $20, $50, $100, $200, and $500.
// int[] withdraw(int amount) Returns an array of length 5 of the number of banknotes that will be handed to the user in the order $20, $50, $100, $200, and $500, and update the number of banknotes in the ATM after withdrawing. Returns [-1] if it is not possible (do not withdraw any banknotes in this case).
 

// Example 1:

// Input
// ["ATM", "deposit", "withdraw", "deposit", "withdraw", "withdraw"]
// [[], [[0,0,1,2,1]], [600], [[0,1,0,1,1]], [600], [550]]
// Output
// [null, null, [0,0,1,0,1], null, [-1], [0,1,0,0,1]]

// Explanation
// ATM atm = new ATM();
// atm.deposit([0,0,1,2,1]); // Deposits 1 $100 banknote, 2 $200 banknotes,
//                           // and 1 $500 banknote.
// atm.withdraw(600);        // Returns [0,0,1,0,1]. The machine uses 1 $100 banknote
//                           // and 1 $500 banknote. The banknotes left over in the
//                           // machine are [0,0,0,2,0].
// atm.deposit([0,1,0,1,1]); // Deposits 1 $50, $200, and $500 banknote.
//                           // The banknotes in the machine are now [0,1,0,3,1].
// atm.withdraw(600);        // Returns [-1]. The machine will try to use a $500 banknote
//                           // and then be unable to complete the remaining $100,
//                           // so the withdraw request will be rejected.
//                           // Since the request is rejected, the number of banknotes
//                           // in the machine is not modified.
// atm.withdraw(550);        // Returns [0,1,0,0,1]. The machine uses 1 $50 banknote
//                           // and 1 $500 banknote.
 

// Constraints:

// banknotesCount.length == 5
// 0 <= banknotesCount[i] <= 109
// 1 <= amount <= 109
// At most 5000 calls in total will be made to withdraw and deposit.
// At least one call will be made to each function withdraw and deposit.
// Sum of banknotesCount[i] in all deposits doesn't exceed 109


var ATM = function() {
  this.denomination = [20, 50, 100, 200, 500];
  this.denominationCount = [0, 0, 0, 0, 0];
};

/** 
* @param {number[]} banknotesCount
* @return {void}
*/
ATM.prototype.deposit = function(banknotesCount) {
  for (let index = 0; index < banknotesCount.length; index++) {
      const element = banknotesCount[index];
      this.denominationCount[index] += element;
  }
  return;
};

/** 
* @param {number} amount
* @return {number[]}
*/
ATM.prototype.withdraw = function(amount) {
  if (amount % 10) {
      return [-1];
  }
  const output = [0, 0, 0, 0, 0];
  for (let index = this.denomination.length - 1; index >= 0; index--) {
      const totalNotesRequired = parseInt(amount / this.denomination[index]);
      if (this.denominationCount[index]) {
          const denominationToCut = Math.min(totalNotesRequired, this.denominationCount[index]);
          output[index] += denominationToCut;
          amount -= denominationToCut * this.denomination[index];
          this.denominationCount[index] -= denominationToCut;
      }
      if (!amount) {
          break;
      }
  }
  if (amount) {
      for (let index = 0; index < output.length; index++) {
          const element = output[index];
          this.denominationCount[index] += element;
      }
      return [-1];
  }
  return output;
};

/** 
* Your ATM object will be instantiated and called as such:
* var obj = new ATM()
* obj.deposit(banknotesCount)
* var param_2 = obj.withdraw(amount)
*/