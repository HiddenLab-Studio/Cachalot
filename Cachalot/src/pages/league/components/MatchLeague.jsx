import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import "./style/league.css";
import { user } from "../../../context/database/userFunctions";

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
  const [myWinner, setMyWinner] = useState(null);

  //Reponse de l'utilisateur
  const [exercise, setExercise] = useState(null);
  const [response, setResponse] = useState("");
  //Animation Bonne  rep
  const [myAnimation, setMyAnimation] = useState(false);
  const [otherAnimation, setOtherAnimation] = useState(false);
  //Mon animation mauvaise rep
  const [myBadAnimation, setMyBadAnimation] = useState(false);

  //rank
  const [ranked, setRanked] = useState(false);
  const [rankedIcon, setRankedIcon] = useState("");

  // Gestion du game state
  const handleGameStateChange = async (newState) => {

    if (ranked === false || rankedIcon === "") {
      handleRankChange(discipline);
    }
    console.log("Game state changed to", newState);
    setGameState(newState);
    // Si le game state est starting ou playing, on récupère les infos des joueurs pour l'affichage
    if (newState === "starting" || newState === "playing") {
      const usersInfo = await auth.league.getUsersInfo(discipline, gameId);
      if (usersInfo) {
        const infoSort = await auth.league.infoSort(usersInfo);
        setYourInfo(infoSort.myInfo);
        setOtherInfo(infoSort.otherInfo);

        console.log(infoSort.myInfo);
        const unsubscribe = auth.league.onStatePlayer(discipline, gameId, handlePlayerStateChange);
        return () => {
          unsubscribe();
        }
      }
    }
    // Si le game state est finished, on récupère les infos des joueurs pour l'affichage des gagnants et perdants
    if (newState === "finished") {
      const usersInfo = await auth.league.getUsersInfo(discipline, gameId);
      if (usersInfo) {
        const infoSort = await auth.league.infoSort(usersInfo);
        setMyPlayerScore(infoSort.myInfo.score);
        setOtherPlayerScore(infoSort.otherInfo.score);
        const winner = await auth.league.getWinner(discipline, gameId, usersInfo);
        console.log(winner);
        setMyWinner(winner);

      }
    }
  }


  // Gestion du player state
  const handlePlayerStateChange = async (myState, newState, GameState, exercise) => {
    //On récupère si le user est ready ou pas pour l'affichage
    if (GameState === "starting") {
      await setPlayerState({ myState: myState, newState: newState });
    }
    //On récupère le score des joueurs pour l'affichage
    else if (GameState === "playing") {
      if (myState === true) {
        await setExercise(exercise);
        await setMyPlayerScore(newState);
        handleResponseAnimation(myState);
      }
      else {
        await setOtherPlayerScore(newState);
        handleResponseAnimation(myState);
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

    let currentExercise = null;
    console.log(exercise);
    if (exercise === null) {
      currentExercise = yourInfo.exercise;
    }
    else {
      currentExercise = exercise;
    }
    console.log(currentExercise);

    //On envoie la réponse
    const responsePush = await auth.league.sendResponse(discipline, gameId, currentExercise, inputMessage, 1);
    if (!responsePush) {
      console.log("Mauvaise réponse");
      handleBadResponseAnimation();
    }
    setResponse("");
  };

  const handleResponseAnimation = (myState) => {
    if (myState === true) {
      setMyAnimation(true);
      setTimeout(() => {
        setMyAnimation(false);
      }, 1000);
    }
    else {
      setOtherAnimation(true);
      setTimeout(() => {
        setOtherAnimation(false);
      }, 1000);
    }
  };

  const handleBadResponseAnimation = () => {
    setMyBadAnimation(true);
    setTimeout(() => {
      setMyBadAnimation(false);
    }, 1000);
  };


  const handleRankChange = async (discipline) => {
    const ranked = await auth.league.getRank(discipline);
    setRanked(ranked.name);
    setRankedIcon(ranked.image);
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
      {/* AFFICHAGE DE L'ATTENTE D'UN JOUEUR */}
      <div id="waitingGame" className={gameState === "waiting" ? " mt-8 flex flex-row items-center justify-center h-screen" : "mt-8 hidden"}>
        <div className="flex flex-col items-center">
          <h2 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "2.5rem", color: "#3c3c3c" }} className="text-2xl mb-4">En attente d'un joueur</h2>
          <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.2rem", color: "#3c3c3c" }} className="mb-4 text-center">
            Vous êtes en attente d'une partie de {discipline === "french" ? "Français" : "Mathématiques"} <span id="waitingGameDiscipline"></span>
          </p>
          <button
            id="leaveGameByFinished"
            className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 rounded-lg w-1/2"
            onClick={handleLeaveGameByQueueClick}
            style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
          >
            Quitter

          </button>
        </div>

        <img src="../../../../static/img/gif/sommeil.gif" className="flex items-center w-1/5" />
      </div>

      {yourInfo && otherInfo && (
        <>
          {/*AFFICHAGE DU LOBBY */}
          <div
            id="startingGame"
            className={
              gameState === "starting"
                ? "mt-8 flex flex-col items-center justify-center min-h-screen"
                : "hidden"
            }
          >
            <div className="flex flex-row items-center border-b-4">

              <div className="px-10">
                <div className={
                  playerState.myState === true && playerState.newState === true
                    ? "mb-8 px-10 rounded-lg border-4 border-b-8 border-green-500 w-max-60 w-60"
                    : "mb-8 px-10 rounded-lg border-4  border-[#e5e5e5] border-b-8 w-max-60 w-60"
                }>
                  <div className="flex flex-col items-center py-3 ">
                    <img
                      src={yourInfo.photo}
                      alt="Your Photo"
                      id="yourPhotoStarting"
                      className="rounded-full h-20 w-20 mb-2 border-2"
                    />
                    <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} className="text-3xl font-bold" id="yourNameStarting">
                      {yourInfo.name.length > 10
                        ? yourInfo.name.slice(0, 10) + "..."
                        : yourInfo.name}
                    </h2>
                    <div className="flex flex-row justify-center py-2">
                      <img src={rankedIcon} className="w-10 h-10" alt="Ranked Icon" />
                      <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.4rem" }} className=" text-gray-700 text-center ">{ranked}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-10">
                <div className={
                  playerState.myState === false && playerState.newState === true
                    ? "mb-8 px-10 rounded-lg border-4 border-b-8 border-green-500 w-max-60 w-60"
                    : "mb-8 px-10 rounded-lg border-4 border-[#e5e5e5] border-b-8 w-max-60 w-60"
                }>
                  <div className="flex flex-col items-center py-3 ">
                    <img
                      src={otherInfo.photo}
                      alt="Your Photo"
                      id="yourPhotoStarting"
                      className="rounded-full h-20 w-20 mb-2 border-2"
                    />
                    <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} className="text-3xl font-bold" id="yourNameStarting">
                      {otherInfo.name.length > 10
                        ? otherInfo.name.slice(0, 10) + "..."
                        : otherInfo.name}
                    </h2>
                    <div className="flex flex-row justify-center py-2">
                      <img src={rankedIcon} className="w-10 h-10" alt="Ranked Icon" />
                      <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.4rem" }} className=" text-gray-700 text-center ">{ranked}</h2>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div className="flex justify-center items-center flex-row pt-4">
              <div className="px-2">
                <button
                  id="playerReady"
                  className={"bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 rounded-lg w-40"}
                  style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                  onClick={handleGameReadyClick}
                >
                  {playerState.myState === true && playerState.newState === true ? "Annuler" : "Prêt"}
                </button>
              </div>
              <div className="px-2">
                <button
                  id="leaveGameByFinished"
                  className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 rounded-lg w-40"
                  onClick={handleLeaveGameByQueueClick}
                  style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                >
                  Quitter

                </button>
              </div>
            </div>
          </div>




          {/*AFFICHE DE LA GAME */}
          <div
            id="playingGame"
            className={gameState === "playing" ? "flex flex-col items-center justify-center h-screen" : "hidden"}>
            <div className="flex flex-row items-center border-b-4">

              <div className="px-10">
                <div className={myBadAnimation === false ?
                  (myAnimation === false ?
                    "mb-8 px-10 rounded-lg border-4 border-4 border-[#e5e5e5] border-b-8 w-max-60 w-60" :
                    "mb-8 px-10 rounded-lg border-4 border-b-8 w-max-60 w-60 border-green-500") :
                  "mb-8 px-10 rounded-lg border-4 border-b-8 w-max-60 w-60 border-red-500"}
                >
                  <div className="flex flex-col items-center py-3 ">
                    <img
                      src={yourInfo.photo}
                      alt="Your Photo"
                      id="yourPhotoStarting"
                      className="rounded-full h-20 w-20 mb-2 border-2"
                    />
                    <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} className="text-3xl font-bold" id="yourNameStarting">
                      {yourInfo.name.length > 10
                        ? yourInfo.name.slice(0, 10) + "..."
                        : yourInfo.name}
                    </h2>
                    <div className="flex items-center py-2">
                      <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1rem" }} id="otherScorePlaying">{myPlayerScore === null ? yourInfo.score : myPlayerScore} / 10</p>
                    </div>
                  </div>
                </div>
              </div>




              <div className="px-10">
                <div className={otherAnimation === false ?
                  "mb-8 px-10 rounded-lg border-4 border-4 border-[#e5e5e5] border-b-8 w-max-60 w-60" :
                  "mb-8 px-10 rounded-lg border-4 border-b-8 w-max-60 w-60 border-green-500"}
                >
                  <div className="flex flex-col items-center py-3 ">
                    <img
                      src={otherInfo.photo}
                      alt="Your Photo"
                      id="yourPhotoStarting"
                      className="rounded-full h-20 w-20 mb-2 border-2"
                    />
                    <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} className="text-3xl font-bold" id="yourNameStarting">
                      {otherInfo.name.length > 10
                        ? otherInfo.name.slice(0, 10) + "..."
                        : otherInfo.name}
                    </h2>
                    <div className="flex items-center py-2">
                      <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1rem" }} id="otherScorePlaying">{otherPlayerScore === null ? otherInfo.score : otherPlayerScore} / 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className={discipline === "math" ? "flex items-center flex-col mb-4 pt-4" : "hidden"}>
              <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} id="exercise" className="text-2xl font-bold">
                Quel est le résultat de :
              </p>
              <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} id="exercise" className="text-2xl font-bold">
                {exercise === null ? yourInfo.exercise : exercise}
              </p>
            </div>

            <div className={discipline === "french" ? "flex items-center flex-col mb-4 pt-4" : "hidden"}>
              <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} id="exercise" className="text-2xl font-bold">
                Conjuguez le verbe au passé composé :
              </p>
              <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} id="exercise" className="text-2xl font-bold">
                {yourInfo.exercise.phrase}
              </p>
            </div>



            <form onSubmit={handleSubmitResponse} className="flex flex-col justify-center">
              <div className="flex flex-row items-center pb-4">
                <input
                  style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c" }}
                  type="text"
                  placeholder="Votre réponse"
                  value={response}
                  onChange={handleChanges}
                  onKeyDown={handleKeyDown}
                  className="flex-grow border border-[#e5e5e5] rounded-lg bg-[#f7f7f7] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a78ff]"
                />
              </div>

              <button style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} type="submit" className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 rounded-lg">
                Envoyer
              </button>
            </form>
          </div>

        </>
      )}


      {(myPlayerScore === 10 || otherPlayerScore) && myWinner != null && (
        <>
          {/*AFFICHAGE DE LA FIN DE LA PARTIE */}

          <div className={gameState === "finished" ? "flex flex-col items-center justify-center h-screen" : "hidden"} id="finishedGame">
            <div className="flex items-center mb-6">
              <div className="flex flex-row items-center border-b-4">

                <div className="px-10">
                  <h1 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.5rem" }} className={myWinner === true ? "text-3xl text-green-500 mb-4 " : "text-3xl text-red-500 mb-4"}> {myWinner === true ? "Gagnant" : "Perdant"} </h1>
                  <div className={myWinner === true ?
                    "mb-8 px-10 rounded-lg border-4 border-b-8 w-max-60 w-60 border-green-500" :
                    "mb-8 px-10 rounded-lg border-4 border-red-500 border-b-8 w-max-60 w-60"
                  }>
                    <div className="flex flex-col items-center py-3 ">
                      <img
                        src={yourInfo.photo}
                        alt="Your Photo"
                        id="yourPhotoStarting"
                        className="rounded-full h-20 w-20 mb-2 border-2"
                      />
                      <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} className="text-3xl font-bold" id="yourNameStarting">
                        {yourInfo.name.length > 10
                          ? yourInfo.name.slice(0, 10) + "..."
                          : yourInfo.name}
                      </h2>
                      <div className="flex items-center py-2">
                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1rem" }} id="otherScorePlaying">{myPlayerScore} / 10</p>
                      </div>
                    </div>
                  </div>
                </div>




                <div className="px-10">
                  <h1 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.5rem" }} className={myWinner === true ? "text-3xl text-red-500 mb-4 " : "text-3xl text-green-500 mb-4"}> {myWinner === true ? "Perdant" : "Gagnant"} </h1>

                  <div className={myWinner === false ?
                    "mb-8 px-10 rounded-lg border-4 border-b-8 w-max-60 w-60 border-green-500" :
                    "mb-8 px-10 rounded-lg border-4 border-red-500 border-b-8 w-max-60 w-60"}
                  >
                    <div className="flex flex-col items-center py-3 ">
                      <img
                        src={otherInfo.photo}
                        alt="Your Photo"
                        id="yourPhotoStarting"
                        className="rounded-full h-20 w-20 mb-2 border-2"
                      />
                      <h2 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1.5rem" }} className="text-3xl font-bold" id="yourNameStarting">
                        {otherInfo.name.length > 10
                          ? otherInfo.name.slice(0, 10) + "..."
                          : otherInfo.name}
                      </h2>
                      <div className="flex items-center py-2">
                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", color: "#3c3c3c", fontSize: "1rem" }} id="otherScorePlaying">{otherPlayerScore} / 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              id="leaveGameByFinished"
              className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 rounded-lg w-1/2"
              onClick={handleLeaveGameByQueueClick}
              style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
            >
              Quitter

            </button>

          </div>
        </>
      )}




    </MatchContainerWrapper>
  );
};

export default MatchContainer;
