import React, { useEffect, useState } from "react";
import BasicLayout from "../Layout/BasicLayout";
import { getGameByUrlApi } from "../api/game";
import { useRouter } from "next/router";
import HeaderGame from "../components/Game/HeaderGame/HeaderGame";
import { Loader } from "semantic-ui-react";
import TabsGame from "../components/TabsGame";

export default function Game() {
  const { query } = useRouter();
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);

  if (!game) return <Loader active>Cargando</Loader>;

  return (
    <BasicLayout className="game">
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
