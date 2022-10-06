import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import './styles.css';

function App() {

  const [question, setQuestion] = useState([])

  const getQuestion = async () => {
    try {
      const response = await fetch("https://jservice.io/api/random?count=1")
      const data = await response.json()
      setQuestion(data)
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

    return (
      <>
    <div className="App">

      <div id="intro">
      <h1 id="header">Welcome To Jeopardy!</h1>
      </div>

      <main className="mainText">Let's Play!<br />Click "Get Question" for a new question</main>
      <button id="randomButton" onClick={() => {
        getQuestion()
        const answerButton = document.getElementById('answerReveal')
        const showAnswer = document.getElementById("answerBox")
        answerButton.classList.remove('hidden')
        showAnswer.classList.add('hidden')
        console.log('random button clicked')
      }}>Get Question</button>

    <div id="mainGame">

      {question.map(question => (
        <div key={question.id}>

          <div id="questionArea">
          <p>
            <h2>Category:</h2><br />
            <span className="gameTitle">{question.category.title}</span>
            </p>
          
          <p>
            <h2>Score: <span className="gameTitle">0</span></h2><br />
              <button id="wrongAnswerButton" className='scoreButtons'>Decrease</button>
              <button id="correctAnswerButton" className='scoreButtons'>Increase</button>
              <button id="resetButton" className='scoreButtons'>Reset</button>
          </p>
          </div>

          <div id="questionBox">
          <p>
            <h4>Value: <span className="gameTitle">{question.value}</span></h4>
          </p>
          <div>{question.question}
          </div>

          <div id="answerReveal" onClick={() => {
            const answerButton = document.getElementById('answerReveal')
            const showAnswer = document.getElementById("answerBox")
            showAnswer.classList.remove('hidden')
            answerButton.classList.add('hidden')
            console.log('reveal was clicked')
          }}><h3>Reveal Answer</h3>
          </div>
          <div id="answerBox" className="hidden">
            <span id="answer">Answer:<br /> {question.answer}</span>
        </div>
      </div>

            <div class="winning-message" id="winningMessage">
    <div data-winning-message-text></div>
    <button id="restartButton">Restart</button>
  </div>  
      </div>))}
    </div>
    </div>
    </>
  );
}

export default App;