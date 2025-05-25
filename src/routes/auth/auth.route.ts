import { Router } from 'express';
import authController from "../../controllers/auth/auth.controller";
import {body} from "express-validator";

const authRoute = Router();

// @ts-ignore
authRoute.post('/login',body('email').trim().isEmail(), authController.login);

export default authRoute;