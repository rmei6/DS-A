def maxArea(height):
    # Write your code here
    vol = 0
    i = 0
    j = len(height) - 1
    while(i < j):
        new_vol = min(height[i],height[j]) * (j-i)
        if (new_vol > vol):
            vol = new_vol
        if(height[i] <= height[j]):
            i += 1
        else:
            j -= 1
    return vol