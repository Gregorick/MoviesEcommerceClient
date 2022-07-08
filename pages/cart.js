import React, { useState, useEffect } from "react";
import BasicLayout from "../Layout/BasicLayout";
import { getGameByUrlApi } from "../api/game";
import useCart from "../hook/useCart";
import SummaryCat from "../components/Cart/SummaryCart/SummaryCat";

export default function Cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

const EmptyCart = () => {
  return (
    <BasicLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
};

const FullCart = ({ products }) => {
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    (async () => {
      const productTemps = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productTemps.push(data);
      }
      setProductsData(productTemps);
    })();
  }, []);

  return (
    <BasicLayout>
      <SummaryCat products={productsData} />
    </BasicLayout>
  );
};
