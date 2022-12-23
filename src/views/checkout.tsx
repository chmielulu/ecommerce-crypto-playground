import React from "react";
import { useMainContext } from "../context/MainContext";
import { Navigate } from "react-router-dom";

function Checkout() {
  const { basket } = useMainContext();

  if (basket.totalCount <= 0) {
    return <Navigate to="/" />;
  }

  return <h1>Checkout!</h1>;
}

export default Checkout;
