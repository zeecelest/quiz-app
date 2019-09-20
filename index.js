'use strict';

const STORE = [
  { id: cuid(), question: 'First question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' }, //answers can be an array of answers
  { id: cuid(), question: 'Second question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
  { id: cuid(), question: 'Third question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
  { id: cuid(), question: 'Fourth question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
  { id: cuid(), question: 'Fifth question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
]

/* initializing userScore and questionNumber to be 0 so that 
we can userScore++ and questionNumber++ as our app  runs.
*/

let userScore = 5;
let questionCount = 8;

//if the user presses the Retake Quiz Button, these functions will
//be called within the renderStartPage to set the UserScore back to 0.
// and to set the questionCount back to 0.
function resetUserScore(){
  userScore = 0;
  console.log(userScore);
}

function resetQuestionCount(){
  questionCount= 0;
  console.log(questionCount);
}

/*renderStartPage should run automatically when the page is loaded.
It will use the .html() method to push a string of html content to 
the <main> section in the html. This will allow for the start page
to be displayed by the user. It should not contain any score values 
and should reset the question count. Of note, this function will also
be called by the renderNewGame function when the user hits the "restart 
quiz button"*/

function renderStartPage(){
  console.log('renderStartPage works');
  resetUserScore();
  resetQuestionCount();
  $('main').html(`
  
  
  
  
  
  
  
  
  
  
  
  
  `)
}


function renderQuestionPage(){
  console.log('renderQuestion page works');
}

function renderCorrectAnswerPage(){
  console.log('renderCorrectAnswerPage works');
}

function renderWrongAnswerPage(){
  console.log('renderWrongAnswer Page works');
}

function renderEndPage(){
  console.log('renderEndPage works');
}





function handleNewPageLoad(){
  renderStartPage();
  renderQuestionPage();
  renderCorrectAnswerPage();
  renderWrongAnswerPage();
  renderEndPage();
}

$(handleNewPageLoad)