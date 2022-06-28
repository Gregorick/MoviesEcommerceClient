import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../Layout/BasicLayout";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hook/useAuth";
import ListGames from "../components/ListGames";

export default function wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const gameList = [];
        forEach(response, (data) => {
          gameList.push(data.game);
        });
        setGames(gameList);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__blog">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {!games && <Loader active>Cargando Juegpp</Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3>No tienen juego en su lista de favorito</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
