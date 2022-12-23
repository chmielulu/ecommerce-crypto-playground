import { createContext, useContext } from "react";
import { DEFAULT_CURRENCY } from "../config/currencies";
import { IBasket } from "../interfaces/basket";

interface IMainContext {
  currentCurrency: string;
  calculatePrice: (price: number) => number | string;
  changeCurrentCurrency: (currency: string) => void;
  basket: IBasket;
}

export const MainContext = createContext<IMainContext>({
  currentCurrency: DEFAULT_CURRENCY,
  calculatePrice: () => 1,
  changeCurrentCurrency: () => {},
  basket: {
    items: [],
    totalPrice: 0,
    changeCount: () => false,
    addItem: () => false,
    removeItem: () => false,
    totalCount: 0,
    clear: () => {},
  },
});

export const MainContextProvider = MainContext.Provider;

export const useMainContext = () => useContext(MainContext);
