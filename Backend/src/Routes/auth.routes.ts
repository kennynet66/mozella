import { Router } from "express";
import { createUser, loginUser } from "../Controllers/auth.Controller";

const authRoutes = Router();

authRoutes.post('/register', createUser);
authRoutes.post('/login', loginUser);

export default authRoutes;