// import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
// import { Order } from 'sequelize';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { OrderService } from '../types/OrderService';
// import { Order } from '../types/Order';
// import { ProductId } from '../types/ProductId';
import { ServiceResponseSuccess } from '../types/serviceResponse';

// const getAllOrders = async (): Promise<ServiceResponseSuccess<OrderSequelizeModel[]>> => {
const getAllOrders = async (): Promise<ServiceResponseSuccess<OrderService[]>> => {
  const orderList = await OrderModel
    .findAll({ include: { model: ProductModel,
      as: 'productIds',
      attributes: ['id'] } });

  const newOrderList = orderList.map(({ dataValues }) => 
    ({
      id: dataValues.id,
      userId: dataValues.userId,
      productIds: dataValues.productIds?.map(((productId) => productId.id)) || [],
    }));

  // console.log(orderList.dataValues.map({productIds} => id));
  // console.log(orderList);

  return { status: 'SUCCESSFUL', data: newOrderList };
};

export default { getAllOrders };