import { IProduct } from "./product";

export interface IBasketItem {
  product: IProduct;
  count: number;
}

export interface IBasket {
  items: IBasketItem[];
  totalPrice: number;
  addItem: (product: IProduct) => boolean;
  removeItem: (productId: string) => boolean;

  clear: () => void;
  changeCount: (productId: string, count: number) => boolean;
  totalCount: number;
}
