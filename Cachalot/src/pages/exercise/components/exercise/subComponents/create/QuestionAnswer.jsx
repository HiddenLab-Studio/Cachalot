import {forwardRef, useImperativeHandle, useState} from "react";


const QuestionAnswer = forwardRef((props, ref) => {

    const [list, setList] = useState([]);

    useImperativeHandle(ref, () => ({
        getState: () => {
            return list;
        },
    }));

    if(props.exerciseFormat === "qcm"){
        return (
            <div ref={ref}>
                <h1>QuestionAnswer</h1>
                <button onClick={() => {
                    setList([...list, {question: "Votre question", answer: "Votre réponse"}])
                    console.log(list)
                }}>
                    add question
                </button>
                {
                    list.map( (element, index) => {
                        return (
                            <div key={index}>
                                <span>{element.question}</span>
                                <span>{element.answer}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div ref={ref}>
                <h1>QuestionAnswer</h1>
                <button onClick={() => {
                    setList([...list, {question: "Votre question", answer: ["Votre réponse"]}])
                    console.log(list)
                }}>
                    add question
                </button>
                {
                    list.map( (element, index) => {
                        return (
                            <div key={index}>
                                <span>{element.question}</span>
                                <span>{element.answer}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

});

export default QuestionAnswer;