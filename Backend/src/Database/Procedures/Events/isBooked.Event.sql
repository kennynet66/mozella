CREATE OR ALTER PROCEDURE isAvailable(
    @venueId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Venues WHERE venueId = @venueId AND isBooked = 1;
END;