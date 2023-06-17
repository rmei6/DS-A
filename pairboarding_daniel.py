# n circle game, go around k times until one person left
# max profit from prices array

class Solution:
    def findTheWinner(self, n: int, k: int) -> int:
        if n==1: return 1
        return (k + self.findTheWinner(n-1, k) -1) % n + 1
    
    def findTheWinner1(self, n: int, k: int) -> int:
    p = 1
    for i in range(1,n):
        # here i represent number of alive people
		# p is f(i,'cac')
        p=(k+p-1)%(i+1)+1
		# p is f(i+1, 'cac')
    return p


def maxProfit(self, prices: List[int]) -> int:
	if not prices:
		return 0

	maxProfit = 0
	minPurchase = prices[0]
	for i in range(1, len(prices)):		
		maxProfit = max(maxProfit, prices[i] - minPurchase)
		minPurchase = min(minPurchase, prices[i])
	return maxProfit