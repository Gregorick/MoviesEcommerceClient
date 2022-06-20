import { BASE_PATH } from "../utils/constats";
import { authFetch } from "../utils/fetch";

export const createAddressApi = async (address, logout) => {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getApiAddress = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/addresses?users_permissions_user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw "Error al servidor";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteApiAddress = async (idAddress, logout) => {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error en el servidor";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updataApiAddress = async (idAddress, address, logout) => {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
