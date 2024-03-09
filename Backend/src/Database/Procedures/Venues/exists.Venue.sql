CREATE OR ALTER PROCEDURE checkVenueExists(
    @venueName VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Venues WHERE venueName = @venueName;
END;