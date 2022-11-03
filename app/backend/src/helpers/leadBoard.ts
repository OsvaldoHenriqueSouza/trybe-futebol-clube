const leadBoard = `
SELECT 
away.name,
home.totalPoints + away.totalPoints AS totalPoints,
home.totalGames + away.totalGames AS totalGames,
home.totalVictories + away.totalVictories AS totalVictories,
home.totalDraws + away.totalDraws AS totalDraws,
home.totalLosses + away.totalLosses AS totalLosses,
home.goalsFavor + away.goalsFavor AS goalsFavor,
home.goalsOwn + away.goalsOwn AS goalsOwn,
home.goalsBalance + away.goalsBalance AS goalsBalance,
FORMAT(((home.totalPoints + away.totalPoints) / ((home.totalGames + away.totalGames)*3)) * 100, 2)
 AS efficiency
FROM (SELECT team_name AS name,
SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalPoints,
COUNT(teams.id) AS totalGames,
SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 1
    ELSE 0
END) AS totalVictories,
SUM(CASE 
WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalDraws,
SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 1
    ELSE 0
END) AS totalLosses,
SUM(away_team_goals) AS goalsFavor,
SUM(home_team_goals) AS goalsOwn,
SUM(away_team_goals) - SUM(home_team_goals) AS goalsBalance,
FORMAT((SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) / (COUNT(teams.id)*3)) * 100, 2) AS efficiency
FROM matches
INNER JOIN teams
ON matches.away_team = teams.id
WHERE in_progress = '0'
GROUP BY team_name) AS away
JOIN
(SELECT team_name AS name,
SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalPoints,
COUNT(teams.id) AS totalGames,
SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 1
    ELSE 0
END) AS totalVictories,
SUM(CASE 
WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalDraws,
SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 1
    ELSE 0
END) AS totalLosses,
SUM(home_team_goals) AS goalsFavor,
SUM(away_team_goals) AS goalsOwn,
SUM(home_team_goals) - SUM(away_team_goals) AS goalsBalance,
FORMAT((SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) / (COUNT(teams.id)*3)) * 100, 2) AS efficiency
FROM matches
INNER JOIN teams
ON matches.home_team = teams.id
WHERE in_progress = '0'
GROUP BY team_name) AS home
ON away.name = home.name
ORDER BY totalPoints DESC,
goalsBalance DESC,
totalVictories DESC,
goalsFavor DESC,
goalsOwn DESC;
`;

export default leadBoard;
