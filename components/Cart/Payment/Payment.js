import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constats";

const stripePromise = loadStripe(STRIPE_TOKEN);

export default function Payment({ products, address }) {
  return (
    <div className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <p>FORMULARIO DE PAGO</p>
        </Elements>
      </div>
    </div>
  );
}
