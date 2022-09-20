import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../../hook/useAuth";
import useCart from "../../../../hook/useCart";
import { paymentCartApi } from "../../../../api/cart";

export default function FormPayment({ products, address }) {
  const { logout, auth } = useAuth();
  const { removeAllProductsCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      console.log(result.token);
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        address,
        logout
      );

      if (size(response) > 0) {
        toast.success("Pedido Completado");
        removeAllProductsCart();
        router.push("/orders");
      } else {
        toast.error("Error al realizar el pedido");
      }
    }
    setLoading(false);
  };
  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Pagar
      </Button>
    </form>
  );
}
