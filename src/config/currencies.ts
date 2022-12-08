import type { ICurrency } from "../interfaces/currency";

export const CURRENCIES: ICurrency[] = [
  { key: "PLN", name: "zł", source: "ecb" },
  { key: "USD", name: "$", source: "ecb" },
  { key: "BTC", name: "BTC", source: "crypto" },
  { key: "ETH", name: "ETH", source: "crypto" },
  { key: "XMR", name: "XMR", source: "crypto" },
];

export const DEFAULT_CURRENCY = "PLN";
