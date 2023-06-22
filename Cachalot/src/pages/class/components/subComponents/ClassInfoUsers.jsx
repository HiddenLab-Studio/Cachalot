import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import tw from "twin.macro";
import "./../../styles/class.css"
import ClassInfoUser from "./ClassInfoUser";

// Styled components
const ClassInfoUsersWrapper = tw.div`flex flex-col space-y-4`;

const ClassInfoUsers = ({ auth }) => {

    const classId = window.location.pathname.split("/")[2];

    //Liste des utilisateurs
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState([]);
    

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const handleGetAllInfo = async () => {
        const allInfo = await auth.classes.getClassInfo(classId);
        if (allInfo.userInClass === true) {
            setAdmin(allInfo.dataAdmin);
            setUsers(allInfo.dataUsers);
        }else {
            window.location.href = "/profile";
        }

    };

    const handleClick = (event) => {
        const { clientX, clientY } = event;
        setPopupPosition({ x: clientX, y: clientY });
      };

    useEffect(() => {
        handleGetAllInfo();
        // Your useEffect logic here
    }, []);

    return (
        <ClassInfoUsersWrapper>
            {admin && (
                    <div className="fixed px-4 py-2 bg-white rounded-lg border-2 border-gray-300 shadow-md w-60 ">
                        <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }} className="text-md text-gray-800 font-semibold mb-2 pb-1 border-b-2">Professeur</h3>
                        <ul className="list-inside pb-2" id="adminList">
                            <div onClick={() => (setSelectedUserId(admin.uid), handleClick(event))} key={admin.username} className="flex items-center text-gray-800 rounded-lg space-x-2 py-1 hover:bg-gray-200 hover:shadow-md transition duration-200 transform hover:scale-105">
                                <div className="flex items-center pl-2">
                                    <img src={admin.photo} alt="Personne 1" className="w-8 h-8 rounded-full" />
                                </div>
                                <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="text-gray-800">{admin.displayName}</span>
                            </div>
                        </ul>
                        <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }} className="text-md text-gray-800 font-semibold mb-2 pb-1 border-b-2">Elèves</h3>
                        <ul className="list-inside py-1" id="eleveList">
                            {users.map((user) => (
                                <div onClick={() => (setSelectedUserId(user.id), handleClick(event))} key={user.username} className="flex items-center rounded-lg space-x-2 py-1 hover:bg-gray-200 hover:shadow-md transition duration-200 transform hover:scale-105 ">
                                    <div className="flex items-center pl-2">
                                        <img src={user.photo} alt="Personne 1" className="w-8 h-8 rounded-full" />
                                    </div>
                                    <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="text-gray-800">{user.displayName}</span>
                                </div>
                            ))}
                        </ul>
                    </div>
            )}
            <OutsideClickHandler onOutsideClick={() => setSelectedUserId(null)}>
                {selectedUserId != null && popupPosition != null && <ClassInfoUser auth={auth} userId={selectedUserId} admin={admin} position={popupPosition} />}
            </OutsideClickHandler>
        </ClassInfoUsersWrapper>

    );
};

export default ClassInfoUsers;
