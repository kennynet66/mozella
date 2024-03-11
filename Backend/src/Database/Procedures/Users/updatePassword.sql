CREATE OR ALTER PROCEDURE updatePassword(
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    UPDATE Users
    SET password = @password
    WHERE email = @email
END