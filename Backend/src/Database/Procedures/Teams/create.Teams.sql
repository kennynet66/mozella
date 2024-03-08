CREATE OR ALTER PROCEDURE createTeam(
    @teamId VARCHAR(255),
    @teamName VARCHAR(255),
    @teamProfilePic VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Teams(teamId, teamName, teamProfilePic)
    VALUES(@teamId, @teamName, @teamProfilePic);
END