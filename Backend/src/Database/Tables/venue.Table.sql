/* 
    Venues Table should contain:-
    - 1. Venue Id.
    - 2. Name of the venue
    - 3. Availability of the venue
 */

 CREATE TABLE Venues(
    venueId VARCHAR(255) NOT NULL PRIMARY KEY,
    venueName VARCHAR(255),
    venueImage VARCHAR(255),
    isBooked BIT DEFAULT 0 NOT NULL
)