#
# Complete the 'getRegions' function below.
#
# The function is expected to return an INTEGER_ARRAY.
# The function accepts STRING_ARRAY ip_addresses as parameter.
#

def getRegions(ip_addresses):
    # Write your code here
    regions = []
    for ip_address in ip_addresses:
        octets = ip_address.split('.')
        if(all(int(octet) <= 255 and int(octet) >= 0 for octet in octets)):
            if(int(octets[0]) <= 127):
                regions.append(1)
            elif(int(octets[0]) <= 191):
                regions.append(2)
            elif(int(octets[0]) <= 223):
                regions.append(3)
            elif(int(octets[0]) <= 239):
                regions.append(4)
            else:
                regions.append(5)
        else:
            regions.append(-1)
    return regions