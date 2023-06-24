import React from "react";
import Front from "./Layout/Front";
import Questions from "./Layout/Questions";
import image1 from "./Images/blobB.png";
import image2 from "./Images/blobY.png";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {

    const [pages, setPage] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    const [correct, setCorrect] = React.useState(0);

    function toggle() {
        setPage(prevState => !prevState)
    }

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

    React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            const data = await res.json();
            let questions = []
            data.results.forEach(question => {
                questions.push({id: nanoid(), answers: shuffleArray([...question.incorrect_answers, question.correct_answer]), question: question.question, correct: question.correct_answer, selected: null, checked: false})
                })
                setData(questions)
        }
        getQuestions()
    }, [count])

    function handleCheck(){

        let selected = true;

        data.forEach(question => {
            if(question.selected === null){
                selected = false;
                return
            }
        })

        if(!selected) {
            return
        }
        setData(questions => questions.map(question => {
            return {...question, checked: true}
        }))
        setChecked(true)
        
        let correct = 0;
        data.forEach(question => {
            if(question.correct === question.selected){
                correct += 1
            }
        })
        setCorrect(correct)
    }

    function handleClickAnswer(id, answer) {
        setData(questions => questions.map(question =>{
          return question.id === id ? {...question, selected: answer} : question
        }))
      }

    function playAgain() {
        setCount(count => count + 1)
        setChecked(false)
    }

      const questionData = data.map((questData) => {
        return (
            <Questions 
            key={questData.id}
            question={questData}
            handleClickAnswer={handleClickAnswer}
            id={questData.id}
            checked={checked}
            />
        )
    })
    
    return(
            <div className="container">
            <div className="img-position1">
            <img src={image2} alt="blob" className="img1"></img>
            </div>
            {pages && <Front toggle={toggle}/>}
            {checked && correct === 5 ? <Confetti/> : null}
            {!pages && questionData}
            <div className={pages ? "img-position2" : "img-position22"}>
            <img src={image1} alt="blob" className="img2"></img>
            </div>
            {checked && <span className="score">{correct === 5 ? `Congratulations!! You scored ${correct}/5 answers` : `You scored ${correct}/5 answers`}</span>}
            {!pages && <button className={checked ? "check-answer" : "check-answer shift"} onClick={checked ? playAgain : handleCheck}>{checked ? "Play Again" : "Check Answers"}</button>}
        </div>
    )
}