import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constats";
import FormPayment from "./FormPayment.js/FormPayment";

const stripePromise = loadStripe(STRIPE_TOKEN);

export default function Payment({ products, address }) {
  return (
    <div className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
}
