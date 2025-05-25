import { Router } from "express";
import userController from "../../controllers/users/users.controller";
import usersController from "../../controllers/users/users.controller";
import {validateJwt} from "../../middleware/validate-jwt/validate-jwt.middleware";
import {body} from "express-validator";

const userRouter = Router();

// @ts-ignore
userRouter.post('/create',[validateJwt,
    body('email').trim().isEmail()], userController.create);
// @ts-ignore
userRouter.get('/get-all',[
    // @ts-ignore
    validateJwt
], usersController.getAll);
// @ts-ignore
userRouter.put('/update',[validateJwt,
    body('email').trim().isEmail()
], userController.update);
// @ts-ignore
userRouter.get('/get-by-id/:id',[
    // @ts-ignore
    validateJwt
], userController.getById);
// @ts-ignore
userRouter.delete('/delete/:id',[
    // @ts-ignore
    validateJwt
], userController.delete);

export default userRouter;