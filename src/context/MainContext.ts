import { createContext, useContext } from "react";
import { DEFAULT_CURRENCY } from "../config/currencies";

interface IMainContext {
  currentCurrency: string;
  calculatePrice: (price: number) => number | string;
  changeCurrentCurrency: (currency: string) => void;
}

export const MainContext = createContext<IMainContext>({
  currentCurrency: DEFAULT_CURRENCY,
  calculatePrice: () => 1,
  changeCurrentCurrency: () => {},
});

export const MainContextProvider = MainContext.Provider;

export const useMainContext = () => useContext(MainContext);
