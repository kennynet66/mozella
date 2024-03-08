import express, { Request, Response, json } from 'express';

const app = express();

// Configure dotenv
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.Routes';
import eventRoutes from './Routes/events.Routes';
import teamRoutes from './Routes/teams.Routes';
import venueRoutes from './Routes/venue.Routes';
dotenv.config();

app.use(json());

// import auth routes
app.use('/users', authRoutes);
app.use('/events', eventRoutes);
app.use('/teams', teamRoutes);
app.use('/venues', venueRoutes);

// Start the server on a port
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
    
})