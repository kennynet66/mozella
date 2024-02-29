/* 
    @createUser - This is a function that gets the user details, validates them and stores into the database
    @loginUser - This is a function that attempts to authenticate/Login a user using jwt(Json Web Token) and returns respective responses according to the data received
 */

import { Request, Response } from "express";
import { User, login } from "../interface/user.Interface";
// import mssql from mssql

export const createUser = (async(req: Request, res: Response) =>{
    try {
        const userDetails:User = req.body;
        /* 
        // 1. Check if a user with the provided email exists
         */
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

export const loginUser = ((req: Request, res:  Response) =>{
    try {

        const userDetails: login = req.body

        
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});