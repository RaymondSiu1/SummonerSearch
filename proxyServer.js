var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

const RIOT_API_KEY = "RGAPI-9e97edc5-5aee-4a71-848e-ffdf73b5cc73";

function getPlayerPUUID(playerName) {
    return axios
      .get(
        "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
          playerName +
          "?api_key=" +
          RIOT_API_KEY
      )
      .then(response => {
        console.log(response.data);
        return response.data.puuid;
      })
      .catch((err) => err);
  }

//GET past5Games
//GET localhost:3000/past5Games
app.get('/past5Games', async (req, res) => {
    const playerName = "iShootPlasma";
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL =
      "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
      PUUID +
      "/ids?api_key=" +
      RIOT_API_KEY;
    //GET API_CALL
    //gives list of game IDs
    const gameIDList = await axios
      .get(API_CALL)
      .then((reponse) => reponse.data)
      .catch((err) => err);
    console.log(gameIDList);
    //loop through IDs and get info based of ID (API CALL)
    var matchDataArray = [];
    for (var i = 0; i < gameIDList.length - 15; i++) {
      const matchID = gameIDList[i];
      const matchData = await axios
        .get(
          "https://americas.api.riotgames.com/lol/match/v5/matches/" +
            matchID +
            "?api_key="+
            RIOT_API_KEY
        )
        .then(response => response.data)
        .catch((err) => err);
      matchDataArray.push(matchData);
    }
      //save info above in to array, give array as JSON reponse to user
    // [Game1Object, Game2Object, ...]
  res.json(matchDataArray);
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
