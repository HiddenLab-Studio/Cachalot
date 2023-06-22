import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import tw from "twin.macro";
import "./../../styles/class.css"

// Styled components
const ClassInfoUserWrapper = tw.div`flex flex-col space-y-4`;

const ClassInfoUser = ({ auth, userId, admin, position }) => {

    const classId = window.location.pathname.split("/")[2];


    //Liste des utilisateurs
    const [userInfos, setUserInfos] = useState(null);
    const [myAdmin, setAdmin] = useState(null);
    const [professeur, setProfesseur] = useState(null);

    const [wantToExclure, setWantToExclure] = useState(false);

    //Click on exclure button

    const handleExclure = async () => {
        await auth.classes.deleteUser(classId, userId);
        setWantToExclure(false);
        window.location.reload();
    };

    const handleUserInfo = async (userId) => {
        const dataUser = await auth.classes.getUserInfo(userId, classId);

        setUserInfos(dataUser);
    };

    const handleGetAdmin = async () => {
        const dataAdmin = await auth.classes.myAdmin(admin.uid);
        setAdmin(dataAdmin);
    };

    const handleGetProfesseur = async () => {
        console.log(admin.uid === userId);
        userId === admin.uid ? setProfesseur(true) : setProfesseur(false);

    };

    useEffect(() => {
        handleUserInfo(userId);
        handleGetAdmin();
        handleGetProfesseur();
        console.log(position);
    }, []);


    return (

        <ClassInfoUserWrapper>
            {userInfos != null && myAdmin != null && professeur === true && (
                <>
                    <div className={`fixed rounded-lg overflow-hidden my-3 bg-gray-100 border-2 border-gray-300 shadow-md w-64`}
                        style={{ left: position.x, top: position.y }}>
                        <img
                            src="https://media1.giphy.com/media/13tLbNypHGL4Zy/giphy.gif?cid=ecf05e470agoo3aqznd5dq0cclwhyi7seevfueafqe50omnv&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                            className="w-full h-20 object-cover"
                        />
                        <div className="flex pl-2 -mt-10">
                            <img src={userInfos.photo} className="w-20 h-20 rounded-full border-solid border-gray-100 border-4" />
                        </div>
                        <div className="px-3 pb-3 pt-2">
                            <div className="rounded-lg bg-white">
                                <div className="text-left px-3 pb-3 pt-2">
                                    <div className="flex flex-col border-b-2 border-gray-100 pb-2">
                                        <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }} className="text-gray-800 text-sm font-semibold">{userInfos.displayName}</h3>
                                        <a style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "0.8rem" }} href={`/profile/${userInfos.username}`}>@{userInfos.username}</a>
                                    </div>
                                    <p style={{ fontFamily: "'DIN Round Pro Bold', sans-serif", fontSize: "0.9rem" }} className="mt-2 text-gray-600">Création de la classe </p>
                                    <p style={{ fontFamily: "'DIN Round Pro mdi', sans-serif", fontSize: "0.8rem" }} className="mt-2 text-gray-600">Le {userInfos.date} </p>
                                    <p style={{ fontFamily: "'DIN Round Pro Bold', sans-serif", fontSize: "0.9rem" }} className="mt-2 text-gray-600">Rôle </p>
                                    <p style={{ fontFamily: "'DIN Round Pro mdi', sans-serif", fontSize: "0.8rem" }} className="mt-2 text-gray-600">Enseignant(e)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}


            {userInfos != null && myAdmin != null && professeur === false && (
                <>

                    <div className={`fixed right-72 top-${position.y} rounded-lg overflow-hidden my-3 bg-gray-100 border-2 border-gray-300 shadow-md w-64`}
                        style={{ left: position.x, top: position.y }}>
                        <img
                            src="https://media2.giphy.com/media/jSuu6dQWhSEQE/giphy.gif?cid=ecf05e47wmlnruw2sdb70vs6xgyq4frxqk20ws39qtp2sxy2&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                            className="w-full h-20 object-cover"
                        />
                        <div className="flex pl-2 -mt-10">
                            <img src={userInfos.photo} className="w-20 h-20 rounded-full border-solid border-gray-100 border-4" />
                        </div>
                        <div className="px-3 pb-3 pt-2">
                            <div className="rounded-lg bg-white">
                                <div className="text-left px-3 pb-3 pt-2">
                                    <div className="flex flex-col border-b-2 border-gray-100 pb-2">
                                        <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }} className="text-gray-800 text-sm font-semibold">{userInfos.displayName}</h3>
                                        <a style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "0.8rem" }} href={`/profile/${userInfos.username}`}>@{userInfos.username}</a>
                                    </div>
                                    <p style={{ fontFamily: "'DIN Round Pro Bold', sans-serif", fontSize: "0.9rem" }} className="mt-2 text-gray-600">Membre depuis </p>
                                    <p style={{ fontFamily: "'DIN Round Pro mdi', sans-serif", fontSize: "0.8rem" }} className="mt-2 text-gray-600">Le {userInfos.dateJoin} </p>
                                    <p style={{ fontFamily: "'DIN Round Pro Bold', sans-serif", fontSize: "0.9rem" }} className="mt-2 text-gray-600">Rôle </p>
                                    <p style={{ fontFamily: "'DIN Round Pro mdi', sans-serif", fontSize: "0.8rem" }} className="mt-2 text-gray-600">Élève</p>
                                    <p style={{ fontFamily: "'DIN Round Pro Bold', sans-serif", fontSize: "0.9rem" }} className="mt-2 text-gray-600">Statistiques</p>
                                    <p style={{ fontFamily: "'DIN Round Pro ', sans-serif", fontSize: "0.9rem" }} className="mt-2 text-gray-600">{userInfos.exercises.exoDone > 1 ? `Exercices terminés : ${userInfos.exercises.exoDone}` : "Exercice terminé : 0"} </p>
                                    <p style={{ fontFamily: "'DIN Round Pro ', sans-serif", fontSize: "0.9rem" }} className="mt-2 text-gray-600">{userInfos.exercises.exoStarted != 0 ? `Pourcentage de réussite : ${userInfos.exercises.exoDone * 100 / userInfos.exercises.exoStarted} %` : "Pourcentage de réussite : 0%"}</p>
                                </div>
                                <div className={myAdmin === true && wantToExclure === false ? "py-2 px-2" : "hidden"}>
                                    <button style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1rem" }} onClick={() => setWantToExclure(true)} className="w-full bg-gray-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                                        Exclure
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={wantToExclure === true ? "z-40" : "hidden"}>
                            <div className="bg-gray-900 bg-opacity-50 z-30 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0">
                                <div className="flex flex-col items-center">
                                    <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1rem" }} className="text-white text-lg font-semibold mb-3">
                                        Êtes-vous sûr de vouloir exclure {userInfos.displayName} ?
                                    </h3>
                                    <div className="flex">
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1rem" }}
                                            onClick={() => setWantToExclure(false)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1rem" }}
                                            onClick={() => (handleExclure())}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                            Confirmer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ClassInfoUserWrapper>
    );
};

export default ClassInfoUser;
