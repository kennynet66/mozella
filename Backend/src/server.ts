import express, { Request, Response, json } from 'express';

const app = express();

// Configure dotenv
import dotenv from 'dotenv';
dotenv.config();

app.use(json());

app.use((error: Error, req: Request, res: Response)=>{
    return res.status(500).json({
        error
    })
});

// Start the server on a port
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
    
})