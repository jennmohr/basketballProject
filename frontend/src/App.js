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
    <div className="app">
      <div className="header">
        <h1 class="display-2">NBA Lineup Analysis</h1>
        <p className="description" class="lead">
          This is a tool that uses NBA tracking and event data to gather unique
          lineups and analyze their usage and efficiency. Get started by
          selecting a game.
        </p>
        <div className="buttons">
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedGame ? selectedGame.gameType : "Select Game"}
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
        <div className="data">
          Data provided by{" "}
          <img
            class="dataImg"
            src="https://sportradar.com/wp-content/uploads/2023/02/Sportradar-Brand-Line_Color_White.svg"
          />
        </div>
      </div>
      <div className="container">
        {selectedGame && selectedGroupId ? (
          <Lineups gameId={selectedGame.gameId} groupId={selectedGroupId} />
        ) : (
          <p className="description" class="lead">
            No game selected. To view lineup analysis, choose a game in the
            sidebar to the left.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
