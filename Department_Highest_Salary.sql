-- Write an SQL query to find employees who have the highest salary in each of the departments.

-- Return the result table in any order.

-- The query result format is in the following example.

# Write your MySQL query statement below
SELECT Department.name AS Department ,Employee.name AS Employee, Employee.salary
FROM Department  JOIN Employee  ON Employee.departmentId=Department.id 
WHERE(departmentId, salary) IN
(SELECT departmentId,MAX(salary) FROM Employee GROUP BY departmentId) ;