 import React from "react";

export default function Front(props) {
    return (
            <div className="content">
            <h1>Quizzical</h1>
            <p>Test your General knowledge by Quizzical</p>
            <button className="start" onClick={props.toggle}>Start Quiz</button>
            </div>
    )
}