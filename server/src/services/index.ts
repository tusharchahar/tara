import express from 'express';

import { authRouter } from './auth/authRoutes';
import { userRouter } from './users/usersRoutes';
import { dataRouter } from './data/dataRoutes';

export const services = express.Router();

services.use('/auth', authRouter);
services.use('/users', userRouter);
services.use('/data', dataRouter)
