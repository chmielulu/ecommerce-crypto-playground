import type { IProduct } from "../interfaces/product";
import { useEffect, useState } from "react";

export const useProducts = (category: string): IProduct[] | null => {
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    (async () => {
      console.log(category);
      const response = await fetch(
        `http://localhost:4000/products?category=${category}`
      );

      const data = await response.json();

      if (data) {
        setProducts(data);
      } else {
        setProducts(null);
      }
    })();
  }, [category]);

  return products;
};
