import { Router } from "express";
import { createUser, loginUser, checkUserDetails, resetPassword } from "../Controllers/auth.Controller";
import { verifyToken } from "../Middlewares/verifyToken";

const authRoutes = Router();

authRoutes.post('/register', createUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/details', verifyToken,checkUserDetails);
authRoutes.post('/reset', resetPassword);

export default authRoutes;