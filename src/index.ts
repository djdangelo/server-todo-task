import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import responseMessagesShared from "./shared/response-messages/response-messages.shared";
import corsOptions from "./config/cors/cors.config";

import authRoute from "./routes/auth/auth.route";
import userRouter from "./routes/users/user.route";
import taskRouter from "./routes/tasks/task.route";


dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());


app.use(`${process.env.GLOBAL_ROUTE}auth`, authRoute);
app.use(`${process.env.GLOBAL_ROUTE}users`, userRouter);
app.use(`${process.env.GLOBAL_ROUTE}task`, taskRouter);


app.use(/.*/, (_req, res) => {
    responseMessagesShared.notAuthUser(res, 'You are not allowed this action.', []);
});

app.listen(process.env.PORT, () => {
    console.log('Server on port',process.env.PORT);
});