import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import tw, {styled} from "twin.macro";
import "./../../styles/class.css"
import ClassInfoUser from "./ClassInfoUser";
import {FaStar} from "react-icons/fa6";

// Styled components
const ElementContainer = styled.div`
  ${tw`flex flex-row items-center gap-[8px] p-[8px]`};
  transition: all 0.1s ease-in-out;
  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-sm);
    color: ${props => props.theme.text};
  }
  img {
    max-width: unset;
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.buttonBgHover};
    border-radius: 12px;
    transform: scale(1.025);
    transition: all 0.2s ease-in-out;
  }
`;
const ClassInfoUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 16px;
  
  h3 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-m);
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
  }
  
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }
  
`;

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
        <ClassInfoUsersContainer>
            {admin && (
                    <div className="">
                        <h3>Professeur</h3>
                        <ul tw="my-[12px]" id="adminList">
                            <ElementContainer onClick={() => (setSelectedUserId(admin.uid), handleClick(event))} key={admin.username}>
                                <img src={admin.photo} alt="Admin"/>
                                <span>{admin.displayName}</span>
                                <div tw="flex justify-end grow-[1] text-[#f1c40f]">
                                    <FaStar />
                                </div>
                            </ElementContainer>
                        </ul>
                        <h3>Élèves</h3>
                        <ul tw="mt-[12px]" id="eleveList">
                            {users.map((user) => (
                                <ElementContainer onClick={() => (setSelectedUserId(user.id), handleClick(event))} key={user.username}>
                                    <img src={user.photo} alt="Personne 1" className="w-8 h-8 rounded-full" />
                                    <span style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} className="text-gray-800">{user.displayName}</span>
                                </ElementContainer>
                            ))}
                        </ul>
                    </div>
            )}
            <OutsideClickHandler onOutsideClick={() => setSelectedUserId(null)}>
                {selectedUserId != null && popupPosition != null && <ClassInfoUser auth={auth} userId={selectedUserId} admin={admin} position={popupPosition} />}
            </OutsideClickHandler>
        </ClassInfoUsersContainer>

    );
};

export default ClassInfoUsers;
