# You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

# Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

# Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

# Example 1:

# Input: prices = [1,3,2,8,4,9], fee = 2
# Output: 8
# Explanation: The maximum profit can be achieved by:
# - Buying at prices[0] = 1
# - Selling at prices[3] = 8
# - Buying at prices[4] = 4
# - Selling at prices[5] = 9
# The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
# Example 2:

# Input: prices = [1,3,7,5,10,3], fee = 3
# Output: 6

class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        # You initially have zero money in your hand
        cin_w_shares = -prices[0] # Cash in hand with shares if you bought it on first day
        cin_wo_shares = 0 # Cash in hand without shares if you do not buy any share on first day
        
        for i in range(1,len(prices)):
            # Maximum cash in hand with shares
            # Either 
			# 1. withold prev share in which case your cash in hand will not change, 
            # 2. or assume there was no currently bought share but you want to buy it today - 
			#         In this case: your current cash in hand with shares will be your previous cash 
			#         in hand without shares minus buying price of the share today.
            cin_w_shares = max(cin_w_shares, cin_wo_shares-prices[i]) 
            
            # Maximum cash in hand without shares
            # Either 
			# 1. withold money without shares in which case your cash in hand will not change, 
            # 2. or assume you previously bought the share and you are going to sell that today -
			#         In this case : your current cash in hand without shares will be your previous cash 
			#         in hand with shares plus the current selling price minus transaction fee
            cin_wo_shares = max(cin_wo_shares, cin_w_shares + prices[i]-fee)
            
        # Return cash in hand without shares, as cash in hand with share will always be lower
        return cin_wo_shares 