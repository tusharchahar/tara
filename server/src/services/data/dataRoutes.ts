import express from 'express';

import * as controller from './dataController';
import jwt from 'express-jwt';
import { config } from '../../config';

export const dataRouter = express.Router();

dataRouter.get('/:userId',jwt(config),controller.getData);

dataRouter.post('/',jwt(config),controller.addData);

dataRouter.patch('/:userId',jwt(config), controller.updateData);