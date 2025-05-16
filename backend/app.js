
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import aiRoutes from './routes/ai.routes.js';
import cookieParser from 'cookie-parser';
import projectRoutes from './routes/project.routes.js';


connect();



const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
app.use('/ai',aiRoutes);
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World!');
    });

export default app;