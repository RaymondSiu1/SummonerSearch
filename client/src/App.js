import { useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);

 //Searches for the account with the name entered into the search box. Stores data into playerData and calls searchMatchHistory
 function getPlayerGames(event) {
  var APIsearchPlayer =
    axios.get("http://localhost:4000/past5Games")
    .then(function (response) {
      setGameList(response.data);
    }).catch(function (error) {
      console.log(error);
    })
}

console.log(gameList);

  return (
    <div className="App">
      <h2>Welcome to our proxy server App!</h2>
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={getPlayerGames}>Get the 5 past games from your player</button>
      {gameList.length !== 0 ?
      <>
      <p>Data found</p>
      {
        gameList.map((gameData, index) =>
        <>
        <h2>Game {index + 1}</h2>
        <div>
          {gameData.info.participants.map((data, participantIndex) => 
          <p>Player {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>)
         }
        </div>
        </>
        )
      }
      </>
    :
    <>
    <p>No Data</p>
    </>
    }
    </div>
  );
}

export default App;
