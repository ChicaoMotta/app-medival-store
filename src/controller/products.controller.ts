import { Request, Response } from 'express';
import ProductService from '../service/products.service';
import mapHttpStatus from '../utils/mapHttpStatus';

const insertProduct = async (req: Request, res: Response): Promise<Response> => {
  //   const t = await Sequelize.Transaction();
  const insertProductResponse = await ProductService.postProducts(req.body);

  return res.status(mapHttpStatus(insertProductResponse.status)).json(insertProductResponse.data);
};

const getAllProducts = async (_req: Request, res: Response): Promise<Response> => {
  const productList = await ProductService.getAllProducs();

  return res.status(mapHttpStatus(productList.status)).json(productList.data);
};

export default { insertProduct, getAllProducts };