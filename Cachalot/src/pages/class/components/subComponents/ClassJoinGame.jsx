import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';

const JoinGameContainerWrapper = tw.div`flex flex-col space-y-4`;

function ClassJoinGameContainer({ auth }) {
    const classId = window.location.pathname.split('/')[2];

    const [allGames, setAllGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(0);
    const [myAdminGames, setMyAdminGames] = useState(null);

    const handleGameJoinChange = (direction) => {
        if (direction === 'previous') {
            setCurrentGame((prevGame) => (prevGame - 1 + allGames.length) % allGames.length);
        } else if (direction === 'next') {
            setCurrentGame((prevGame) => (prevGame + 1) % allGames.length);
        }
    };

    const handleJoinGame = async (gameId) => {
        let result = await auth.classes.joinGame(classId, gameId);
        console.log(result);
        if (result.result === true) {
            window.location.href = `/class/${classId}/${result.discipline}/${gameId}`;
        }
        else {
            window.location.href = `/class/${classId}/${result.discipline}/${gameId}`;
        }

    };

    const handleDeleteGame = async (gameId) => {
        await auth.classes.deleteGame(classId, gameId);
    };

    const handleGetMyAdminGames = async () => {
        let result = await auth.classes.myAdminWithClassId(classId);
        setMyAdminGames(result);
    };






    useEffect(() => {
        const unsubscribe = auth.classes.getAllGames(classId, (NewGames, stateGame) => {
            if (stateGame === "added") {
                if (NewGames.length === 0) return;
                if (allGames.some((game) => game.id === NewGames.id && game.nbrPlayersInGame === NewGames.nbrPlayersInGame)) return;


                setAllGames((prevGames) => {
                    console.log(NewGames);
                    return [...prevGames, NewGames]

                });
            }
            if (stateGame === "removed") {
                //suprimer le game de la liste
                setAllGames((prevGames) => {
                    return prevGames.filter((game) => game.id !== NewGames);
                })
            }
            if (stateGame === "modified") {
                setAllGames((prevGames) => {
                    return prevGames.map((game) => {
                        if (game.id === NewGames.id) {
                            return NewGames;
                        }
                        else {
                            return game;
                        }
                    })
                })
            }


        })
        handleGetMyAdminGames();

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <JoinGameContainerWrapper>
            {allGames.length > 0 && myAdminGames != null && (
                <div className="flex flex-col pt-2 bg-white ">
                    <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem", color: "#3c3c3c" }} className="pr-2 pb-2">
                        Rejoindre une partie
                    </h3>
                    <div className="flex flex-row w-full justify-between border-2 border-[#e5e5e5] border-b-4 rounded-lg">
                        <button
                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.5rem", textAlign: "center", color: "#3c3c3c" }}
                            className="p-1 hover:bg-gray-200"
                            onClick={() => handleGameJoinChange('previous')}
                        >
                            &lt;
                        </button>
                        <div className="flex flex-col w-full ronded-lg px-2 py-2 ">
                            <div className='flex flex-row items-center '>
                                <div className="flex items-center pr-3">
                                    <img src={`../../../../static/img/icons/${allGames[currentGame].discipline}.png`} className="w-20" />
                                </div>

                                <div className='flex flex-row w-full py-3 justify-between bg-gray-100 rounded-lg  shadow-inner'>
                                    <div className="flex flex-col pl-2">
                                        <div className="flex flex-row items-center">
                                            <p style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.5rem" }} className='text-[#3c3c3c]'>{"Game " + (allGames[currentGame].id)}</p>
                                            <p style={{ fontFamily: "'DIN Round Pro', sans-serif", fontSize: "0.9rem" }} className='text-[#3c3c3c] pl-2'>{"(" + allGames[currentGame].nbrCurrentPlayers + "/" + allGames[currentGame].nbrPlayers + ")"}</p>
                                        </div>
                                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "0.9rem" }} className='text-[#3c3c3c]'>Niveau {allGames[currentGame].level}</p>
                                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "0.9rem" }} className='text-[#3c3c3c]'>{allGames[currentGame].nbrManches} points gagnant</p>


                                    </div>
                                    <div className="flex flex-col justify-center px-3">
                                        <div  className={myAdminGames === true ? "pb-2" : ""}>
                                            <button style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 px-4 rounded-lg w-full" onClick={() => handleJoinGame(allGames[currentGame].id)}>{allGames[currentGame].nbrPlayersInGame === allGames[currentGame].nbrPlayers ? "Regarder" : "Rejoindre"}</button>
                                        </div>
                                        <button style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className={myAdminGames === true ? "bg-white border-2 border-[#e5e5e5] border-b-4 text-red-500 py-2 px-4 rounded-lg w-full" : "hidden"} onClick={() => handleDeleteGame(allGames[currentGame].id)}>{"Supprimer"}</button>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <button
                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.5rem", textAlign: "center", color: "#3c3c3c" }}
                            className="p-1 hover:bg-gray-200"
                            onClick={() => handleGameJoinChange('next')}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </JoinGameContainerWrapper>
    );
}

export default ClassJoinGameContainer;
