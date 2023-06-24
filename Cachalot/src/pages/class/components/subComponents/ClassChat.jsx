import React, {useEffect, useState} from "react";
import tw, {styled} from "twin.macro";
import moment from 'moment';
import "./../../styles/class.css"
import {BiSend} from "react-icons/bi";
import {BsSend} from "react-icons/bs";

// Styled components
const DisplayName = styled.a`
  color: ${props => props.isAuthor ? props.theme.cachalotColor : props.theme.text} !important;
`;
const Message = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow: hidden;
  word-break: break-word;
  background-color: ${props => props.isAuthor ? props.theme.cachalotColor : props.theme.borderRightColor};
  border-radius: 0 12px 12px 12px;
  margin: 0 24px 0 24px;
  padding: 12px;

  span {
    font-family: "Din_Round", sans-serif;
    font-size: var(--fs-s);
    color: ${props => props.isAuthor ? "white" : props.theme.text};
  }
`;
const MessageInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  img {
    max-width: unset;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  a {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-s);
    color: ${props => props.theme.text};
  }
  span {
    font-family: "Din_Round_Med", sans-serif;
    font-size: var(--fs-xs);
    color: ${props => props.theme.subText};
    margin-right: 12px;
  }
`;
const MessageContainer = styled.div`
  display: flex; 
  flex-direction: column;
  margin: 12px 0;
  gap: 6px;
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  max-height: 250px;
  overflow-y: auto;
`;
const ButtonSend = styled.button`
  position: absolute;
  right: 0;
  margin-right: 16px;
  color: ${props => props.theme.text};
  opacity: 0.6;
  font-size: var(--fs-sm);
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.25);
    transition: all 0.2s ease-in-out;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 32px;
  position: relative;
  input {
    width: 100%;
    padding: 8px 12px;
    background-color: ${props => props.theme.inputBg};
    border: 2px solid ${props => props.theme.borderRightColor};
    border-radius: 12px;
    outline: none;
    font-family: "Din_Round", sans-serif;
    color: ${props => props.theme.text};
  }
`;
const ChatContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 2px solid ${props => props.theme.borderRightColor};
  border-bottom: 4px solid ${props => props.theme.borderRightColor};
  border-radius: 12px;
  padding: 16px;
  h1 {
    font-family: "Din_Round_Bold", sans-serif;
    font-size: var(--fs-m);
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.borderRightColor};
  }
`;

const ClassChatContainer = ({auth}) => {
    const classId = window.location.pathname.split("/")[2];

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit(event);
        }
    };

    const handleChanges = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        //recuperer la value de l'input
        event.preventDefault();
        const inputMessage = message.trim();
        if (inputMessage == "") return;
        //envoyer le message
        await auth.chat.sendMessage(classId, inputMessage);
        //vider l'input
        setMessage("");

    };


    useEffect(() => {
        const unsubscribe = auth.chat.getMessage(classId, (newMessage) => {

            setMessages((prevMessages) => {
                const existingMessage = prevMessages.find((message) => message.id === newMessage.id);
                if (existingMessage) return prevMessages;

                const sortedMessages = [...prevMessages, newMessage].sort((a, b) => {
                    const dateA = moment(a.date, 'DD/MM/YYYY | HH:mm:ss');
                    const dateB = moment(b.date, 'DD/MM/YYYY | HH:mm:ss');
                    return dateA - dateB;
                });

                return sortedMessages;
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <ChatContainerWrapper>
            <div className="flex flex-col grow-[1] justify-end">
                <h1>Chat</h1>

                <ChatContainer>
                    {[...messages].reverse().map((message) => (
                        <MessageContainer key={message.id}>
                            <MessageInformation className="info">
                                <div tw="flex flex-row items-center gap-[8px] grow-[1]">
                                    <a href={`/profile/${message.username}`}>
                                        <img src={message.photo} />
                                    </a>
                                    <DisplayName isAuthor={auth.userData.username === message.username} href={`/profile/${message.username}`}>
                                        {message.displayName}
                                    </DisplayName>
                                </div>
                                <span>{message.date}</span>
                            </MessageInformation>
                            <Message isAuthor={auth.userData.username === message.username}>
                                <span>{message.message}</span>
                            </Message>
                        </MessageContainer>
                    ))}
                </ChatContainer>


                <Form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Votre message"
                        value={message}
                        onChange={handleChanges}
                        onKeyDown={handleKeyDown}
                    />

                    <ButtonSend type="submit">
                        <BsSend />
                    </ButtonSend>
                </Form>
            </div>
        </ChatContainerWrapper>
    );
};

export default ClassChatContainer;
