import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProvider } from "./context/context";
import { OrderProvider } from "./context/context-order";
import "./style/main.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

(async () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        <OrderProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </OrderProvider>
      </AppProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
