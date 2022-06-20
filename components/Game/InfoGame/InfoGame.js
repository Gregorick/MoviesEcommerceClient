import React from "react";
import ReactPlayer from "react-player/lazy";
import CarouselScreenshots from "../CarrouselScreenshots/CarouselScreenshots";

export default function InfoGame({ game }) {
  console.log(game);

  return (
    <div className="info-game">
      <ReactPlayer className="info-game__video" url={game.video} />
      <CarouselScreenshots title={game.title} screenshots={game.screenshots} />
    </div>
  );
}
