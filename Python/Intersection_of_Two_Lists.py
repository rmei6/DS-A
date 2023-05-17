def intersect(nums1, nums2):
    # Write your code here
    nums1_hash = {}
    nums2_hash = {}
    for number in nums1:
        if(number in nums1_hash):
            nums1_hash[number] += 1
        else:
            nums1_hash[number] = 1
    for number in nums2:
        if(number in nums2_hash):
            nums2_hash[number] += 1
        else:
            nums2_hash[number] = 1
    result = []
    for number in nums1_hash:
        if(number in nums2_hash):
            count = min(nums1_hash[number],nums2_hash[number])
            for i in range(count):
                result.append(number)
    return result