import React, {useEffect, useRef, useState} from "react";
import tw, { styled } from "twin.macro";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 100ms ease-in-out;
  font-size: var(--fs-ss);
  padding: 0 16px;
  color: ${props => props.len === undefined ? props.theme.cachalotColor : props.len !== 0 ? props.theme.cachalotColor : props.theme.subText};
  background-color: ${props => props.len === undefined ? "unset" : props.len === 0 ? props.theme.buttonBgHover : "unset"};
  border: 2px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  width: calc(50% - 32px);
  height: 48px;
  outline: none;
  text-transform: uppercase;
  font-family: "Din_Round_Bold", sans-serif;

  &:hover {
    cursor: ${props => props.len === undefined ? "pointer" : props.len !== 0 ? "pointer" : "not-allowed"};
    background-color: ${props => props.theme.buttonBgHover};
  }
}`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: inherit;
  .cancelSvg {
    position: absolute;
    align-self: center;
    margin-right: 16px;
    font-size: var(--fs-sl);
    color: ${props => props.theme.iconColor};
    &:hover {
      cursor: pointer;
      color: ${props => props.theme.subText};
    }
  }
`

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 16px;
  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
    ${Button} {
      width: calc(100% - 64px);
    }
  }
`

// Icons
import { MdOutlineCancel } from "react-icons/md";

const ClassButton = ({auth}) => {
    // Hook
    const navigate = useNavigate();

    // State
    const [isLoading, setIsLoading] = useState(false);
    const [joinClassOverlay, setJoinClassOverlay] = useState(undefined);
    const [inputValue, setInputValue] = useState("");

    // Refs
    const inputRef = useRef(null);

    useEffect(() => {
        console.info("Rendering ClassButton.jsx...");
        document.addEventListener("keydown", handleKeyDown);
        setIsLoading(false);
        setInputValue("");

        return () => {
            console.info("Unmounting ClassButton");
            document.removeEventListener("keydown", handleKeyDown)
        };

    }, [joinClassOverlay]);

    async function handleClick() {
        if(!isLoading && inputRef.current.value.length > 0) {
            setIsLoading(true);
            if (!joinClassOverlay) {
                console.info("Create class with name: " + inputValue)
                let result = await auth.classes.createClass(inputValue);
                if (result.classCode !== undefined) {
                    console.info("Class created!")
                    navigate("/class/" + result.classCode);
                } else {
                    if(result.maxClassReached) inputRef.current.placeholder = "Nombre maximum de classes atteint !"
                    else inputRef.current.placeholder = "Nom de classe indisponible !"
                    setInputValue("");
                    inputRef.current.value = "";
                    inputRef.current.select();
                }
                setIsLoading(false);
            } else {
                console.info("Join class with code: " + inputValue)
                let result = await auth.classes.joinClass(inputValue);
                if (result.isJoined) {
                    console.info("Class joined!")
                    navigate("/class/" + inputValue);
                } else {
                    if(result.isAdmin || result.isAlreadyJoined ) inputRef.current.placeholder = "Vous êtes déjà dans cette classe !"
                    else inputRef.current.placeholder = "Code invalide !"
                    setInputValue("");
                    inputRef.current.value = "";
                    inputRef.current.select();
                }
                setIsLoading(false);
            }
        } else {
            //console.info("Invalid input value !")
        }
    }

    async function handleKeyDown(e) {
        if (e.key === "Enter" && inputRef.current !== null) {
            await handleClick();
        }
    }

    if(joinClassOverlay === undefined) {
        return (
            <ChoiceContainer>
                <Button onClick={() => setJoinClassOverlay(true)}>
                    <span>Rejoindre une classe</span>
                </Button>
                <Button onClick={() => setJoinClassOverlay(false)}>
                    <span>Créer une classe</span>
                </Button>
            </ChoiceContainer>
        )
    } else {
        return (
            <>
                <InputContainer>
                    <input ref={inputRef} type="text" placeholder={joinClassOverlay ? "Code de la classe" : "Nom de la classe"} autoFocus onChange={(e) => setInputValue(e.target.value)}/>
                    <MdOutlineCancel className="cancelSvg" onClick={() => setJoinClassOverlay(undefined)} />
                </InputContainer>
                <div tw="flex justify-center">
                    <Button len={inputValue.length} onClick={() => handleClick()}>
                        <span>
                            {
                                !isLoading ?
                                        joinClassOverlay ? "Rejoindre" : "Créer"
                                    :
                                        "Chargement..."
                            }
                        </span>
                    </Button>
                </div>
            </>

        )
    }
}

export default ClassButton;