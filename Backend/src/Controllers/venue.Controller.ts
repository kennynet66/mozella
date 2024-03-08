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

        const result = (await pool.request()
        .input('venueId', mssql.VarChar, venueId)
        .input("venueName", mssql.VarChar, venueName)
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