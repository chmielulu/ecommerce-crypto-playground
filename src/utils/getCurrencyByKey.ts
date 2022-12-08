import type { ICurrency } from "../interfaces/currency";
import { CURRENCIES } from "../config/currencies";

export const getCurrencyByKey = (key: string): ICurrency =>
  CURRENCIES.find(({ key: k }) => key === k) as ICurrency;
