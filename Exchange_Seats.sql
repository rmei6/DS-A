-- Write an SQL query to swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.

-- Return the result table ordered by id in ascending order.

-- The query result format is in the following example.

# Write your MySQL query statement below
select
if(id % 2 != 0 and id = (select count(*) from Seat), id, 
if(id % 2 != 0, id + 1, id - 1)) as id, 
student from Seat order by id;