import { getCurrencyByKey } from "./getCurrencyByKey";

export const convertCurrency = async (
  from: string,
  to: string
): Promise<number> => {
  const currentCurrency = getCurrencyByKey(to);

  if (currentCurrency.source === "crypto") {
    const response = await fetch(
      `http://localhost:3465/coinmarketcap?symbol=${to}&convert=${from}&amount=1`
    );

    const json = await response.json();

    return (1 / json.data.quote[from].price) as number;
  }

  const response = await fetch(
    `https://api.exchangerate.host/latest?base=${from}&symbols=${to})`
  );

  return (await response.json()).rates[to] as number;
};
