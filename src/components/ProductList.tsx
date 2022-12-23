import React from "react";
import Product from "./Product";
import { useProducts } from "../api/useProducts";
import { useMainContext } from "../context/MainContext";

function ProductList({ category, searchString }: Props) {
  const { basket } = useMainContext();
  let products = useProducts(category || "");

  if (searchString && products) {
    products = products?.filter((product) =>
      product.name.includes(searchString)
    );
  }

  if (products) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 gap-y-14">
        {products.map(({ _id, ...product }) => (
          <Product
            key={_id}
            {...product}
            onButtonClick={() => {
              basket.addItem({ _id, ...product });
            }}
          />
        ))}
      </div>
    );
  }

  return <h2>Loading...</h2>;
}

interface Props {
  category: string;
  searchString: string;
}

export default ProductList;
