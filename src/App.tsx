import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { MainContextProvider } from "./context/MainContext";
import { DEFAULT_CURRENCY } from "./config/currencies";
import { getCurrencyByKey } from "./utils/getCurrencyByKey";
import { roundOutToUp } from "./utils/roundOutToUp";
import { convertCurrency } from "./utils/convertCurrency";
import {
  BrowserRouter,
  Navigate,
  redirect,
  Route,
  Routes,
} from "react-router-dom";
import Index from "./views";
import Category from "./views/category";

function App() {
  const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);
  const [scaler, setScaler] = useState<number>(1);

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

  return (
    <BrowserRouter>
      <MainContextProvider
        value={{
          currentCurrency,
          calculatePrice,
          changeCurrentCurrency: setCurrentCurrency,
        }}
      >
        <Navigation />

        <div className="mt-4 p-10">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<Category />} />
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
