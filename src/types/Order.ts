import { Product } from './Product';
// import { ProductId } from './ProductId';

export type Order = {
  id: number;
  userId: number;
  productIds?: Product[];
};
