-- Write an SQL query to report the nth highest salary from the Employee table. If there is no nth highest salary, the query should report null.


CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
SET N = N-1;
  RETURN (
      # Write your MySQL query statement below.
      SELECT DISTINCT(salary) from Employee order by salary DESC
      LIMIT 1 OFFSET N
  );
END