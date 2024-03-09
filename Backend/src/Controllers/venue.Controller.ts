import { Request, Response } from "express";
import { v4 } from 'uuid';
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";

export const createVenue = (async (req: Request, res: Response)=>{
    try {
        // Create a unique id
        const venueId = v4();
        // Get the data
        const { venueName, venueImage } = req.body;
        // create a pool connection
        const pool = await mssql.connect(sqlConfig);

        // Check if venue exists
        const exists = (await pool.request()
        .input('venueName', mssql.VarChar, venueName.trim().toLocaleLowerCase())
        .execute('checkVenueExists')
        ).recordset

        if(exists.length >= 1) {
            return res.status(202).json({
                error: "Venue already exists"
            })
        }

        const result = (await pool.request()
        .input('venueId', mssql.VarChar, venueId)
        .input("venueName", mssql.VarChar, venueName.trim().toLocaleLowerCase())
        .input("venueImage", mssql.VarChar, venueImage)
        .execute('createVenue')
        ).rowsAffected
        // Return a success message
            return res.status(200).json({
                success: "Venue created successfully"
            })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const allVenues = (async(req: Request, res: Response)=>{
    try {
        // Create a pool connection
        const pool = await mssql.connect(sqlConfig);

        // Query the db for data
        const venues = (await pool.request()
        .query('SELECT * FROM Venues')).recordset
        // Check if there are venues available
        if(venues.length >= 1){
            return res.status(200).json({
                venues: venues
            })
        } else if (length < 1){
            return res.status(202).json({
                error: "No venues available"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export const getOneVenue = (async (req: Request, res: Response) =>{
    try {
        // Get the venue id
        const venueId = req.params.id;
        // Create a pool connection
        const pool =  await mssql.connect(sqlConfig);
        // Get the venue deatails
        const venue = (await pool.request()
        .input('venueId', mssql.VarChar, venueId)
        .query('SELECT * FROM Venues WHERE venueId = @venueId')
        ). recordset
        if(venue.length >= 1) {
            return res.status(200).json({
                venue: venue
            })
        } else if(venue.length < 1){
            return res.status(202).json({
                error: "Could not find that venue"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})