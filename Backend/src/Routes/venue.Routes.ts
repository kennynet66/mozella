import { Router } from "express";
import { createVenue } from "../Controllers/venue.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const venueRoutes = Router();

venueRoutes.post('/create', verifyToken, createVenue);

export default venueRoutes;