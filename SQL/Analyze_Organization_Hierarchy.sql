-- Table: Employees

-- +----------------+---------+
-- | Column Name    | Type    | 
-- +----------------+---------+
-- | employee_id    | int     |
-- | employee_name  | varchar |
-- | manager_id     | int     |
-- | salary         | int     |
-- | department     | varchar |
-- +----------------+----------+
-- employee_id is the unique key for this table.
-- Each row contains information about an employee, including their ID, name, their manager's ID, salary, and department.
-- manager_id is null for the top-level manager (CEO).
-- Write a solution to analyze the organizational hierarchy and answer the following:

-- Hierarchy Levels: For each employee, determine their level in the organization (CEO is level 1, employees reporting directly to the CEO are level 2, and so on).
-- Team Size: For each employee who is a manager, count the total number of employees under them (direct and indirect reports).
-- Salary Budget: For each manager, calculate the total salary budget they control (sum of salaries of all employees under them, including indirect reports, plus their own salary).
-- Return the result table ordered by the result ordered by level in ascending order, then by budget in descending order, and finally by employee_name in ascending order.

-- The result format is in the following example.

 

-- Example:

-- Input:

-- Employees table:

-- +-------------+---------------+------------+--------+-------------+
-- | employee_id | employee_name | manager_id | salary | department  |
-- +-------------+---------------+------------+--------+-------------+
-- | 1           | Alice         | null       | 12000  | Executive   |
-- | 2           | Bob           | 1          | 10000  | Sales       |
-- | 3           | Charlie       | 1          | 10000  | Engineering |
-- | 4           | David         | 2          | 7500   | Sales       |
-- | 5           | Eva           | 2          | 7500   | Sales       |
-- | 6           | Frank         | 3          | 9000   | Engineering |
-- | 7           | Grace         | 3          | 8500   | Engineering |
-- | 8           | Hank          | 4          | 6000   | Sales       |
-- | 9           | Ivy           | 6          | 7000   | Engineering |
-- | 10          | Judy          | 6          | 7000   | Engineering |
-- +-------------+---------------+------------+--------+-------------+
-- Output:

-- +-------------+---------------+-------+-----------+--------+
-- | employee_id | employee_name | level | team_size | budget |
-- +-------------+---------------+-------+-----------+--------+
-- | 1           | Alice         | 1     | 9         | 84500  |
-- | 3           | Charlie       | 2     | 4         | 41500  |
-- | 2           | Bob           | 2     | 3         | 31000  |
-- | 6           | Frank         | 3     | 2         | 23000  |
-- | 4           | David         | 3     | 1         | 13500  |
-- | 7           | Grace         | 3     | 0         | 8500   |
-- | 5           | Eva           | 3     | 0         | 7500   |
-- | 9           | Ivy           | 4     | 0         | 7000   |
-- | 10          | Judy          | 4     | 0         | 7000   |
-- | 8           | Hank          | 4     | 0         | 6000   |
-- +-------------+---------------+-------+-----------+--------+
-- Explanation:

-- Organization Structure:
-- Alice (ID: 1) is the CEO (level 1) with no manager
-- Bob (ID: 2) and Charlie (ID: 3) report directly to Alice (level 2)
-- David (ID: 4), Eva (ID: 5) report to Bob, while Frank (ID: 6) and Grace (ID: 7) report to Charlie (level 3)
-- Hank (ID: 8) reports to David, and Ivy (ID: 9) and Judy (ID: 10) report to Frank (level 4)
-- Level Calculation:
-- The CEO (Alice) is at level 1
-- Each subsequent level of management adds 1 to the level
-- Team Size Calculation:
-- Alice has 9 employees under her (the entire company except herself)
-- Bob has 3 employees (David, Eva, and Hank)
-- Charlie has 4 employees (Frank, Grace, Ivy, and Judy)
-- David has 1 employee (Hank)
-- Frank has 2 employees (Ivy and Judy)
-- Eva, Grace, Hank, Ivy, and Judy have no direct reports (team_size = 0)
-- Budget Calculation:
-- Alice's budget: Her salary (12000) + all employees' salaries (72500) = 84500
-- Charlie's budget: His salary (10000) + Frank's budget (23000) + Grace's salary (8500) = 41500
-- Bob's budget: His salary (10000) + David's budget (13500) + Eva's salary (7500) = 31000
-- Frank's budget: His salary (9000) + Ivy's salary (7000) + Judy's salary (7000) = 23000
-- David's budget: His salary (7500) + Hank's salary (6000) = 13500
-- Employees with no direct reports have budgets equal to their own salary
-- Note:

-- The result is ordered first by level in ascending order
-- Within the same level, employees are ordered by budget in descending order then by name in ascending order

# Write your MySQL query statement below
WITH RECURSIVE EmployeeLevels AS (
    SELECT
        employee_id,
        employee_name,
        manager_id,
        salary,
        1 AS level
    FROM Employees
    WHERE manager_id IS NULL
    UNION ALL
    SELECT
        e.employee_id,
        e.employee_name,
        e.manager_id,
        e.salary,
        el.level + 1 AS level
    FROM Employees e
    INNER JOIN EmployeeLevels el ON e.manager_id = el.employee_id
),
Subordinates AS (
    SELECT
        e.employee_id AS manager_id,
        r.employee_id AS subordinate_id,
        r.salary AS subordinate_salary
    FROM Employees e
    JOIN Employees r ON r.manager_id = e.employee_id
    UNION ALL
    SELECT
        s.manager_id,
        e.employee_id AS subordinate_id,
        e.salary AS subordinate_salary
    FROM Subordinates s
    JOIN Employees e ON e.manager_id = s.subordinate_id
),
TeamSize AS (
    SELECT
        manager_id,
        COUNT(DISTINCT subordinate_id) AS team_size
    FROM Subordinates
    GROUP BY manager_id
),
Budget AS (
    SELECT
        manager_id,
        SUM(subordinate_salary) AS total_subordinate_salary
    FROM Subordinates
    GROUP BY manager_id
)
SELECT
    el.employee_id,
    el.employee_name,
    el.level,
    COALESCE(ts.team_size, 0) AS team_size,
    COALESCE(b.total_subordinate_salary, 0) + el.salary AS budget
FROM EmployeeLevels el
LEFT JOIN TeamSize ts ON el.employee_id = ts.manager_id
LEFT JOIN Budget b ON el.employee_id = b.manager_id
ORDER BY level ASC, budget DESC, employee_name ASC;