import ejs from 'ejs';
import { Request, Response } from 'express';
import mssql from 'mssql'
import { sqlConfig } from '../Config/sql.Config';
import { sendMail } from '../Helpers/emailHelper';
import jwt from 'jsonwebtoken';
import path from 'path';

export const resetPassword = async ()=>{
        const pool = await mssql.connect(sqlConfig);

        const users = (await pool.request().query('SELECT * FROM Users WHERE isReset = 1')).recordset;

        console.log(users);

        

        for(let user of users){
            const token = generateResetToken(user.email);
            ejs.renderFile('Templates/reset.ejs', {email: user.email, username: user.userName, token: token}, async(error:any, data:any)=>{
                let mailOptions = {
                    from: process.env.USER as string,
                    to: user.email,
                    subject: "Mozella password reset",
                    html: data,
                }

                try {
                    await sendMail(mailOptions);

                    await pool.request().query('UPDATE Users SET isReset = 0');
                    
                } catch (error) {
                    console.log(error);
                    
                }
            })
        }
}

function generateResetToken(email: string){
    const token = jwt.sign(email, process.env.RESET_SECRET as string)
    return token;
}