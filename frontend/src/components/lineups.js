import { useEffect, useState } from "react";
import PlayerGroup from "./playerGroup";
import {
  getUniqueLineups,
  getActivePlayers,
  getTeamPlayers,
  getEventLength,
} from "../services/playersService";

function Lineups(props) {
  const [playerGroups, setPlayerGroups] = useState(null);
  const [activePlayers, setActivePlayers] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState(null);
  const [eventLength, setEventLength] = useState(null);

  useEffect(() => {
    setPlayerGroups(null);
    setActivePlayers(null);
    setTeamPlayers(null);
    setEventLength(null);
    getPlayerGroups();
    getGamePlayers();
    getTeam();
    getDataLen();
  }, [props.gameId, props.groupId]);

  const getPlayerGroups = async () => {
    const data = await getUniqueLineups(props.gameId, props.groupId);
    setPlayerGroups(data);
  };

  const getGamePlayers = async () => {
    const data = await getActivePlayers(props.gameId, props.groupId);
    setActivePlayers(data);
  };

  const getTeam = async () => {
    const data = await getTeamPlayers(props.gameId, props.groupId);
    setTeamPlayers(data);
  };

  const getDataLen = async () => {
    const len = await getEventLength(props.gameId);
    setEventLength(len);
  };

  return (
    <div>
      {playerGroups && activePlayers && teamPlayers ? (
        playerGroups.map((group) => {
          return (
            <div>
              <PlayerGroup
                playerArray={group.combination}
                activePlayers={activePlayers}
                team={teamPlayers}
                comboLen={group.count}
                totalLen={eventLength}
                gameId={props.gameId}
                groupId={props.groupId}
              />
              <br />
            </div>
          );
        })
      ) : (
        <div className="loadingSpace">
          <h3>Loading...</h3>
          <br></br>
          <img
            className="loadingImg"
            src="https://i.pinimg.com/originals/27/3d/59/273d598e4856924672bf1a0ce62f0d54.gif"
          />
        </div>
      )}
    </div>
  );
}

export default Lineups;
