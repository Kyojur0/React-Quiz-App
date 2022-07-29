import React, { useState } from 'react';
// Components 
import QuestionCard from './components/QuestionCart';
// Get the API data 
import { fetchQuizQuestion } from './API';
// fetch types for questions 
import { Mode, QuestionField, choice, QuestionState } from './API';
import { setSourceMapRange } from 'typescript';
// Styles 
import { GlobalStyle, Wrapper } from './App.styles';
import Background  from './images/bg-image-3.jpg';



const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const App: React.FC = () => {

  // defining the states of our application
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia =async () => {
    console.log("is this function executing ?");
    setLoading(true);
    setGameOver(false);

    console.log("fuck you react");

    const newQuestion = await fetchQuizQuestion(
      TOTAL_QUESTIONS, 
      Mode.HARD, 
      QuestionField.JAPANESE_ANIME_MANGA, 
      choice.MULTIPLE_CHOICE_QUESTIONS
    ); // get the new question 
    
    console.log("newQuestion");
    console.log(newQuestion);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

    console.log("app");
    console.log(questions);
  }

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answer 
      const answer = event.currentTarget.value
      // check the answer against correct answer 
      const correct: boolean = questions[number].correct_answer === answer;
      // add the score if it is 
      if (correct) {
        setScore(prev => prev + 1);
      } 
      // save answers in an object for user answers 
      const answerObject = {
        question: questions[number].question,
        answer, 
        correct, 
        correctAnswer: questions[number].correct_answer
      };

      // append that object to our array 
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // move on to the next question if not the last question 
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }


  }
  
  return (
    <>
    <Wrapper>
    <GlobalStyle />
      <h1>React Quiz</h1>
      { // only display this when game is over or question array is empty
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
        (<button className='start' onClick={startTrivia}>start</button>)
        : null
      }
      { !gameOver ? <p className='score'>Score: {score}</p> : null }
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>) : null}
    </Wrapper>
    </>
  );
}

export default App;