import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import tw from "twin.macro";
import "./../../styles/class.css"
import ClassInfoUser from "./ClassInfoUser";

// Styled components
const ClassTitleWrapper = tw.div`flex flex-col space-y-4`;

const ClassTitle = ({ auth }) => {

    const classId = window.location.pathname.split("/")[2];

    //Liste des utilisateurs
    const [ClassName, setClassName] = useState(null);

    const handleClassName = async () => {
        const dataClassName = await auth.classes.getClassName(classId);
        setClassName(dataClassName);
    };

    useEffect(() => {
        handleClassName();
        // Your useEffect logic here
    }, []);

    return (
        <ClassTitleWrapper>
            {ClassTitle != null && (

                <div className="flex flex-row border-b-2 w-full">
                    <img src="../../../static/img/icons/class.png" className="w-1/3 pr-2" />
                    <h1 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "2rem" }} className="">{ClassName}</h1>
                </div>

            )}

        </ClassTitleWrapper>
    );
};

export default ClassTitle;
