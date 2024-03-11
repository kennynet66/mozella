import express, { Request, Response } from 'express';
import cron from 'node-cron';
import { resetPassword } from './mailServices/resetpassword';

const app = express();

const run = async () =>{
    cron.schedule('*/5 * * * * *', async()=>{
        console.log("Checking for a password reset request");
        await resetPassword();
    })
}

run();

app.listen(5000, ()=>{
    console.log("Server is running...");
})