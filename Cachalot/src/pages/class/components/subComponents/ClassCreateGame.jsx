import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';

const CreateGameContainerWrapper = tw.div`flex flex-col space-y-4`;

function ClassCreateGameContainer({ auth }) {
    const classId = window.location.pathname.split('/')[2];

    const [gameLevel, setGameLevel] = useState("CP");
    const [numPlayers, setNumPlayers] = useState(2);
    const [numRounds, setNumRounds] = useState(5);
    const [discipline, setDiscipline] = useState("french");

    const [errors, setErrors] = useState(false);
    const [gameCreated, setGameCreated] = useState(false);
    const [myAdmin, setMyAdmin] = useState(false);

    const handleGameLevelChange = (direction) => {
        event.preventDefault();
        const levels = ["CP", "CE1", "CE2", "CM1", "CM2", "ALL"];
        const currentIndex = levels.indexOf(gameLevel);
        console.log(currentIndex);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % levels.length;
        } else if (direction === 'previous') {
            newIndex = (currentIndex - 1 + levels.length) % levels.length;
        }

        setGameLevel(levels[newIndex]);
    };

    const handleDisciplineChange = (direction) => {

    event.preventDefault();
    const disciplineValue = ["french", "math"];
    const currentIndex = disciplineValue.indexOf(discipline);
    
    let newIndex;

    if (direction === 'next') {
        newIndex = (currentIndex + 1) % disciplineValue.length;
    } else if (direction === 'previous') {
        newIndex = (currentIndex - 1 + disciplineValue.length) % disciplineValue.length;
    }

    setDiscipline(disciplineValue[newIndex]);
};

    const handleNumPlayersChange = (direction) => {
        event.preventDefault();
        const minPlayers = 2;
        const maxPlayers = 10;

        if (direction === 'increase' && numPlayers < maxPlayers) {
            setNumPlayers(numPlayers + 1);
        } else if (direction === 'decrease' && numPlayers > minPlayers) {
            setNumPlayers(numPlayers - 1);
        }
    };

    const handleNumRoundsChange = (direction) => {
        event.preventDefault();
        const minRounds = 5;
        const maxRounds = 20;

        if (direction === 'increase' && numRounds < maxRounds) {
            setNumRounds(numRounds + 1);
        } else if (direction === 'decrease' && numRounds > minRounds) {
            setNumRounds(numRounds - 1);
        }
    };

    const handleCreateGame = async () => {
        event.preventDefault();
        const gameCreated = await auth.classes.createGame(classId, numPlayers, numRounds, gameLevel,discipline);
        if (gameCreated === true) {
            console.log('Game created');
            setGameCreated(true);
            handleGameCreated();
        } else {
            console.log('Too many games created');
            setErrors(true);
            handleErrors();
        }
    }

    const handleErrors = () => {
        setTimeout(() => {
            setErrors(false);
        }
            , 2000);
    }

    const handleGameCreated = () => {
        setTimeout(() => {
            setGameCreated(false);
        }
            , 2000);
    }

    const changeStateCreateGame = () => {
        event.preventDefault();
        setGameCreated(false);
        setErrors(false);
    }

    const handleMyAdmin = async () => {
        const myAdmin = await auth.classes.myAdminWithClassId(classId);
        setMyAdmin(myAdmin);
    }


    useEffect(() => {
        handleMyAdmin();
    }, []);





    return (
        <CreateGameContainerWrapper>
            {myAdmin === true && (
                <>
                    <div className="w-full border-2 border-gray-300 shadow-md rounded-lg">
                        <div className="flex px-2 flex-col justify-between items-center rounded-t-lg">
                            <div className="w-full pt-2 pb-1 border-b-2">
                                <h1 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }}>Céation d'une partie</h1>
                            </div>
                            <form className="flex flex-col w-full pb-2">
                                <div className="flex flex-row items-center pt-2">
                                    <h3 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="pr-2">Niveau de la partie:</h3>
                                    <div className="flex flex-row items-center shadow-md border-2 rounded-lg">
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }}
                                            className="p-1"
                                            onClick={() => handleGameLevelChange('previous')}
                                        >
                                            &lt;
                                        </button>
                                        <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", minWidth: "40px", textAlign: "center" }}>{gameLevel}</span>
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }}
                                            className="p-1"
                                            onClick={() => handleGameLevelChange('next')}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center pt-2">
                                    <h3 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="pr-2">Nombre de joueurs:</h3>
                                    <div className="flex flex-row items-center border-2 rounded-lg shadow-md">
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }}
                                            className="p-1"
                                            onClick={() => handleNumPlayersChange('decrease')}
                                        >
                                            &lt;
                                        </button>
                                        <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", minWidth: "40px", textAlign: "center" }}>{numPlayers}</span>
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }}
                                            className="p-1"
                                            onClick={() => handleNumPlayersChange('increase')}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center pt-2">
                                    <h3 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="pr-2">Nombre de manches:</h3>
                                    <div className="flex flex-row items-center border-2 rounded-lg shadow-md">
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }}
                                            className="p-1"
                                            onClick={() => handleNumRoundsChange('decrease')}
                                        >
                                            &lt;
                                        </button>
                                        <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", minWidth: "40px", textAlign: "center" }}>{numRounds}</span>
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }}
                                            className="p-1"
                                            onClick={() => handleNumRoundsChange('increase')}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>


                                <div className="flex flex-row items-center pt-2">
                                    <h3 style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="pr-2">Choix de la discipline:</h3>
                                    <div className="flex flex-row border-2 rounded-lg shadow-md">
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }} 
                                            className="p-1"
                                            onClick={() => handleDisciplineChange('previous')}
                                        >
                                            &lt;
                                        </button>
                                        <img src={`../../../../static/img/icons/${discipline}.png`} className=" w-9 h-9" />
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", textAlign: "center" }}
                                            className="p-1"
                                            onClick={() => handleDisciplineChange('next')}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>


                                <button className={`w-full shadow-md py-2 mt-2 ${errors === false && gameCreated === false ? "bg-[#0a78ff] text-white rounded-md hover:bg-blue-600" : "hidden"}`} style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} onClick={() => handleCreateGame()}>Création de la partie</button>
                                <button className={`w-full shadow-md py-2 mt-2 ${errors === false && gameCreated === false ? "hidden" : (errors === true && gameCreated === false ? "bg-red-500 text-white rounded-md hover:bg-red-600" : "bg-green-500 text-white rounded-md hover:bg-green-600")}`} style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} onClick={() => changeStateCreateGame()}>{errors === true && gameCreated === false ? "Trop de parties créées" : "Partie Créée"}</button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </CreateGameContainerWrapper>
    );
}

export default ClassCreateGameContainer;
