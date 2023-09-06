-- Write an SQL query to find the employees who earn more than their managers.

-- Return the result table in any order.

-- # Write your MySQL query statement below 
SELECT e2.name as Employee
FROM employee e1
INNER JOIN employee e2 ON e1.id = e2.managerID
WHERE
e1.salary < e2.salary