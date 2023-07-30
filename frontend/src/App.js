import "./App.css";
import { useEffect, useState } from "react";
import Lineups from "./components/lineups";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { getGames } from "./services/commonDataService";

function App() {
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState("homePlayers");
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    getGameList();
  }, []);

  const getGameList = async () => {
    const data = await getGames();
    setGameList(data);
  };

  return (
    <div className="App">
      <div className="buttons">
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedGame ? selectedGame.gameType : "Select a game!"}
        >
          {gameList &&
            gameList.map((game) => {
              return (
                <Dropdown.Item onClick={() => setSelectedGame(game)}>
                  {game.gameType}
                </Dropdown.Item>
              );
            })}
        </DropdownButton>
        {selectedGame && (
          <DropdownButton
            id="dropdown-basic-button"
            className="secondButton"
            title={
              selectedGroupId == "homePlayers"
                ? selectedGame.homeTeam
                : selectedGame.awayTeam
            }
          >
            <Dropdown.Item onClick={() => setSelectedGroupId("homePlayers")}>
              {selectedGame.homeTeam}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedGroupId("awayPlayers")}>
              {selectedGame.awayTeam}
            </Dropdown.Item>
          </DropdownButton>
        )}
      </div>
      {selectedGame && selectedGroupId && (
        <Lineups gameId={selectedGame.gameId} groupId={selectedGroupId} />
      )}
    </div>
  );
}

export default App;
