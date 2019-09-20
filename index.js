'use strict';

const STORE = [
  { id: cuid(), question: 'First question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' }, //answers can be an array of answers
  { id: cuid(), question: 'Second question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
  { id: cuid(), question: 'Third question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
  { id: cuid(), question: 'Fourth question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
  { id: cuid(), question: 'Fifth question goes here', answers: 'Answer choices  go here', correct: 'correct answer goes here' },
]


function renderStartPage(){
  console.log('renderStartPage works');
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