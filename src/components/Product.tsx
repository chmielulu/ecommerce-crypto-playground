import React, { useState } from "react";
import classNames from "classnames";
import { useMainContext } from "../context/MainContext";
import { getCurrencyByKey } from "../utils/getCurrencyByKey";

function Product({
  name,
  description,
  price,
  picture,
}: Props): React.ReactElement {
  const [isHovering, setHovering] = useState(false);
  const { calculatePrice, currentCurrency } = useMainContext();

  return (
    <article className="flex gap-10 items-center xl:w-1/2">
      <div className="w-60 h-60 rounded-xl overflow-hidden">
        <img
          className={classNames(
            "w-full h-full rounded-xl ease-in-out duration-500",
            { "scale-105": isHovering }
          )}
          src={`/products/${picture}`}
          alt={name}
        />
      </div>
      <div className="flex flex-col justify-center h-max flex-1">
        <h2
          className="text-2xl font-bold hover:underline cursor-pointer"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {name}
        </h2>
        <p className="mt-4">{description}</p>
        <div className="mt-4 flex items-center">
          <div className="font-bold text-xl">
            {calculatePrice(price)} {getCurrencyByKey(currentCurrency).name}
          </div>
          <button
            className="ml-auto xl:mr-10 w-10 h-10 rounded-xl bg-violet-400 font-bold text-white cursor-pointer hover:bg-violet-500 focus:outline-none focus:ring"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

interface Props {
  name: string;
  description: string;
  price: number;
  picture: string;
}

export default Product;
