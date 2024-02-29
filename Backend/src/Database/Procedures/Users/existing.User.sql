/* 
    This stored procedure is supposed to check for a user with the provided email
 */

 CREATE OR ALTER PROCEDURE checkExistingUser(
    @email VARCHAR(255)
 )
 AS