import React, { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { fromUpperCase } from "../utils/fromUpperCase";
import ProductList from "../components/ProductList";

function Category() {
  const { category } = useParams<{ category: string }>();
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <h1 className="mb-10 text-3xl font-bold">
        {fromUpperCase(category || "")}
      </h1>

      <input
        type="text"
        placeholder="Search product"
        className="bg-zinc-100 px-4 py-2 rounded-xl mb-20 w-1/3"
        value={inputValue}
        onChange={(ev) => {
          setInputValue(ev.target.value);
        }}
      />

      <ProductList searchString={inputValue} category={category || ""} />
    </>
  );
}

export default Category;
