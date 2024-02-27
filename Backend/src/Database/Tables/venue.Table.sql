/* 
    Venues Table should contain:-
    - 1. Venue Id.
    - 2. Name of the venue
    - 3. Availability of the venue
 */

 CREATE TABLE Venue(
    venueId VARCHAR(255),
    venueName VARCHAR(255),
    isAvailabe BIT DEFAULT 0 NOT NULL
)