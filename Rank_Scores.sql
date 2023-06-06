-- # Write an SQL query to rank the scores. The ranking should be calculated according to the following rules:

-- # The scores should be ranked from the highest to the lowest.
-- # If there is a tie between two scores, both should have the same ranking.
-- # After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.
-- # Return the result table ordered by score in descending order.

-- # Write your MySQL query statement below
select s1.score, (select count(distinct score) from scores s2 where s2.score >= s1.score) as "rank" from scores s1
order by s1.score DESC;