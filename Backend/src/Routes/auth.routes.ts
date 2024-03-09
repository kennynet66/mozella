import { Router } from "express";
import { createUser, loginUser, checkUserDetails } from "../Controllers/auth.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const authRoutes = Router();

authRoutes.post('/register', createUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/details', verifyToken,checkUserDetails);

export default authRoutes;