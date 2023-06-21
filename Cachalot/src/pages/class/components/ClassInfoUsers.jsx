import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import "./../styles/class.css"

// Styled components
const ClassInfoUsersWrapper = tw.div`flex flex-col space-y-4`;

const ClassInfoUsers = ({ auth }) => {

    const classId = window.location.pathname.split("/")[2];

    //Liste des utilisateurs
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState([]);

    const [userInfos, setUserInfos] = useState([]);

    const handleGetAllInfo = async () => {
        const allInfo = await auth.classes.getClassInfo(classId);
        setAdmin(allInfo.dataAdmin);
        setUsers(allInfo.dataUsers);
    };

    const handleUserInfo = async(userId) => {
        const dataUser = await auth.classes.getUserInfo(userId, classId);
        setUserInfos(dataUser);
    };

    useEffect(() => {
        handleGetAllInfo();
        // Your useEffect logic here
    }, []);

    return (
        <ClassInfoUsersWrapper>
            {admin && (
                <>
                    <div className="fixed top-4 right-4 p-4 bg-white rounded-lg border-2 border-gray-300 shadow-md w-60">
                        <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }} className="text-md font-semibold mb-2">Professeur</h3>
                        <ul className="list-inside py-1" id="adminList">
                            <div onClick={() => handleUserInfo(admin.uid)} key={admin.username} className="flex items-center rounded-lg space-x-2 py-1 hover:bg-gray-200 hover:shadow-md">
                                <div className="flex items-center pl-2">
                                    <img src={admin.photo} alt="Personne 1" className="w-8 h-8 rounded-full" />
                                </div>
                                <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="text-gray-800">{admin.displayName}</span>
                            </div>
                        </ul>
                        <h3 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.2rem" }} className="text-md font-semibold mb-2">Elèves</h3>
                        <ul className="list-inside py-1" id="eleveList">
                            {users.map((user) => (
                                <div onClick={() => handleUserInfo(user.id)} key={user.username} className="flex items-center rounded-lg space-x-2 py-1 hover:bg-gray-200 hover:shadow-md ">
                                    <div className="flex items-center pl-2">
                                        <img src={user.photo} alt="Personne 1" className="w-8 h-8 rounded-full" />
                                    </div>
                                    <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="text-gray-800">{user.displayName}</span>
                                </div>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </ClassInfoUsersWrapper>
    );
};

export default ClassInfoUsers;
