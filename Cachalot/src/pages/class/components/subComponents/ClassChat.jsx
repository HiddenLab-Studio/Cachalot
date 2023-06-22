import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import moment from 'moment';
import "./../../styles/class.css"



// Styled components
const ChatContainerWrapper = tw.div`flex flex-col space-y-4`;

const ClassChatContainer = ({ auth }) => {

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
            <div className="fixed items-center bg-white rounded-lg shadow-md px-4 border-2 border-gray-300">
                <h1 style={{ fontFamily: "'DIN Round Pro bold', sans-serif", fontSize: "1.4rem" }} className="text-2xl font-bold text-gray-800 mb-4 pt-2 pb-2 border-b-2">Chat</h1>

                <div className="max-h-40 overflow-y-auto h-40 pb-2 flex flex-col-reverse">
                    {[...messages].reverse().map((message) => (
                        <div
                            key={message.id}
                            className="flex items-center space-x-2  md:flex-row rounded"
                        >
                            <a href={`/profile/${message.username}`} className="rounded-full hover:shadow-md">
                                <img src={message.photo} className="w-8 h-8 rounded-full" />
                            </a>
                            <div className="text-gray-800">
                                <a style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "1rem" }} href={`/profile/${message.username}`} className={`font-bold hover:underline ${message.me ? "text-green-500" : "text-gray-800"}`}>
                                    {message.displayName}
                                </a>
                                <span style={{ fontFamily: "'DIN Round Pro', sans-serif", fontSize: "0.7rem" }} className="text-gray-400 text-xs px-2">{message.date}</span>
                                <span style={{ fontFamily: "'DIN Round Pro', sans-serif", fontSize: "0.9rem" }} className="block">{message.message}</span>
                            </div>
                        </div>
                    ))}
                </div>


                <form onSubmit={handleSubmit} tw="flex items-center pb-2">
                    <input
                        type="text"
                        placeholder="Votre message"
                        value={message}
                        onChange={handleChanges}
                        onKeyDown={handleKeyDown}
                        tw="flex-grow border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ fontFamily: "'DIN Round Pro', sans-serif", fontSize: "0.9rem" }}
                    />
                    <button style={{ fontFamily: "'DIN Round Pro medi', sans-serif", fontSize: "0.9rem" }} type="submit" tw="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Envoyer
                    </button>
                </form>
            </div>

        </ChatContainerWrapper>
    );
};

export default ClassChatContainer;
