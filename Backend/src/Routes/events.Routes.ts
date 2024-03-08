import { Router } from "express";
import { createEvent } from "../Controllers/events.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const eventRoutes = Router();

eventRoutes.post('/create', verifyToken, createEvent);

export default eventRoutes;