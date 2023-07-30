import getMatchingObject from "../utils/getMatchingObject";
import Player from "./player";
import ProgressBar from "react-bootstrap/ProgressBar";
import StatsTable from "./statsTable";
import { getEventTypes } from '../services/playersService'
import { useEffect, useState } from "react";

function PlayerGroup(props) {
  const [lineupStats, setLineupStats] = useState(null);

  useEffect(() => {
    getLineupStats();
  }, [])

  const getLineupStats = async () => {
    const data = await getEventTypes(props.gameId, props.groupId);
    const playerTuple = `('${props.playerArray.join("', '")}')`
    for (const key in data) {
      if (key === playerTuple) {
        setLineupStats(data[key])
      }
    }
  }
  
  const progress = ((props.comboLen / props.totalLen) * 100).toFixed(1);
  return (
    <div className="playerGroup">
      <div className="cardGroup">
        {props.activePlayers &&
          props.team &&
          props.playerArray.map((playerId) => {
            const playerJersey = getMatchingObject(
              props.activePlayers,
              "playerId",
              playerId
            );
            const playerObj =
              playerJersey &&
              getMatchingObject(props.team, "jersey", playerJersey.jersey);
            return (
              <Player
                playerId={playerId}
                jersey={playerJersey?.jersey}
                playerObj={playerObj}
              />
            );
          })}
      </div>
      <div className="progressBar">
        <div className="progressLabel"><div>Percentage of Game with Lineup </div><div>{progress}%</div></div>
        <ProgressBar now={progress} />
      </div>
      <div className="statsTable">
        {<StatsTable stats={lineupStats}/>}
      </div>
    </div>
  );
}

export default PlayerGroup;
