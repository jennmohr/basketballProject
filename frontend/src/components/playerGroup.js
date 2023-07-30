import Player from "./player";

function PlayerGroup(props) {
  return (
    <div className="playerGroup">
      {props.playerArray.map((playerId) => {
        return <Player
            playerId={playerId}
        />
      })

      }
    </div>
  );
}

export default PlayerGroup;
