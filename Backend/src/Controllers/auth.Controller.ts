/* 
    @createUser - This is a function that gets the user details, validates them and stores into the database
    @loginUser - This is a function that attempts to authenticate/Login a user using jwt(Json Web Token) and returns respective responses according to the data received
*/

import { Request, Response } from "express";
import { User, login } from "../interface/user.Interface";
import mssql from 'mssql';
import { sqlConfig } from "../Config/sql.config";
import { v4 } from "uuid";
import { createUserSchema } from "../Validators/auth.Validators";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ExtendedUserRequest } from "../Middlewares/verifyToken";

dotenv.config();

export const createUser = (async (req: Request, res: Response) => {
    try {
        const userDetails: User = req.body;
        const pool = await mssql.connect(sqlConfig);
        const userId = v4();

        // Validate the request body
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(201).json({
                error: error.details[0].message
            })
        }
        /* 
        // 1. Check if a user with the provided email exists
         */
        const existingUser = (await pool.request()
            .input('email', mssql.VarChar, userDetails.email.trim().toLocaleLowerCase())
            .execute('checkExistingUser')).recordset

        if (existingUser.length >= 1) {
            return res.status(201).json({
                error: "Email already registered"
            })
        }

        const hashPwd = await bcrypt.hash(userDetails.password, 5)

        const result = (await pool.request()
            .input('userId', mssql.VarChar, userId)
            .input('email', mssql.VarChar, userDetails.email.trim().toLocaleLowerCase())
            .input('password', mssql.VarChar, hashPwd)
            .input('userName', mssql.VarChar, userDetails.userName.trim().toLocaleLowerCase())
            .execute('createUser')
        ).rowsAffected
        return res.status(200).json({
            success: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

export const loginUser = (async (req: Request, res: Response) => {
    try {

        const userDetails: login = req.body

        const pool = await mssql.connect(sqlConfig);

        const user = (await pool.request()
            .input('email', mssql.VarChar, userDetails.email.trim().toLocaleLowerCase())
            .execute('loginUser')
        ).recordset

        if (user.length >= 1) {
            const isPwd = await bcrypt.compare(userDetails.password, user[0].password);

            if (!isPwd) {
                return res.status(201).json({
                    error: "Incorrect password"
                })
            }

            const token = jwt.sign(user[0], process.env.SECRET as string, {
                expiresIn: 3 * 24 * 60 * 60
            })
            return res.status(200).json({
                success: "Logged in successfully",
                token
            })
        } else {
            return res.status(200).json({
                error: "User not found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
});

export const checkUserDetails = (async (req: ExtendedUserRequest, res: Response) => {
    if (req.info) {
        return res.json({
            info: req.info
        })
    }
})
/*
    first check if the email provided from the request body exists
 */
export const resetPassword = (async (req:Request, res: Response)=>{
    try {
        const token = req.headers.token;
        const { email } = req.body;

        const pool = await mssql.connect(sqlConfig);

        const exists = (await pool.request()
        .input('email', mssql.VarChar, email.trim().toLocaleLowerCase())
        .execute('checkExistingUser')
        ).recordset

        if(exists.length >= 1 ){
            const resetPass = (await pool.request()
            .input('email', mssql.VarChar, email.trim().toLocaleLowerCase())
            .execute('resetPass')
            ).rowsAffected

            if(resetPass[0] >= 1){
                return res.status(200).json({
                success: "Check your email for a password reset email"
            })
            } else {
                return res.status(202).json({
                    error: "Password reset email already sent"
                })
            }
            
        } else {
            res.status(202).json({
                error: "Email does not exist"
            })
        }

    } catch (error) {
     return res.status(500).json({
        error
     })   
    }
})

export const updatePassword = (async(req: Request, res: Response)=>{
    try {
        // const email = req.headers.email as string;
        const { password, email } = req.body;
        console.log(req.body);
        

        const hashpwd = await bcrypt.hash(password, 5);
        const pool = await mssql.connect(sqlConfig);

        const request = (await pool.request()
        .input('email', mssql.VarChar, email.trim().toLocaleLowerCase())
        .input('password',mssql.VarChar, hashpwd)
        .execute('updatePassword')
        ).rowsAffected
        
        if(request[0] >= 0){
            return res.status(200).json({
                success: "Password updated successfully"
            })
        } else{
            return res.status(202).json({
                error: "There was an error updating the password"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})
