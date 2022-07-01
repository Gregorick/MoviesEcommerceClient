import { BASE_PATH, CART } from "../utils/constats";

export const getProductsCart = () => {
  const cart = localStorage(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
};
