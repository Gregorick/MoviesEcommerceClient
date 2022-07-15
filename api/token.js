import { TOKEN, CART } from "../utils/constats";
import jwtDecode from "jwt-decode";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}

export function removeTokenCart() {
  localStorage.removeItem(CART);
}

export function hashExpirationToken(token) {
  const tokenDecode = jwtDecode(token);
  const expirationDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expirationDate) {
    return true;
  }
  return false;
}
