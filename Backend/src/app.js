import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
const app = express();

// Built-in middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Cookie parser middleware
app.use(cookieParser());

app.use('/auth', authRouter);

export default app;