/* 
    Events table should contain:-
    - 1. Event id.
    - 2. Event title.
    - 3. Event description.
    - 4. Venue of the event.
    - 5. Date the event the event is taking place.
    - 6. Sample image
    - 7. The home team
    - 8. The Away team
 */

 CREATE TABLE Events(
    eventId VARCHAR(255),
    eventTitle VARCHAR(255),
    eventDescr text,
    eventVenue VARCHAR(255),
    eventDate DATETIME,
    eventImage VARCHAR(255),
    homeTeam VARCHAR(255),
    awayTeam VARCHAR(255)
)

SELECT * FROM Events