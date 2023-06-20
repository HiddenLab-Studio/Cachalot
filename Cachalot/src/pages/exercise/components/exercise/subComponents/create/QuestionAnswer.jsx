import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {QuestionAnswerContainer} from "./style/QuestionAnswerStyle.js";

import tw from "twin.macro";

const QuestionComponent = forwardRef((props, ref) => {

    const [question, setQuestion] = useState(props.list !== null ? props.list.question : "");
    const [answers, setAnswers] = useState(
        props.list !== null ? props.list.answers :
        [
            { text: "", isValid: true },
            { text: "", isValid: false },
            { text: "", isValid: false },
            { text: "", isValid: false },
        ]
    );

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };
    const handleAnswerChange = (event, index) => {
        const newAnswers = [...answers];
        newAnswers[index].text = event.target.value;
        setAnswers(newAnswers);
    };
    const toggleAnswerValidity = (index) => {
        const newAnswers = [...answers];
        newAnswers[index].isValid = !newAnswers[index].isValid;
        setAnswers(newAnswers);
    };

    const handleAddAnswer = () => {
        if (answers.length < 5) {
            setAnswers([...answers, { text: '', isValid: false }]);
        }
    };
    const handleRemoveAnswer = (index) => {
        if (answers.length > 2) {
            const newAnswers = [...answers];
            newAnswers.splice(index, 1);
            setAnswers(newAnswers);
        }
    };

    useImperativeHandle(ref, () => ({
        getState: () => {
            return {
                question: question,
                answers: answers,
            };
        }
    }));

    return (
        <QuestionAnswerContainer ref={ref}>
            <div className="question">
                <label>Énoncé</label>
                <input className="input" type="text" value={question} placeholder="Insérer une question" onChange={handleQuestionChange} />
            </div>
            {answers.map((answer, index) => (
                <div className="map__container" key={index}>
                    <div className="answer">
                        <label>Réponse</label>
                        <div tw="flex flex-row w-[100%] relative">
                            <input
                                className="input"
                                type="text"
                                value={answer.text}
                                placeholder="Insérer une réponse"
                                onChange={(event) => handleAnswerChange(event, index)}
                            />
                            <input
                                tw="absolute self-center right-0 translate-x-[-20px]"
                                type="checkbox"
                                checked={answer.isValid}
                                placeholder="Insérer une réponse"
                                onChange={() => toggleAnswerValidity(index)}
                            />
                        </div>
                    </div>

                    {answers.length > 2 && (
                        <div>
                            <FaMinusCircle onClick={() => handleRemoveAnswer(index)}>Supprimer</FaMinusCircle>
                        </div>
                    )}
                </div>
            ))}
            {answers.length < 5 && (
                <div className="add__container" onClick={handleAddAnswer}>
                    <FaPlusCircle />
                </div>
            )}
        </QuestionAnswerContainer>
    );
});

export default QuestionComponent;