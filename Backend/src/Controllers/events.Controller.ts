import { Request, Response } from "express";
import { v4 } from 'uuid';
import { Events } from "../interface/events.Interface";
import { sqlConfig } from "../Config/sql.config";
import mssql from 'mssql';

export const createEvent = (async (req: Request, res: Response) => {
    try {
        // Generate a unique eventId
        const eventId = v4();
        // Get the eventDetails from the request body
        const eventDetails: Events = req.body;
        console.log(req.body);
        
        // Create a pool connection
        const pool = await mssql.connect(sqlConfig);
        // Check if the venue is booked
        const isBooked = (await pool.request()
            .input('venueId', mssql.VarChar, eventDetails.eventVenue)
            .execute('isAvailable')
        ).recordset

        if (isBooked.length >= 1) {
            return res.status(202).json({
                error: "The venue is already booked"
            })
        } else {
            // Save the data to the DB
            const result = (await pool.request()
                .input("eventId", mssql.VarChar, eventId)
                .input('eventTitle', mssql.VarChar, eventDetails.eventTitle.trim().toLocaleLowerCase())
                .input("eventDescr", mssql.VarChar, eventDetails.eventDescr.trim().toLocaleLowerCase())
                .input("eventVenue", mssql.VarChar, eventDetails.eventVenue.trim().toLocaleLowerCase())
                .input('eventImage', mssql.VarChar, eventDetails.eventImage.trim().toLocaleLowerCase())
                .input("homeTeam", mssql.VarChar, eventDetails.homeTeam)
                .input("awayTeam", mssql.VarChar, eventDetails.awayTeam)
                .execute('newEvent')
            ).rowsAffected

            if (result[0] >= 1) {
                return res.status(200).json({
                    success: "Event created successfully"
                })
            } else {
                return res.status(201).json({
                    error: "Could not create event"
                })
            }
        }

    } catch (error) {
        return res.status(500).json(({
            error
        }))
    }
});