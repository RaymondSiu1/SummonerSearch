import {useState} from 'react';
import axios from 'axios';
import './styles/App.css';
import DarkMode from "./components/DarkMode";

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [gameList, setGameList] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);

 
 function searchForPlayer(event) {
  var APIsearchPlayer =
  axios.get("http://localhost:4000/summonerData", { params: { username: searchText}})
  .then(function (response) {
    setPlayerData(response.data);
  }).catch(function (error) {
    console.log(error);
  })
   getPlayerGames(event);
 }
 
 
 
  //Searches for the account with the name entered into the search box. Stores data into playerData and calls searchMatchHistory
 function getPlayerGames(event) {
  var APIsearchPlayer =
    axios.get("http://localhost:4000/past5Games", { params: { username: searchText}})
    .then(function (response) {
      setGameList(response.data);
    }).catch(function (error) {
      console.log(error);
    })
}



console.log(gameList);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className = "right">
      <DarkMode />
      </div>
      
      <div className = "center"> 
      <h2>Summoner Search</h2>
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={searchForPlayer}><i class="fa fa-search"></i></button>
      {JSON.stringify(playerData) != "{}" ? (
          <>
            <p>{playerData.name}</p>
            <img
              width="100"
              height="100"
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/" +
                playerData.profileIconId +
                ".png"
              }
            ></img>
            <p>Summoner Level {playerData.summonerLevel}</p>
          </>
        ) : (
          <>
            <h3>No Player Data</h3>
          </>
        )
      }

      {gameList.length !== 0 ?
      <>
      <p>Data found</p>
      {
        gameList.map((gameData, index) =>
        <>
        <h2>Game {index + 1} {gameData.info.gameMode}</h2>
        <div>
          {gameData.info.participants.map((data, participantIndex) => 
            <p>
            {participantIndex + 1 == 1 && data.win.toString() == "true"  && <h3>Blue Side Victory</h3>}
            {participantIndex + 1 == 1 && data.win.toString() == "false"  && <h3>Blue Side Defeat</h3>}
            {participantIndex + 1 == 6 && data.win.toString() == "true"  && <h3>Red Side Victory</h3>}
            {participantIndex + 1 == 6 && data.win.toString() == "false"  && <h3>Red Side Defeat</h3>}
            {data.summonerName} <img
            width="32"
            height="32"
            src={
              "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" +
              data.championName +
              ".png"
            }
          ></img>  KDA: {data.kills} / {data.deaths} / {data.assists}</p>)
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
    </div>
  );
}

export default App;
