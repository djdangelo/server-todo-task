import { Router } from 'express';
import {validateJwt} from "../../middleware/validate-jwt/validate-jwt.middleware";
import tasksController from "../../controllers/tasks/tasks.controller";
const taskRouter = Router();

// @ts-ignore
taskRouter.post('/create', validateJwt, tasksController.create);
// @ts-ignore
taskRouter.get('/get-all', validateJwt, tasksController.getAll);
// @ts-ignore
taskRouter.get('/get-by-id/:id', validateJwt, tasksController.getById);
// @ts-ignore
taskRouter.put('/update/:id', validateJwt, tasksController.update);
// @ts-ignore
taskRouter.delete('/delete/:id', validateJwt, tasksController.delete);


export default taskRouter;