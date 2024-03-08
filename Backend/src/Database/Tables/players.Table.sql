CREATE TABLE Players(
    playerId VARCHAR(255) NOT NULL PRIMARY KEY,
    teamId VARCHAR(255),
    playerName VARCHAR(255),
    playerAge INT,
    rating INT,
    worth INT
    CONSTRAINT fk_Teams_Id FOREIGN KEY(teamId)
    REFERENCES Teams(teamId)
)