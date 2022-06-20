import { getToken, hashExpirationToken } from "../api/token";

export const authFetch = async (url, params, logout) => {
  const token = getToken();
  if (!token) {
    // si el usuario no esta autenticado
    logout();
  } else {
    if (hashExpirationToken(token)) {
      // Si el usuario esta autenticado pero su token caducó
      logout();
    } else {
      const paramsTemps = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemps);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
};
