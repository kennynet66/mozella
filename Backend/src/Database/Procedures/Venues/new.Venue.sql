CREATE OR ALTER PROCEDURE createVenue(
    @venueId VARCHAR(255),
    @venueImage VARCHAR(255),
    @venueName VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Venues(venueId, venueName, venueImage)
    VALUES(@venueId,  @venueName,@venueImage);
END;