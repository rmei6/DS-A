-- Table:  logs

-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | log_id      | int     |
-- | ip          | varchar |
-- | status_code | int     |
-- +-------------+---------+
-- log_id is the unique key for this table.
-- Each row contains server access log information including IP address and HTTP status code.
-- Write a solution to find invalid IP addresses. An IPv4 address is invalid if it meets any of these conditions:

-- Contains numbers greater than 255 in any octet
-- Has leading zeros in any octet (like 01.02.03.04)
-- Has less or more than 4 octets
-- Return the result table ordered by invalid_count, ip in descending order respectively. 

-- The result format is in the following example.

 

-- Example:

-- Input:

-- logs table:

-- +--------+---------------+-------------+
-- | log_id | ip            | status_code | 
-- +--------+---------------+-------------+
-- | 1      | 192.168.1.1   | 200         | 
-- | 2      | 256.1.2.3     | 404         | 
-- | 3      | 192.168.001.1 | 200         | 
-- | 4      | 192.168.1.1   | 200         | 
-- | 5      | 192.168.1     | 500         | 
-- | 6      | 256.1.2.3     | 404         | 
-- | 7      | 192.168.001.1 | 200         | 
-- +--------+---------------+-------------+
-- Output:

-- +---------------+--------------+
-- | ip            | invalid_count|
-- +---------------+--------------+
-- | 256.1.2.3     | 2            |
-- | 192.168.001.1 | 2            |
-- | 192.168.1     | 1            |
-- +---------------+--------------+
-- Explanation:

-- 256.1.2.3 is invalid because 256 > 255
-- 192.168.001.1 is invalid because of leading zeros
-- 192.168.1 is invalid because it has only 3 octets
-- The output table is ordered by invalid_count, ip in descending order respectively.

# Write your MySQL query statement below
 
with octet_split as (
    select 
    log_id, ip,
    length(ip) - LENGTH(REPLACE(ip, '.', '')) AS dot_count,
    SUBSTRING_INDEX(ip, '.', 1) AS octet1,
    SUBSTRING_INDEX(SUBSTRING_INDEX(ip, '.', 2), '.', -1) AS octet2,
    SUBSTRING_INDEX(SUBSTRING_INDEX(ip, '.', 3), '.', -1) AS octet3,
    SUBSTRING_INDEX(SUBSTRING_INDEX(ip, '.', 4), '.', -1) AS octet4
    from logs
    )
select ip, count(*) as invalid_count
from octet_split
where (
    case when dot_count <> 3
            or (convert(octet1, SIGNED) > 255 or convert(octet2, SIGNED) > 255 or convert(octet3, SIGNED) > 255 or convert(octet4, SIGNED) > 255 )
            or (octet1 like '0%' or octet2 like '0%' or octet3 like '0%' or octet4 like '0%')
        then 'Y' end) = 'Y'
group by ip
order by 2 desc, 1 desc;