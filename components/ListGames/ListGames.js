import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hook/useWindowSize";
import {
  breackpointUpSm,
  breackpointUpMd,
  breackpointUpLg,
} from "../../utils/breackpoint";

export default function ListGames({ games }) {
  const { width } = useWindowSize();
  console.log(width);

  const getColumnRender = () => {
    switch (true) {
      case width > breackpointUpLg:
        return 5;
      case width > breackpointUpMd:
        return 3;
      case width > breackpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnRender()}>
          {map(games, (game, id) => (
            <Game key={id} game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

const Game = ({ game }) => {
  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game.poster.url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span></span>
              )}
              <span className="price">{game.price}$</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
};
