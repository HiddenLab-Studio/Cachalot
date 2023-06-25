import React, {useEffect, useState} from 'react';
import tw, { styled } from "twin.macro";

// Components
import ClassCard from "../../../cards/ClassCard.jsx";
import PlainLoading from "../../loading/PlainLoading.jsx";
import ButtonCard from "../../../cards/ButtonCard.jsx";

// Styled Components
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
  gap: 16px;
  h1 {
    font-size: var(--fs-sm);
    font-family: "Din_Round_Bold", sans-serif;
    color: ${props => props.theme.text};
  }
  
  .no__class__found {
    display: flex;
    justify-content: center;
    span {
      font-size: var(--fs-s);
      font-family: "Din_Round_Med", sans-serif;
      color: ${props => props.theme.subText};
    }
  }
  
`;

const ClassPanel = ({auth}) => {
    // Context
    const userData = auth.userData;

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getUserClasses = async () => {
            const result = await auth.user.getUserClasses(auth.currentUser);
            //console.log(result)
            setClasses(result);
        }

        getUserClasses().then(() => {
            setIsLoading(false);
        });

    }, []);

    if(isLoading) {
        return <PlainLoading />
    } else {
        if(classes.length === 0) {
            return (
                <PanelContainer>
                    <div className="no__class__found">
                        <span>Vous n'êtes dans aucune classe !</span>
                    </div>
                    <div tw="flex justify-center w-[100%]">
                        <ButtonCard
                            title= "Créer ta classe"
                            desc= "Apprendre à plusieurs, c'est encore mieux !"
                            imageURL= "../../../../../static/img/icons/class.png"
                            link= "/class"
                            alt= "Join a class"
                        />
                    </div>
                </PanelContainer>
            )
        } else {
            return (
                <PanelContainer>
                    <GridContainer>
                        {
                            classes.map((classData, index) => {
                                return <ClassCard key={index} classData={classData} />
                            })
                        }
                    </GridContainer>
                    <div tw="flex justify-center">
                        <ButtonCard
                            title= "Rejoindre une classe"
                            desc= "Apprendre à plusieurs, c'est encore mieux !"
                            imageURL= "../../../../../static/img/icons/class.png"
                            link= "/class"
                            alt= "Join a class"
                        />
                    </div>
                </PanelContainer>
            )
        }
    }


}

export default ClassPanel;