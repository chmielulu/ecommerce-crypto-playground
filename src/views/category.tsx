import Product from "../components/Product";
import React from "react";
import { useParams } from "react-router-dom";
import { fromUpperCase } from "../utils/fromUpperCase";

function Category() {
  const { category } = useParams<{ category: string }>();

  return (
    <>
      <h1 className="mb-10 text-3xl font-bold">
        {fromUpperCase(category || "")}
      </h1>

      <input
        type="text"
        placeholder="Search product"
        className="bg-zinc-100 px-4 py-2 rounded-xl mb-20 w-1/3"
      />

      <div className="flex flex-col gap-10 lg:flex-row">
        <Product
          name="iPhone 14"
          description="Patrioque penatibus mollis consectetuer tincidunt disputationi maluisset augue nisl lorem agam potenti blandit pellentesque integer tempus eruditi invidunt phasellus nonumes non solum"
          price={7199}
          picture="iphone.png"
        />

        <Product
          name="Realme 10 8+"
          description="Patrioque penatibus mollis consectetuer tincidunt disputationi maluisset augue nisl lorem agam potenti blandit pellentesque integer tempus eruditi invidunt phasellus nonumes non solum"
          price={2200}
          picture="realme.png"
        />
      </div>
    </>
  );
}

export default Category;
