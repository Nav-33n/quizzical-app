 import React from "react";

export default function Front(props) {
    return (
            <div className="content">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button className="start" onClick={props.toggle}>Start Quiz</button>
            </div>
    )
}