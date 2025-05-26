import cors from 'cors';

const allowedOrigins = [
    'http://localhost:4200',
    'https://todo-task-824ef.web.app',// cmabiar con prod
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

export default corsOptions;
