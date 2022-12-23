import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { MainContextProvider } from "./context/MainContext";
import { DEFAULT_CURRENCY } from "./config/currencies";
import { getCurrencyByKey } from "./utils/getCurrencyByKey";
import { roundOutToUp } from "./utils/roundOutToUp";
import { convertCurrency } from "./utils/convertCurrency";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./views";
import Category from "./views/category";
import { IBasketItem } from "./interfaces/basket";
import { IProduct } from "./interfaces/product";
import useLocalStorageState from "use-local-storage-state";
import { Icon } from "@iconify/react";
import Checkout from "./views/checkout";

function App() {
  const [currentCurrency, setCurrentCurrency] = useLocalStorageState(
    "currency",
    { defaultValue: DEFAULT_CURRENCY }
  );
  const [scaler, setScaler] = useState<number>(1);
  const [basketItems, setBasketItems] = useLocalStorageState<IBasketItem[]>(
    "basketItems",
    { defaultValue: [] }
  );

  useEffect(() => {
    (async () => {
      setScaler(await convertCurrency(DEFAULT_CURRENCY, currentCurrency));
    })();
  }, [currentCurrency]);

  const calculatePrice = (price: number) => {
    const currency = getCurrencyByKey(currentCurrency);
    if (currency.source !== "crypto" && currency.name !== "BTC") {
      return roundOutToUp(price * scaler);
    }

    return (price * scaler).toFixed(8);
  };

  const addBasketItem = (product: IProduct) => {
    const itemIndex = basketItems.findIndex(
      (item) => item.product._id === product._id
    );

    if (itemIndex !== -1) {
      let newBasketItems = basketItems;
      newBasketItems[itemIndex].count += 1;
      setBasketItems(newBasketItems);
      return true;
    }

    setBasketItems((prevState) => [...prevState, { product, count: 1 }]);
    return true;
  };

  const removeBasketItem = (productId: string) => {
    const itemIndex = basketItems.findIndex(
      (item) => item.product._id === productId
    );

    if (itemIndex === -1) {
      return false;
    }

    setBasketItems(
      basketItems.filter((item) => item.product._id !== productId)
    );

    return true;
  };

  const changeBasketItemCount = (productId: string, count: number) => {
    const itemIndex = basketItems.findIndex(
      (item) => item.product._id === productId
    );

    if (itemIndex === -1) {
      return false;
    }

    let newBasketItems = basketItems;
    newBasketItems[itemIndex].count += count;
    setBasketItems(newBasketItems);
    return true;
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  return (
    <BrowserRouter>
      <MainContextProvider
        value={{
          currentCurrency,
          calculatePrice,
          changeCurrentCurrency: setCurrentCurrency,
          basket: {
            items: basketItems,
            addItem: addBasketItem,
            removeItem: removeBasketItem,
            changeCount: changeBasketItemCount,
            totalPrice: basketItems.reduce(
              (prev, curr) => prev + curr.product.price * curr.count,
              0
            ),
            totalCount: basketItems.reduce(
              (prev, curr) => prev + curr.count,
              0
            ),
            clear: clearBasket,
          },
        }}
      >
        <Navigation />

        <div className="mt-4 p-10 mb-20">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <footer className="fixed bottom-0 left-o w-full text-center p-6 bg-violet-100">
          This site is created by{" "}
          <a href="#" className="font-medium hover:underline">
            Jakub Chmielewski
          </a>{" "}
          and it's just a playground to learn e-commerce payments with crypto.
        </footer>
      </MainContextProvider>
    </BrowserRouter>
  );
}

export default App;
