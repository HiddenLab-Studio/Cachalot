import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import tw from "twin.macro";
import "./../../styles/class.css";

// Styled components
const ClassWorkWrapper = tw.div`flex flex-col space-y-4`;

const ClassWork = ({ auth }) => {
    const [myAdmin, setAdmin] = useState(null);
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [codeEnonce, setCodeEnonce] = useState("");
    const [userWorkData, setUserWorkData] = useState([]);

    const [errorCreateWork, setErrorCreateWork] = useState(false);
    const [goodCreateWork, setGoodCreateWork] = useState(false);

    const [allWorks, setAllWorks] = useState([]);

    const classId = window.location.pathname.split("/")[2];

    const handleGetAdmin = async () => {
        const dataAdmin = await auth.classes.myAdminWithClassId(classId);

        setAdmin(dataAdmin);
    };

    const handleCreateWork = async (event) => {
        event.preventDefault();
        if (titre === "" || description === "" || dateFin === "" || codeEnonce.length !== 4) {
            handleBadAnimation();

            return;
        }
        else {
            const result = await auth.classes.createWork(classId, titre, description, dateFin, codeEnonce);
            if (result === true) {
                setTitre("");
                setDescription("");
                setDateFin("");
                setCodeEnonce("");
                handleGoodAnimation();
            }
            else {
                handleBadAnimation();
            }
        }

    };

    const handleBadAnimation = () => {
        setErrorCreateWork(true);
        setTimeout(() => {
            setErrorCreateWork(false);
        }, 3000);
    };

    const handleGoodAnimation = () => {
        setGoodCreateWork(true);
        setTimeout(() => {
            setGoodCreateWork(false);
        }, 3000);
    };

    // const handleGetUsersWork = async (workId) => {
    //     const data = await auth.classes.getUsersWork(classId, workId);
    //     console.log(data);
    //     setUserWorkData(data);
    // };

    const convertToDate = (dateString) => {
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Les mois dans les objets Date sont indexés à partir de 0 (0 pour janvier, 1 pour février, etc.)
        const year = parseInt(parts[2], 10);
      
        return new Date(year, month, day);
    }

    useEffect(() => {

        const unsubscribe = auth.classes.getAllWorks(classId, (newWork, state) => {
            if (state === "added") {
                if (newWork.length === 0) return;
                if (allWorks.some((work) => work.id === newWork.id && work.nbrPlayersInGame === newWork.nbrPlayersInGame)) return;
                const date = newWork.date.split("-");
                newWork.date = `${date[2]}/${date[1]}/${date[0]}`;
                const dateFin = convertToDate(newWork.date);
                const CetteDate = convertToDate(new Date().toLocaleDateString('fr-FR'));
                if (dateFin < CetteDate) return;



                setAllWorks((prevWorks) => {
                    return [...prevWorks, newWork]

                });
            }
            if (state === "removed") {
                //suprimer le game de la liste
                setAllWorks((prevWorks) => {
                    return prevWorks.filter((work) => work.id !== newWork);
                })
            }

        });
        handleGetAdmin();
        // Your useEffect logic here
        return () => unsubscribe();

    }, []);

    return (
        <ClassWorkWrapper>


            {myAdmin != null && allWorks.length > 0 && (
                <>
                    <div className="flex flex-col">
                        <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem", color: "#3c3c3c" }} className="pr-2 pb-2">Devoirs</h3>
                        <div className="flex flex-row w-full justify-between border-2 border-[#e5e5e5] border-b-4 rounded-lg">
                            <div className="flex flex-col w-full px-2 py-2">
                                <div className="flex flex-row w-full">
                                    <div className="flex flex-col w-full">
                                        {allWorks.length > 0 && allWorks.map((work) => (
                                            <div key={work.id} className="pb-2">
                                                <div className="flex flex-col w-full">

                                                    <div className="flex flex-col w-full rounded-lg bg-white px-2">
                                                        <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.2rem", color: "#3c3c3c" }} className="text-gray-800">{work.date}</span>
                                                        <div className="flex flex-row justify-between rounded-lg bg-gray-100 px-2 py-2">
                                                            <div className="flex flex-col justify-center ">
                                                                <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1.1rem", color: "#3c3c3c" }} className="text-gray-800">{work.name}</span>
                                                                <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", color: "#3c3c3c" }} className="text-gray-800">{work.desc}</span>
                                                            </div>
                                                            <div className="flex flex-col justify-center">
                                                                <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem", color: "#3c3c3c" }} className="text-gray-800">#{work.exercisesCode}</span>
                                                                <div className="flex flex-col pr-4">

                                                                    <button
                                                                        id="leaveGameByFinished"
                                                                        className={myAdmin === false ? (work.exerciceDone === false ? "bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] px-4 rounded-lg w-full" : "hidden") : "bg-white border-2 border-[#e5e5e5] border-b-4 text-red-500 px-4 rounded-lg w-full"}
                                                                        onClick={myAdmin === false ? () => window.location.href = `/exercise/${work.exercisesCode}` : () => auth.classes.deleteWork(classId, work.id)}
                                                                        style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                                                                    >
                                                                        {myAdmin === false ? "Faire le devoir" : "Supprimer"}

                                                                    </button>

                                                                    {/* <button
                                                                        id="leaveGameByFinished"
                                                                        className={myAdmin === false ? "hidden" : "bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] px-4 rounded-lg w-full"}
                                                                        onClick={() => handleGetUsersWork(work.id)}
                                                                        style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                                                                    >
                                                                        Information

                                                                    </button> */}
                                                                    <img className={work.exerciceDone === true ? "w-6 h-6" : "hidden"} src="https://cdn-icons-png.flaticon.com/512/7799/7799536.png" />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )}
            {myAdmin === true && (
                <>
                    <div className="flex flex-col">
                        <h3
                            style={{
                                fontFamily: "'DIN Round Pro bold', sans-serif",
                                fontSize: "1.2rem",
                                color: "#3c3c3c"
                            }}
                            className="pr-2 pb-2"
                        >
                            Créer un devoir
                        </h3>
                        <div className="flex flex-row w-full justify-between border-2 border-[#e5e5e5] border-b-4 rounded-lg">
                            <div className="flex flex-col w-full px-2 py-2">
                                <div className="flex flex-row w-full">
                                    <form className="flex flex-col w-full">
                                        <span
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            className="text-gray-800"
                                        >
                                            Titre
                                        </span>
                                        <input
                                            type="text"
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            className="w-full h-[40px] rounded-lg border-2 border-[#e5e5e5] focus:outline-none focus:border-[#3c3c3c] px-2"
                                            value={titre}
                                            onChange={(e) => setTitre(e.target.value)}
                                        />
                                        <span
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            className="text-gray-800"
                                        >
                                            Description
                                        </span>
                                        <textarea
                                            type="text"
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            className="w-full h-[80px] max-h-[100px] rounded-lg border-2 border-[#e5e5e5] focus:outline-none focus:border-[#3c3c3c] px-2"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <span
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            className="text-gray-800"
                                        >
                                            Date de fin
                                        </span>
                                        <input
                                            type="date"
                                            className="w-full h-[40px] rounded-lg border-2 border-[#e5e5e5] focus:outline-none focus:border-[#3c3c3c] px-2"
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            value={dateFin}
                                            onChange={(e) => setDateFin(e.target.value)}
                                            // Ajouter l'attribut 'onFocus' pour formater la valeur lorsqu'elle est affichée
                                            onFocus={(e) => {
                                                const dateValue = new Date(e.target.value).toLocaleDateString('fr-FR');
                                                e.target.value = dateValue;
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            className="text-gray-800"
                                        >
                                            Code de l'énoncé
                                        </span>
                                        <input
                                            type="text"
                                            style={{
                                                fontFamily: "'DIN Round Pro medi', sans-serif",
                                                fontSize: "1rem",
                                                color: "#3c3c3c"
                                            }}
                                            className="w-full h-[40px] rounded-lg border-2 border-[#e5e5e5] focus:outline-none focus:border-[#3c3c3c] px-2"
                                            value={codeEnonce}
                                            onChange={(e) => setCodeEnonce(e.target.value)}
                                        />
                                        <div className="flex flex-row pt-2">
                                            <button
                                                className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 px-4 rounded-lg w-full"
                                                style={{
                                                    fontFamily: "'DIN Round Pro medi', sans-serif",
                                                    fontSize: "1rem"
                                                }}
                                                onClick={(event) => handleCreateWork(event)}
                                            >
                                                Création du devoir
                                            </button>
                                        </div>
                                        {(errorCreateWork === true || goodCreateWork === true) && (
                                            <div className="flex flex-row justify-center pt-2">
                                                <span
                                                    style={(errorCreateWork === true && goodCreateWork === false) ? {
                                                        fontFamily: "'DIN Round Pro medi', sans-serif",
                                                        fontSize: "0.8rem",
                                                        color: "#ff0000"
                                                    } :
                                                        {
                                                            fontFamily: "'DIN Round Pro medi', sans-serif",
                                                            fontSize: "0.8rem",
                                                            color: "#008000"
                                                        }
                                                    }
                                                >
                                                    {(errorCreateWork === true && goodCreateWork === false) ? "Veuillez bien remplir tous les champs" : "Devoir créé"}
                                                </span>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ClassWorkWrapper>
    );
};

export default ClassWork;
