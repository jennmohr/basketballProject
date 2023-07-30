import getMatchingObject from "../utils/getMatchingObject";
import Player from "./player";
import ProgressBar from "react-bootstrap/ProgressBar";

function PlayerGroup(props) {
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
        <ProgressBar now={progress} label={`${progress}%`} />
      </div>
    </div>
  );
}

export default PlayerGroup;
