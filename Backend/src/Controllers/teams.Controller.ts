import { Request, Response } from "express";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { Team } from "../interface/teams.Interface";
import { v4 } from 'uuid';

export const createTeam = (async (req: Request, res: Response)=>{
    try {
        // Generate a unique team id
        const teamId = v4();
        // Get the team details
        const teamDetails: Team = req.body
        // Create a new pool connection
        const pool = await mssql.connect(sqlConfig);
        // Save the data to the database
        const result = (await pool.request()
        .input('teamId', mssql.VarChar, teamId)
        .input('teamName', mssql.VarChar, teamDetails.teamName)
        .input('teamProfilePic', mssql.VarChar, teamDetails.teamProfilePic)
        .execute('createTeam')
        ).rowsAffected
        // Check if it has saved the data in the DB
        if(result[0] >= 1){
            return res.status(200).json({
                success: "Team created successfully"
            })
        } else {
            res.status(202).json({
                error: "There was an issue creating the team"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})