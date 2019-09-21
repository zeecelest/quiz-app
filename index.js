'use strict';
//adding the quiz questions
//since we there are more than answer for each question, how do we write that? array?
const QUESTIONS = [
  {
    id: cuid(),
    question: 'What is the smallest planet in the Solar System?',
    answers: 
    //create variables for right and wrong answer
      let correctAnswers = correctResults;
      let wrongAnswers = wrongAnswers;


    correct: 'correct answer goes here'
  }, //answers can be an array of answers
  {
    id: cuid(),
    question: 'What is the hottest planet in the Solar System?',
    answers: 'Answer choices  go here',
    correct: 'correct answer goes here'
  },
  {
    id: cuid(),
    question: 'What planet is closest in size to Earth?',
    answers: 'Answer choices  go here',
    correct: 'correct answer goes here'
  },
  {
    id: cuid(),
    question: 'What is the brightest planet in the night sky?, answers:',
    answer: 'Answer choices  go here',
    correct: 'correct answer goes here'
  },
  {
    id: cuid(),
    question: 'What is the third planet from the Sun?',
    answers: 'Answer choices  go here',
    correct: 'correct answer goes here'
  }
];

/* initializing userScore and questionNumber to be 0 so that 
we can userScore++ and questionNumber++ as our app runs.
*/

let userScore = 5;
let questionCount = 8; //why is question count 8?

//if the user presses the Retake Quiz Button, these functions will
//be called within the renderStartPage to set the UserScore back to 0.
// and to set the questionCount back to 0.
function resetUserScore() {
  userScore = 0;
  console.log('resetuserScore is working');
}

function resetQuestionCount() {
  questionCount = 0;
  console.log('resetQuestionCount is working');
}

/*renderStartPage should run automatically when the page is loaded.
It will use the .html() method to push a string of html content to 
the <main> section in the html. This will allow for the start page
to be displayed by the user. It should not contain any score values 
and should reset the question count. Of note, this function will also
be called by the renderNewGame function when the user hits the "restart 
quiz button"*/

function renderStartPage() {
  console.log('renderStartPage works');
  resetUserScore();
  resetQuestionCount();
  // $('main').html(`
  // <h1>Space Quiz! </h1>
  //   <img src= "https://aasnova.org/wp-content/uploads/2016/11/fig13.jpg" alt="photo of solar system">
  //   <p>What do you know about space?</p>
  //   <button type="submit" class="submit">Launch</button>
  // `)
}

// generateQuestion will be called by renderQuestionPage.
// we will possibly use a .forEach loop to go through the
// array of objects of our QUESTIONS bank.
// we will then return at string that will be our question.
//we will need to figure out how to loop through the bank and retrieve
//a question without the questions getting repeated.

function generateQuestion() {
  console.log('generateQuestion works');
}

//this function will sort through our QUESTIONS bank array of objects.
//It will return an array of answers that we will use with our renderQuestionPage.
function generateAnswers() {
  console.log('generateAnswers works');
}
/* renderQuestionPage will listen for a submit event on the start quiz button or on the
next question button. It will push a text string into the main section of the html document
using the .html() method to render the content for the question page. 
*/

function renderQuestionPage() {
  console.log('renderQuestion page works');
  // generateQuestion();
  // generateAnswers();
}

function renderCorrectAnswerPage() {
  console.log('renderCorrectAnswerPage works');
}

function renderWrongAnswerPage() {
  console.log('renderWrongAnswer Page works');
}

function renderEndPage() {
  console.log('renderEndPage works');
}

//listens for a button click on Retake quiz. If clicked it will call
// the renderStartPage function.
function renderNewQuiz() {
  console.log('renderNewQuiz is working');
}

function handleNewPageLoad() {
  renderStartPage();
  renderQuestionPage();
  renderCorrectAnswerPage();
  renderWrongAnswerPage();
  renderEndPage();
  renderNewQuiz();
}

$(handleNewPageLoad);
