// import Sequelize from 'sequelize';
import ProductModel,
{ ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponseSuccess } from '../types/serviceResponse';

const postProducts = async (
  productDetails: ProductInputtableTypes,
): Promise<ServiceResponseSuccess<Omit<Product, 'orderId'>>> => {
  const { name, price, orderId } = productDetails;

  const insertProduct = await ProductModel.create({
    name,
    orderId,
    price,
  });

  const filteredResponse = {
    id: insertProduct.dataValues.id,
    name: insertProduct.dataValues.name,
    price: insertProduct.dataValues.price,
  };

  // console.log(insertProduct);

  return { status: 'CREATED', data: filteredResponse };
};

// const getAllProducs = async () : Promise<ServiceResponseSuccess<Product[]>> => {
const getAllProducs = async () : Promise<ServiceResponseSuccess<ProductSequelizeModel[]>> => {
  const list = await ProductModel.findAll();
  // console.log(list);

  return { status: 'SUCCESSFUL', data: list };
};

const ProductService = {
  postProducts,
  getAllProducs,
};

export default ProductService;