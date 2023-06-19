import React, { useEffect, useState } from "react";
import tw from "twin.macro";

// Styled components
const MatchContainerWrapper = tw.div`flex flex-col space-y-4`;

const MatchContainer = ({ auth }) => {
  // Constantes globales pour discipline et gameId
  const discipline = window.location.pathname.split("/")[2];
  const gameId = window.location.pathname.split("/")[3];

  // GAME STATE
  const [gameState, setGameState] = useState("");

  //Info des joueurs (photo, nom, score ect...)
  const [yourInfo, setYourInfo] = useState(null);
  const [otherInfo, setOtherInfo] = useState(null);

  //Etat des joueurs (ready, not ready)
  const [playerState, setPlayerState] = useState({ myState: false, newState: false });

  //Score des joueurs
  const [myPlayerScore, setMyPlayerScore] = useState(null);
  const [otherPlayerScore, setOtherPlayerScore] = useState(null);

  //Info du gagnant et du perdant
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [loserInfo, setLoserInfo] = useState(null);

  //Reponse de l'utilisateur
  const [response, setResponse] = useState("");


  // Gestion du game state
  const handleGameStateChange = async (newState) => {
    console.log("Game state changed to", newState);
    setGameState(newState);

    // Si le game state est starting ou playing, on récupère les infos des joueurs pour l'affichage
    if (newState === "starting" || newState === "playing") {
      const usersInfo = await auth.league.getUsersInfo(discipline, gameId);
      if (usersInfo) {
        const infoSort = await auth.league.infoSort(usersInfo);
        setYourInfo(infoSort.myInfo);
        setOtherInfo(infoSort.otherInfo);
        const unsubscribe = auth.league.onStatePlayer(discipline, gameId, handlePlayerStateChange);
        return () => {
          unsubscribe();
        };
      }
    }
    // Si le game state est finished, on récupère les infos des joueurs pour l'affichage des gagnants et perdants
    if (newState === "finished") {
      const usersInfo = await auth.league.getUsersInfo(discipline, gameId);
      const infoSort = await auth.league.getWinner(usersInfo);
      console.log(infoSort);
      setWinnerInfo(infoSort.winner);
      setLoserInfo(infoSort.looser);
    }
  };

  // Gestion du player state
  const handlePlayerStateChange = async (myState, newState, GameState) => {
    //On récupère si le user est ready ou pas pour l'affichage
    if (GameState === "starting") {
      await setPlayerState({ myState: myState, newState: newState });
    }
    //On récupère le score des joueurs pour l'affichage
    else if (GameState === "playing") {
      console.log("Player state changed to", myState, newState);
      if (myState === true) {
        await setMyPlayerScore(newState);
      }
      else {
        await setOtherPlayerScore(newState);
      }
    }
  };

  //Leave game by queue click event handler
  const handleLeaveGameByQueueClick = async () => {
    // Handle the leave game by queue click event here
    await auth.league.leaveGame(discipline, gameId);
    window.location.href = "/ranked";
  };

  //Game ready click event handler
  const handleGameReadyClick = async () => {
    // Handle the game ready click event here
    await auth.league.playerReady(discipline, gameId);
  };


  /**GESTION DE L'ENVOIE DE LA REPONSE */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmitResponse(event);
    }
  };

  const handleChanges = (event) => {
    setResponse(event.target.value);
  };

  const handleSubmitResponse = async (event) => {
    //recuperer la value de l'input
    event.preventDefault();
    const inputMessage = response.trim();
    //On regarde si l'input est vide ou pas
    if (inputMessage == "") return;
    //On envoie la réponse
    const responsePush = await auth.league.sendResponse(discipline, gameId, inputMessage, 1);
    if (!responsePush) {
      console.log("Mauvaise réponse");
    }
    setResponse("");
  };


  // Récupération du game state en temps réel
  useEffect(() => {
    const unsubscribe = auth.league.onStateGame(discipline, gameId, handleGameStateChange);

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <MatchContainerWrapper>

      {/*AFFICHAGE DE L'ATTENTE D'UN JOUEUR */}
      <div id="waitingGame" className={gameState === "waiting" ? "mt-8" : "mt-8 hidden"}>
        <h2 className="text-2xl font-bold mb-4">En attente d'un joueur</h2>
        <p className="mb-4">
          Vous êtes en attente d'une partie de <span id="waitingGameDiscipline"></span>
        </p>
        <button
          id="leaveGameByQueue"
          className="py-2 px-4 bg-red-500 text-white rounded"
          onClick={handleLeaveGameByQueueClick}
        >
          Annuler
        </button>
      </div>

      {yourInfo && otherInfo && (
        <>
          {/*AFFICHAGE DU LOBBY */}
          <div id="startingGame" className={gameState === "starting" ? "mt-8 flex flex-col items-center" : "hidden"}>
            <div className="flex items-center mb-4">
              <div className="flex flex-col items-center">
                <img
                  src={yourInfo.photo}
                  alt="Your Photo"
                  id="yourPhotoStarting"
                  className={playerState.myState === true && playerState.newState === true ? "rounded-full h-12 w-12 mr-2 border-2 border-green-500" : "rounded-full h-12 w-12 mr-2 border-2"}
                />
                <h2 className="text-2xl font-bold" id="yourNameStarting">
                  {yourInfo.name}
                </h2>
              </div>
              <div className="flex flex-col items-center ml-4">
                <img
                  src={otherInfo.photo}
                  alt="Opponent's Photo"
                  id="otherPhotoStarting"
                  className={playerState.myState === false && playerState.newState === true ? "rounded-full h-12 w-12 mr-2 border-2 border-green-500" : "rounded-full h-12 w-12 mr-2 border-2"}
                />
                <h2 className="text-2xl font-bold" id="otherNameStarting">
                  {otherInfo.name}
                </h2>
              </div>
            </div>
            <div className="flex items-center">
              <button id="playerReady" className="py-2 px-4 bg-blue-500 text-white rounded" onClick={handleGameReadyClick}>
                Ready
              </button>
            </div>
          </div>


          {/*AFFICHE DE LA GAME */}
          <div id="playingGame" className={gameState === "playing" ? "mt-8 text-center" : "hidden mt-8 text-center"}>
            <div className="flex items-center mb-4">
              <div className="flex flex-col items-center">
                <img src={yourInfo.photo} alt="Your Photo" id="yourPhotoPlaying" className="rounded-full h-12 w-12 mr-2" />
                <h2 className="text-2xl font-bold" id="yourNamePlaying">
                  {yourInfo.name}
                </h2>
                <p id="yourScorePlaying">{myPlayerScore === null ? yourInfo.score : myPlayerScore}</p>
              </div>
              <div className="flex flex-col items-center ml-4">
                <img src={otherInfo.photo} alt="Opponent's Photo" id="otherPhotoPlaying" className="rounded-full h-12 w-12 mr-2" />
                <h2 className="text-2xl font-bold" id="otherNamePlaying">
                  {otherInfo.name}
                </h2>
                <p id="otherScorePlaying">{otherPlayerScore === null ? otherInfo.score : otherPlayerScore}</p>
              </div>
            </div>

            <form onSubmit={handleSubmitResponse} tw="flex items-center">
              <input
                type="text"
                placeholder="Votre réponse"
                value={response}
                onChange={handleChanges}
                onKeyDown={handleKeyDown}
                tw="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" tw="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                Envoyer
              </button>
            </form>
          </div>
        </>
      )}


      {/*AFFICHAGE DE LA FIN DE LA PARTIE */}
      {gameState === "finished" && (
        <div className="flex flex-col items-center" id="finishedGame">
          <div className="flex items-center mb-6">
            <img
              src={winnerInfo ? winnerInfo.photo : ""}
              alt="Photo du gagnant"
              id="winnerPhoto"
              className="rounded-full h-20 w-20"
            />
            <h2 className="text-green-500 text-2xl ml-4" id="winnerName">
              {winnerInfo ? winnerInfo.name : "Nom du gagnant"}
            </h2>
            <p className="ml-4">
              Score : <span id="winnerScore">{winnerInfo ? winnerInfo.score : "X"}</span>
            </p>
          </div>
          <div className="flex items-center">
            <img
              src={loserInfo ? loserInfo.photo : ""}
              alt="Photo du perdant"
              id="looserPhoto"
              className="rounded-full h-20 w-20"
            />
            <h2 className="text-red-500 text-2xl ml-4" id="looserName">
              {loserInfo ? loserInfo.name : "Nom du perdant"}
            </h2>
            <p className="ml-4">
              Score : <span id="looserScore">{loserInfo ? loserInfo.score : "Y"}</span>
            </p>
          </div>
          <button
            id="leaveGameByFinished"
            className="py-2 px-4 bg-red-500 text-white rounded mt-8"
            onClick={handleLeaveGameByQueueClick}
          >
            Quitter
          </button>
        </div>
      )}

    </MatchContainerWrapper>
  );
};

export default MatchContainer;
