import express from 'express';
import orderController from '../controller/order.controller';

const route = express.Router();

route.get('/', orderController.getAllOrders);

export default route;