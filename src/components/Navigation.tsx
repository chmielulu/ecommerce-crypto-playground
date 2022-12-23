import React, { useEffect, useState } from "react";
import cx from "classnames";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";
import { CURRENCIES, DEFAULT_CURRENCY } from "../config/currencies";
import { useMainContext } from "../context/MainContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fromUpperCase } from "../utils/fromUpperCase";
import { getCurrencyByKey } from "../utils/getCurrencyByKey";

const NAVIGATION_ITEMS = [
  { name: "telefony" },
  { name: "komputery" },
  { name: "telewizory" },
];
function Navigation() {
  const { changeCurrentCurrency, currentCurrency, basket, calculatePrice } =
    useMainContext();
  const [displayCategory, setDisplayCategory] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<string>("telefony");
  const [isOpenBasket, setBasketOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (/^\/category\/[a-zA-Z0-9-_]+(\/)?$/?.test(pathname)) {
      setDisplayCategory(true);
      const categoryName = pathname.match(
        /\/category\/([a-zA-Z0-9-]+)\/?/
      )?.[1];

      if (
        categoryName &&
        NAVIGATION_ITEMS.findIndex(
          ({ name }) => name.toLowerCase() === categoryName?.toLowerCase()
        ) !== -1
      ) {
        setCurrentLocation(categoryName);
      } else {
        navigate("/");
      }
    } else {
      setDisplayCategory(false);
    }
  }, [pathname]);

  return (
    <nav className="mt-6 w-full bg-white px-8">
      <div className="relative w-full border-y-2 border-y-zinc-200 h-20 flex items-center px-6 justify-between">
        <ul className="flex gap-8 text-sm font-medium text-gray-700">
          {NAVIGATION_ITEMS.map(({ name }) => (
            <li
              className={cx({
                "text-purple-600": displayCategory && name === currentLocation,
                "cursor-pointer hover:underline":
                  displayCategory && name !== currentLocation,
              })}
              onClick={() => setCurrentLocation(name)}
              key={name}
            >
              <Link to={`/category/${name}`}>{fromUpperCase(name)}</Link>
            </li>
          ))}
        </ul>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 ">
          <img src={logo} alt="" />
        </Link>

        <div className="flex">
          <select
            className="mr-8"
            defaultValue={DEFAULT_CURRENCY}
            onChange={(ev) => changeCurrentCurrency(ev.target.value)}
            value={currentCurrency}
          >
            {CURRENCIES.map(({ key }) => (
              <option value={key}>{key}</option>
            ))}
          </select>
          <div className="flex items-center gap-4">
            <Icon icon="clarity:user-line" className="text-2xl" />
            <button
              className="relative"
              onClick={() => setBasketOpen((prevState) => !prevState)}
            >
              <Icon icon="clarity:shopping-bag-line" className="text-2xl" />
              {basket.totalCount > 0 && (
                <div className="absolute right-0 bottom-0 w-4 h-4 rounded-xl bg-violet-900 text-white text-xs font-bold flex justify-center items-center translate-x-1/3 translate-y-1/3">
                  {basket.totalCount}
                </div>
              )}
            </button>
          </div>
        </div>

        {isOpenBasket && (
          <div className="absolute right-0 top-full translate-y-4 p-6 bg-white border-zinc-300 border rounded-xl">
            <h3 className="font-medium text-lg">
              You have {basket.totalCount} products in basket.
            </h3>

            <div className="mt-6 flex flex-col">
              <div className="flex flex-col gap-y-4">
                {basket.items.map(({ product, count }) => (
                  <div key={product._id} className="flex relative group/parent">
                    <img
                      src={`/products/${product.picture}`}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl"
                    />
                    <div className="ml-4">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="text-xs">Count: {count}</div>
                      <div className="text-xs">
                        Price: {calculatePrice(product.price)}{" "}
                        {getCurrencyByKey(currentCurrency).name}
                      </div>
                      <div className="text-xs">
                        Total price: {calculatePrice(count * product.price)}{" "}
                        {getCurrencyByKey(currentCurrency).name}
                      </div>
                    </div>

                    <button
                      className="absolute right-0 top-0 hidden group-hover/parent:flex text-red-400"
                      onClick={() => basket.removeItem(product._id)}
                    >
                      <Icon icon="ph:trash-simple" />
                    </button>
                  </div>
                ))}
              </div>

              {basket.totalCount > 0 && (
                <>
                  <h3 className="mt-4 text-lg font-medium">
                    Total price: {calculatePrice(basket.totalPrice)}{" "}
                    {getCurrencyByKey(currentCurrency).name}
                  </h3>
                  <button
                    className="mt-6 bg-red-300 rounded-xl text-red-900 p-2 hover:bg-red-400 font-medium"
                    onClick={() => basket.clear()}
                  >
                    Clear basket.
                  </button>
                  <Link
                    className="mt-1 bg-violet-400 rounded-xl text-white p-2 hover:bg-violet-500 font-medium flex items-center justify-center"
                    to="/checkout"
                    onClick={() => {
                      setBasketOpen(false);
                    }}
                  >
                    Go to checkout.
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
