CREATE OR ALTER PROCEDURE createUser(
    @userId VARCHAR(255),
    @userName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users(userId, userName, email, password)
    VALUES(@userId, @userName, @email, @password)
END