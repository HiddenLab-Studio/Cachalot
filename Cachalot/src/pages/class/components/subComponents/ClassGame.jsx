import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import moment from 'moment';
import "./../../styles/class.css"
import { connectStorageEmulator } from "firebase/storage";
import { all } from "axios";



// Styled components
const ClassGameContainerWrapper = tw.div`flex flex-col space-y-4`;

const ClassGameContainer = ({ auth }) => {

    const classId = window.location.pathname.split("/")[2];
    const gameId = window.location.pathname.split("/")[4];
    const discipline = window.location.pathname.split("/")[3];


    // GAME STATE   
    const [gameState, setGameState] = useState("");

    //GET INFO USERS
    const [myUser, setMyUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [userWatching, setUserWatching] = useState(false);
    const [numManche, setNumManche] = useState(0);

    //Player State
    const [usersState, setUsersState] = useState([]);
    const [usersScore, setUsersScore] = useState([]);
    const [exercise, setExercise] = useState(null);

    //SEND RESPONSE
    const [response, setResponse] = useState("");

    //ANIMATION
    const [animation, setAnimation] = useState([]);
    const [badAnimation, setBadAnimation] = useState([]);

    const [classement, setClassement] = useState([]);


    // GAME STATE
    const handleGameStateChange = async (newState, nbrManche) => {
        setGameState(newState);
        setNumManche(nbrManche);

        if (newState === "starting" || newState === "playing" || newState === "finished") {
            await handleGetAllUsers();
            const unsubscribe = await auth.classes.onStatePlayer(discipline, classId, gameId, handleUserSateChange);
            // Clean up the subscription when the component unmounts

            if (newState === "finished") {
                await handleGetClassement();
            }
            return () => {
                unsubscribe();
            };


        }
    };

    const handleUserSateChange = async (idChange, newState, stateGame, exercise, myUserChange) => {
        //On récupère si le user est ready ou pas pour l'affichage
        if (stateGame === "starting") {
            await setUsersState(prevState => ({
                ...prevState,
                [idChange]: newState
            }));

        }
        if (stateGame === "playing") {
            if (myUserChange === true) {
                console.log("exercise", exercise);
                await setExercise(exercise);
            }
            await setUsersScore(prevState => ({
                ...prevState,
                [idChange]: newState
            }));
            handleResponseAnimation(idChange);

        }
    };

    const handleGameReadyClick = async () => {
        const result = await auth.classes.setPlayerReady(classId, gameId, myUser.id, !usersState[myUser.id]);
        if (result === true) {
            console.log("ok");
        } else {
            console.log("error");
        }
    };

    const handleLeaveGame = async () => {
        const result = await auth.classes.leaveGame(classId, gameId);
        if (result === true) {
            window.location.href = `/class/${classId}`;
        } else {
            console.log("error");
        }
    };

    const handleGetAllUsers = async () => {
        const result = await auth.classes.getAllUsersInGame(classId, gameId);
        setMyUser(result.myUserInfo);
        setAllUsers(result.usersInfo);
        setUserWatching(result.userWatching);

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
            currentExercise = myUser.exercise;
        }
        else {
            currentExercise = exercise;
        }
        console.log(currentExercise);

        //On envoie la réponse
        const responsePush = await auth.classes.sendResponse(classId, gameId, currentExercise, inputMessage, 1);
        if (!responsePush) {
            console.log("Mauvaise réponse");
            handleBadResponseAnimation();
        }
        setResponse("");
    };

    const handleResponseAnimation = (id) => {
        setAnimation(prevAnim => ({
            ...prevAnim,
            [id]: true
        }));
        setTimeout(() => {
            setAnimation(prevAnim => ({
                ...prevAnim,
                [id]: false
            }));
        }, 1000);
    };

    const handleBadResponseAnimation = () => {
        setBadAnimation(prevAnim => ({
            ...prevAnim,
            [myUser.id]: true
        }));
        setTimeout(() => {
            setBadAnimation(prevAnim => ({
                ...prevAnim,
                [myUser.id]: false
            }));
        }, 1000);
    };

    const handleGetClassement = async () => {
        const result = await auth.classes.getClassement(classId, gameId);
        setClassement(result);
    };



    useEffect(() => {
        const unsubscribe = auth.classes.onStateGame(discipline, gameId, classId, handleGameStateChange);
        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe();
        };

    }, []);


    return (
        <ClassGameContainerWrapper>


            {gameState === "waiting" && (
                <div id="waitingGame" className=" mt-8 flex flex-row items-center justify-center h-screen">
                    <div className="flex flex-col items-center">
                        <h2 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "2.5rem" }} className="text-2xl mb-4">En attente d'un joueur</h2>
                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.2rem" }} className="mb-4 text-center">
                            Vous êtes en attente d'une partie de {discipline === "french" ? "Français" : "Mathématiques"} <span id="waitingGameDiscipline"></span>
                        </p>
                        <button
                            id="leaveGameByQueue"
                            className="py-2 px-4 bg-red-500 text-white rounded"
                            onClick={handleLeaveGame}
                        >
                            Annuler
                        </button>
                    </div>

                    <img src="../../../../static/img/gif/sommeil.gif" className="flex items-center w-1/5" />
                </div>
            )}
            {gameState === "starting" && allUsers.length > 0 && myUser && (
                <div id="startingGame" className="mt-8 flex flex-col items-center justify-center min-h-screen">
                    <h1 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", }} className={userWatching === true ? "fixed top-0" : "hidden"}>Spectateur</h1>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-center">
                                {allUsers.map(user => user && (
                                    <div key={user.id} className="px-10">
                                        <div className={usersState[user.id] === true
                                            ? "mb-8 px-10 rounded-lg border-4 border-green-500"
                                            : "mb-8 px-10 rounded-lg border-4 border-gray-200 shadow-md"}>
                                            <div className="flex flex-col items-center py-3 ">
                                                <img
                                                    src={user.photo}
                                                    alt={`${user.displayName} Photo`}
                                                    className="rounded-full h-20 w-20 mb-2 border-2"
                                                />
                                                <h2 className="text-3xl font-bold">
                                                    {user.displayName}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                            <div className={userWatching === false ? "px-10" : "hidden"}>
                                <div className={
                                    usersState[myUser.id] === true
                                        ? "mb-8 px-10 rounded-lg border-4 border-green-500 "
                                        : "mb-8 px-10 rounded-lg border-4 border-gray-200 shadow-md"
                                }>
                                    <div className="flex flex-col items-center py-3 ">
                                        <img
                                            src={myUser.photo}
                                            alt="Your Photo"
                                            id="yourPhotoStarting"
                                            className="rounded-full h-20 w-20 mb-2 border-2"
                                        />
                                        <h2 className="text-3xl font-bold" id="yourNameStarting">
                                            {myUser.displayName}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={userWatching === false ? "flex justify-center items-center flex-row" : "hidden"}>
                            <div className=" flex flex-col pr-2 ">
                                <button
                                    id="playerReady"
                                    className={usersState[myUser.id] === true ? "py-3 px-6 bg-red-500 text-white rounded" : "py-3 px-6 bg-green-500 text-white rounded"}
                                    onClick={handleGameReadyClick}
                                >
                                    {usersState[myUser.id] ? "Annuler" : "Prêt"}
                                </button>
                            </div>
                            <button
                                id="leaveGameByStarting"
                                className="py-3 px-6 bg-red-500 text-white rounded"
                                onClick={handleLeaveGame}
                            >
                                Quitter
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {gameState === "playing" && allUsers.length > 0 && myUser != {} && numManche != 0 && (
                <div
                    id="playingGame"
                    className="flex flex-col items-center justify-center h-screen">
                    <h1 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", }} className={userWatching === true ? "fixed top-0" : "hidden"}>Spectateur</h1>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center">
                            {allUsers.map(user => user && (
                                <div key={user.id} className="px-10">
                                    <div className={animation[user.id] === true ? "mb-8 px-10 rounded-lg border-4 border-green-500" : "mb-8 px-10 rounded-lg border-4 border-gray-200 shadow-md"}>
                                        <div className="flex flex-col items-center py-3 ">
                                            <img
                                                src={user.photo}
                                                alt="Your Photo"
                                                id="yourPhotoStarting"
                                                className="rounded-full h-20 w-20 mb-2 border-2"
                                            />
                                            <h2 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", }} className="text-3xl font-bold" id="yourNameStarting">
                                                {user.displayName}
                                            </h2>
                                            <div className="flex items-center py-2">
                                                <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} id="otherScorePlaying">{usersScore[user.id] != undefined ? usersScore[user.id] + "/" + numManche : user.score + "/" + numManche} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={userWatching === false ? "px-10" : "hidden"}>
                            <div className={badAnimation[myUser.id] === true ? "mb-8 px-10 rounded-lg border-4 border-red-500" : (animation[myUser.id] === true ? "mb-8 px-10 rounded-lg border-4 border-green-500" : "mb-8 px-10 rounded-lg border-4 border-gray-200 shadow-md")}>
                                <div className="flex flex-col items-center py-3 ">
                                    <img
                                        src={myUser.photo}
                                        alt="Your Photo"
                                        id="yourPhotoStarting"
                                        className="rounded-full h-20 w-20 mb-2 border-2"
                                    />
                                    <h2 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", }} className="text-3xl font-bold" id="yourNameStarting">
                                        {myUser.displayName}
                                    </h2>
                                    <div className="flex items-center py-2">
                                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} id="otherScorePlaying">{usersScore[myUser.id] != undefined ? usersScore[myUser.id] + "/" + numManche : myUser.score + "/" + numManche}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={userWatching === false ? "" : "hidden"}>
                            <div className="flex items-center flex-col mb-4">
                                <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} id="exercise" className="text-2xl font-bold">
                                    Quel est le résultat de :
                                </p>
                                <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} id="exercise" className="text-2xl font-bold">
                                    {exercise === null ? myUser.exercise : exercise}
                                </p>
                            </div>



                            <form onSubmit={handleSubmitResponse} className="flex items-center">
                                <input
                                    style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }}
                                    type="text"
                                    value={response}
                                    onChange={handleChanges}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Votre réponse"
                                    className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} type="submit" className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                                    Envoyer
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            )}

            {gameState === "finished" && allUsers.length > 0 && myUser != {} && numManche != 0 && classement.length > 0 && (

                <div className="flex flex-col items-center justify-center h-screen" id="finishedGame">
                    <h1 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", }} className={userWatching === true ? "fixed top-0" : "hidden"}>Spectateur</h1>
                    <div className="flex items-center mb-6">
                        <div className="flex flex-row items-center">

                            {classement.map((user, index) => (
                                <div key={user.id} className="px-10">
                                    <div className={index === 0 ? "mb-8 px-10 rounded-lg border-4 border-[#ffd700]" : (index === 1 ? "mb-8 px-10 rounded-lg border-4 border-[#c0c0c0] shadow-md" : (index === 2 ? "mb-8 px-10 rounded-lg border-4 border-[#C49C48] shadow-md" : "mb-8 px-10 rounded-lg border-4 border-gray-200 shadow-md"))}>
                                        <div className="flex flex-col items-center py-3 ">
                                            <img
                                                src={user.photo}
                                                alt="Your Photo"
                                                id="yourPhotoStarting"
                                                className="rounded-full h-20 w-20 mb-2 border-2"
                                            />
                                            <h2 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", }} className="text-3xl font-bold" id="yourNameStarting">
                                                {user.displayName}
                                            </h2>
                                            <div className="flex items-center py-2">
                                                <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} id="otherScorePlaying">{user.score + "/" + numManche}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h1 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", }} className={classement[0].id === myUser.id ? "text-3xl text-[#ffd700] mb-4" : (classement[1].id === myUser.id ? "text-3xl text-[#c0c0c0] mb-4" : (classement[2].id === myUser.id ? "text-3xl text-[#C49C48] mb-4" : "text-3xl text-gray-200 mb-4"))}> {
                        classement[0].id === myUser.id ? "Bravo vous avez gagné !" : (classement[1].id === myUser.id ? "Vous êtes deuxième !" : (classement[2].id === myUser.id ? "Vous êtes troisième !" : "Vous avez perdu !"))
                    } </h1>
                    <button
                        id="leaveGameByFinished"
                        className="py-2 px-4 bg-red-500 text-white rounded mt-8"
                        onClick={handleLeaveGame}
                        style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                    >
                        Quitter
                    </button>

                </div>
            )}


        </ClassGameContainerWrapper>
    );
};

export default ClassGameContainer;
