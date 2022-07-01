import React, { useState, useEffect } from "react";
import BasicLayout from "../Layout/BasicLayout";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { searchGameApi } from "../api/game";
import ListGames from "../components/ListGames";

export default function search() {
  const [games, setGames] = useState(null);
  const router = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(router.query.query) > 2) {
        const response = await searchGameApi(router.query.query);
        if (size(response) > 0) setGames(response);
        else setGames([]);
      } else {
        setGames([]);
      }
    })();
  }, [router]);

  return (
    <BasicLayout className="search">
      {!games && <Loader active>Cargando...</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay Resultados</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
