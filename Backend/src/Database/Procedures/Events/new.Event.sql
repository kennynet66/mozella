CREATE OR ALTER PROCEDURE newEvent(
    @eventId VARCHAR(255),
    @eventTitle VARCHAR(255),
    @eventDescr VARCHAR(255),
    @eventVenue VARCHAR(255),
    @eventImage VARCHAR(255),
    @homeTeam VARCHAR(255),
    @awayTeam VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Events(eventId, eventTitle,eventDescr,eventVenue,eventDate,eventImage,homeTeam,awayTeam)
    VALUES(@eventId, @eventTitle, @eventDescr, @eventVenue, GETDATE(), @eventImage, @homeTeam, @awayTeam);
    UPDATE Venues SET isBooked = 1 WHERE venueId = @eventVenue
END
