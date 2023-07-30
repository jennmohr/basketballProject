import './App.css';
import { useEffect, useState } from "react";
import PlayerGroup from './components/playerGroup';
import { getUniqueLineups } from './services/playersService';

function App() {
  const [playerGroups, setPlayerGroups] = useState([]);
  const gameId = '0042100301';
  const groupId = 'homePlayers'

  useEffect(() => {
    getPlayerGroups();
  }, [])

  const getPlayerGroups = async () =>  {
    const data = await getUniqueLineups(gameId, groupId);
    setPlayerGroups(data);
  }

  return (
    <div className="App">
      { playerGroups && playerGroups.map((group) => {
          return <div><PlayerGroup
            playerArray={group}
          /><br/></div>;
        })
      }
    </div>
  );
}

export default App;
