import express from 'express';
import { productsRoute, loginRoute, orderRoute } from './routes';

const app = express();

app.use(express.json());
app.use('/login', loginRoute);
app.use('/products', productsRoute);
app.use('/orders', orderRoute);

export default app;
