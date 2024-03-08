import { Router } from "express";
import { createTeam } from "../Controllers/teams.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const teamRoutes = Router();

teamRoutes.post('/create', verifyToken, createTeam);

export default teamRoutes;