import axios from "axios";
import express from "express";
import cors from "cors";
import cache from "memory-cache";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/coinmarketcap", async (req, res) => {
  const result = cache.get(req.query.symbol);

  if (result) {
    res.send(result);
  } else {
    try {
      const response = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?symbol=${req.query.symbol}&convert=${req.query.convert}&amount=${req.query.amount}&CMC_PRO_API_KEY=${process.env.API_TOKEN_COINMARKETCAP}`
      );
      res.send(response.data);

      cache.put(req.query.symbol, response.data, 15 * 60 * 1000);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
});

app.listen(3465, () => {
  console.log("Proxy server listening on port 3465");
});
