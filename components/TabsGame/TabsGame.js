import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../Game/InfoGame/InfoGame";

export default function TabsGame({ game }) {
  const panes = [
    {
      menuItem: "Information",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="tabs-game">
      <Tab panes={panes} />
    </div>
  );
}
