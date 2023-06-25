import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import tw from "twin.macro";
import "./../../styles/class.css"

import ClassInfoUser from "./ClassInfoUser";

// Styled components
const ClassTitleWrapper = tw.div`flex flex-col space-y-4`;

const ClassTitle = ({ auth }) => {

    const [titleInput, setTitleInput] = useState(false);
    const [newClassName, setNewClassName] = useState("");
    const [badName, setBadName] = useState(false);
    const [myAdmin, setAdmin] = useState(null);

    const classId = window.location.pathname.split("/")[2];

    //Liste des utilisateurs
    const [ClassName, setClassName] = useState(null);

    const handleClassName = async () => {
        const dataClassName = await auth.classes.getClassName(classId);
        setClassName(dataClassName);
    };

    const handleGetAdmin = async () => {
        const dataAdmin = await auth.classes.myAdminWithClassId(classId);
        setAdmin(dataAdmin);
    };

    //Click sur entrer 
    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            if(newClassName === "" || newClassName.length > 19){
                console.log("bad name");
                handleAnimationBadName();
            }else{
                await auth.classes.updateClassName(classId, newClassName);
                window.location.reload();
            }
        }
    };

    const handleAnimationBadName = () => {
        setBadName(true);
        setTimeout(() => {
            setBadName(false);
        }, 2000);
    };
            

    const handleInputChange = (e) => {
        setNewClassName(e.target.value);
    };

    useEffect(() => {
        handleClassName();
        handleGetAdmin();
        // Your useEffect logic here
    }, []);

    return (
        <ClassTitleWrapper>
            {ClassTitle != null && myAdmin != null && (

                <div className="flex flex-row border-b-2 w-full">
                    <img src="../../../static/img/icons/class.png" className="pr-2" />
                    <div className="flex flex-row w-full items-center justify-between">
                        <h1 onClick={myAdmin === true ? () => setTitleInput(true) : console.log("rien")} style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "2rem" ,color:"#3c3c3c"}} className={`hover:text-gray-400 ${titleInput === true ? "hidden" : ""}`}>{ClassName}</h1>
                        <OutsideClickHandler onOutsideClick={() => setTitleInput(false)}>
                            <input
                                type="text"
                                className={titleInput === true ? (badName === false ? " w-4/6 border border-[#e5e5e5] rounded-lg bg-[#f7f7f7] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a78ff]" : "w-4/6 border border-red-500 rounded-lg bg-[#f7f7f7] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500") : "hidden"}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                value={newClassName}
                                placeholder={ClassName}
                                style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "2rem" }}
                            />
                        </OutsideClickHandler>
                        <span style={{ fontFamily: "'DIN Round Pro', sans'serif", fontSize: "0.9rem", fontStyle: "italic"}} className="text-gray-500 pl-2">#{classId}</span>
                    </div>
                </div>

            )}

        </ClassTitleWrapper>
    );
};

export default ClassTitle;
