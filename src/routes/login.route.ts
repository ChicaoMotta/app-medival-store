import express from 'express';
import validateLogin from '../middleware/validateLogin';
import loginController from '../controller/login.controller';

const route = express.Router();

route.post('/', validateLogin, loginController.login);

export default route;
