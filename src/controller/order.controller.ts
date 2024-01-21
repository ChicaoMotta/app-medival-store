import { Request, Response } from 'express';
import orderService from '../service/order.service';
import mapHttpStatus from '../utils/mapHttpStatus';

const getAllOrders = async (_res: Request, res: Response): Promise<Response> => {
  const orderList = await orderService.getAllOrders();

  // const mapProductIds = orderList.data.map(el =>{
  //   el.productIds
  // })

  return res.status(mapHttpStatus(orderList.status)).json(orderList.data);
};

export default { getAllOrders };