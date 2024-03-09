import { Router } from "express";
import { allVenues, createVenue, getOneVenue } from "../Controllers/venue.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const venueRoutes = Router();

venueRoutes.post('/create', verifyToken, createVenue);
venueRoutes.get('/:id', verifyToken, getOneVenue);
venueRoutes.get('', verifyToken, allVenues);

export default venueRoutes;