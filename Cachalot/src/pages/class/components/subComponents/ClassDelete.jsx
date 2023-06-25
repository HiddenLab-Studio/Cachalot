import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import tw from "twin.macro";
import "./../../styles/class.css"


// Styled components
const ClassDeleteWrapper = tw.div`flex flex-col space-y-4`;

const ClassDelete = ({ auth }) => {

    const [myAdmin, setAdmin] = useState(null);
    const [wantToDeleteClass, setWantToDeleteClass] = useState(false);

    const [wantToLeaveClass, setWantToLeaveClass] = useState(false);

    const classId = window.location.pathname.split("/")[2];


    const handleGetAdmin = async () => {
        const dataAdmin = await auth.classes.myAdminWithClassId(classId);
        setAdmin(dataAdmin);
    };

    const handleDeleteClass = async () => {
        const result = await auth.classes.deleteClass(classId);
        if (result === true) {
            window.location.href = "/profile";
        } else {
            alert("Une erreur est survenue");
        }
    };

    const handleLeaveClass = async () => {
        const result = await auth.classes.leaveClass(classId);
        if (result === true) {
            window.location.href = "/profile";
        } else {
            alert("Une erreur est survenue");
        }
    };




    useEffect(() => {

        handleGetAdmin();
        // Your useEffect logic here
    }, []);

    return (
        <ClassDeleteWrapper>
            {myAdmin === true && (
                <>
                    <button
                        id="leaveGameByFinished"
                        className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 rounded-lg w-full"
                        onClick={() => setWantToDeleteClass(true)}
                        style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                    >
                        Supprimer la classe

                    </button>
                    <div className={wantToDeleteClass === true ? "z-40" : "hidden"}>
                        <div className="bg-gray-900 bg-opacity-50 z-30 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0">
                            <div className="flex flex-col items-center">
                                <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1rem" }} className="text-white text-lg font-semibold mb-3">
                                    Êtes-vous sûr de vouloir supprimer la classe ?
                                </h3>
                                <div className="flex ">
                                    <div className="flex flex-col pr-4">
                                        <button
                                            id="leaveGameByFinished"
                                            className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 px-4 rounded-lg w-full"
                                            onClick={() => setWantToDeleteClass(false)}
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                                        >
                                            Annuler

                                        </button>
                                    </div>
                                    <button
                                        id="leaveGameByFinished"
                                        className="bg-white border-2 border-[#e5e5e5] border-b-4 text-red-500 py-2 px-4 rounded-lg w-full"
                                        onClick={() => handleDeleteClass()}
                                        style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                                    >
                                        Confirmer

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </>

            )}

            {myAdmin === false && (
                <>
                    <button
                        id="leaveGameByFinished"
                        className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 rounded-lg w-full"
                        onClick={() => setWantToLeaveClass(true)}
                        style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                    >
                        Quitter la classe

                    </button>
                    <div className={wantToLeaveClass === true ? "z-40" : "hidden"}>
                        <div className="bg-gray-900 bg-opacity-50 z-30 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0">
                            <div className="flex flex-col items-center">
                                <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1rem" }} className="text-white text-lg font-semibold mb-3">
                                    Êtes-vous sûr de vouloir quitter la classe ?
                                </h3>
                                <div className="flex ">
                                    <div className="flex flex-col pr-4">
                                        <button 
                                            id="leaveGameByFinished"
                                            className="bg-white border-2 border-[#e5e5e5] border-b-4 text-[#0a78ff] py-2 px-4 rounded-lg w-full"
                                            onClick={() => setWantToLeaveClass(false)}
                                            style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                                        >
                                            Annuler

                                        </button>
                                    </div>
                                    <button
                                        id="leaveGameByFinished"
                                        className="bg-white border-2 border-[#e5e5e5] border-b-4 text-red-500 py-2 px-4 rounded-lg w-full"
                                        onClick={() => handleLeaveClass()}
                                        style={{ fontFamily: "'DIN Round Pro medi', sans-serif" }}
                                    >
                                        Confirmer

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </>

            )}
        </ClassDeleteWrapper >
    );
};

export default ClassDelete;
