-- Write an SQL query to find all numbers that appear at least three times consecutively.

-- Return the result table in any order.

-- # Write your MySQL query statement below 
SELECT distinct Num as ConsecutiveNums
FROM Logs
WHERE (Id + 1, Num) in (select * from Logs) and (Id + 2, Num) in (select * from Logs)