import React, {useEffect, useState} from 'react';
import tw, { styled } from "twin.macro";
import ClassCard from "../../../cards/ClassCard.jsx";

const GridContainer = styled.div`
    display: grid;
  justify-content: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    width: 100%;
`;
const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: var(--fs-sm);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
  }
`;

const ClassPanel = ({auth}) => {
    // State
    const [classes, setClasses] = useState([]);
    const userData = auth.userData;

    useEffect(() => {
        const getUserClasses = async () => {
            const result = await auth.user.getUserClasses(auth.currentUser);
            console.log(result)
            setClasses(result);
        }

        getUserClasses();

    }, []);


    return (
        <PanelContainer>
            <GridContainer>
                {
                    classes.map((classData, index) => {
                        return <ClassCard key={index} classData={classData} />
                    })
                }

            </GridContainer>
        </PanelContainer>
    )
}

export default ClassPanel;