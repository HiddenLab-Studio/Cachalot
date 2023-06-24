import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';

const JoinGameContainerWrapper = tw.div`flex flex-col space-y-4`;

function ClassJoinGameContainer({ auth }) {
    const classId = window.location.pathname.split('/')[2];

    const [allGames, setAllGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(0);

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


    useEffect(() => {
        const unsubscribe = auth.classes.getAllGames(classId, (NewGames) => {
            if (NewGames.length === 0) return;
            if (allGames.some((game) => game.id === NewGames.id && game.nbrPlayersInGame === NewGames.nbrPlayersInGame)) return;

            setAllGames((prevGames) => {
                console.log(NewGames);
                return [...prevGames, NewGames]

            });

        })

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <JoinGameContainerWrapper>
            {allGames.length > 0 && (
                <div className="flex flex-col pt-2 ">
                    <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }} className="pr-2 pb-2">
                        Rejoindre une partie
                    </h3>
                    <div className="flex flex-row w-full justify-between shadow-md border-2 rounded-lg">
                        <button
                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.5rem", textAlign: "center" }}
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

                                <div className='flex flex-row w-full py-3 justify-between bg-gray-200 rounded-lg  shadow-inner'>
                                    <div className="flex flex-col pl-2">
                                        <div className="flex flex-row items-center">
                                            <p style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.5rem" }} className='text-[#3c3c3c]'>{"Game " + (currentGame + 1)}</p>
                                            <p style={{ fontFamily: "'DIN Round Pro', sans-serif", fontSize: "0.9rem" }} className='text-[#3c3c3c] pl-2'>{"(" + allGames[currentGame].nbrPlayersInGame + "/" + allGames[currentGame].nbrPlayers + ")"}</p>
                                        </div>
                                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "0.9rem" }} className='text-[#3c3c3c]'>Niveau {allGames[currentGame].level}</p>
                                        <p style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "0.9rem" }} className='text-[#3c3c3c]'>{allGames[currentGame].nbrManches} points gagnant</p>


                                    </div>
                                    <div className="flex flex-col justify-center px-3">
                                        <button style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="hover:text-[#0a78ff] rounded-lg p-1 text-white" onClick={() => handleJoinGame("game" + (currentGame + 1))}>{allGames[currentGame].nbrPlayersInGame === allGames[currentGame].nbrPlayers ? "Regarder" : "Rejoindre" }</button>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <button
                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.5rem", textAlign: "center" }}
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
