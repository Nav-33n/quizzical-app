import { nanoid } from "nanoid";

export default function Questions(props) {

  let answers = props.question.answers;

  function handleClick(answer) {
    if(props.question.checked) {
      return
    }
    props.handleClickAnswer(props.id, answer)
  }

  const answersElement = answers.map(answer => {
    let id = null
    if(props.question.checked){
    if(props.question.correct === answer){
      id = "correct"
    }
    else if(props.question.selected === answer) {
      id = "incorrect"
    }
    else {
      id = "not selected"
    }
  }

     return (
     <button key={nanoid()} id={id} className={props.checked ? answer === props.question.correct ? "choice select green" : answer === props.question.selected ? "choice select red" : "choice select blur" : answer === props.question.selected ? "choice select" : "choice"} onClick={() => handleClick(answer)}>
      {atob(answer)}
      </button> 
     )
  })
    return(
        <div className="question-field">
                <h1 className="question">{atob(props.question.question)}</h1>
                <div className="option-container">
                {answersElement}
                </div>
                <div className="underline"></div>
            </div>
    )
}