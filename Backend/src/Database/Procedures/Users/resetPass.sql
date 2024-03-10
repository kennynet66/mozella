CREATE OR ALTER PROCEDURE resetPass(
    @email VARCHAR(255)
)
AS
BEGIN
    UPDATE Users SET isReset = 1 WHERE email = @email AND isReset = 0;
END;