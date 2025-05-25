import cors from 'cors';

const allowedOrigins = [
    'http://localhost:4600',
    'https://task-prod.hn',// cmabiar con prod
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
