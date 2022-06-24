import { BASE_PATH } from "../utils/constats";
import { authFetch } from "../utils/fetch";

export const isFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
};
