import { BASE_PATH, CART } from "../utils/constats";
import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { authFetch } from "../utils/fetch";

export const getProductsCart = () => {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
};

export const addProductCart = (product) => {
  const cart = getProductsCart();

  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito correctamente");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto esta añadido al carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido al carrito correctament");
    }
  }
};

export const countProductsCart = () => {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
};

export const removeProductCart = (product) => {
  const cart = getProductsCart();

  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
};

export const paymentCartApi = async (
  token,
  products,
  idUser,
  address,
  logout
) => {
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createdAt;

    const url = `${BASE_PATH}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeAllProductsCart = () => {
  localStorage.removeItem(CART);
};
