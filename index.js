'use strict';
//adding the quiz questions
const QUESTIONS = [
  {
    id: cuid(),
    question: 'What is the smallest planet in the Solar System?',
    answers: ['Mercury', 'Pluto', 'Jupiter', 'Mars'],
    correct: 'Mercury',
    ask: false
  },
  {
    id: cuid(),
    question: 'What is the hottest planet in the Solar System?',
    answers: ['Mars', 'Venus', 'Sun', 'Saturn'],
    correct: 'Venus',
    ask: false
  },
  {
    id: cuid(),
    question: 'What planet is closest in size to Earth?',
    answers: ['Uranus', 'Saturn', 'Venus', 'Jupiter'],
    correct: 'Venus',
    ask: false
  },
  {
    id: cuid(),
    question: 'What is the brightest planet in the night sky?',
    answer: ['Venus', 'Earth', 'Saturn', 'Mars'],
    correct: 'Venus',
    ask: false
  },
  {
    id: cuid(),
    question: 'What is the third planet from the Sun?',
    answers: ['Saturn', 'Earth', 'Pluto', 'Sun'],
    correct: 'Earth',
    ask: false
  }
];

/* initializing userScore and questionNumber to be 0 so that 
we can userScore++ and questionNumber++ as our app runs.
*/

let userScore = 0;
let questionCount = 0;

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

function resetQuestionAsked() {
  for (let i = 0; i < QUESTIONS.length; i++) {
    QUESTIONS[i].ask = false;
    //console.log(QUESTIONS[i]);
  }
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
  resetQuestionAsked();
  $('main').html(`
   <h1>Space Quiz!</h1>
    <img src= "https://aasnova.org/wp-content/uploads/2016/11/fig13.jpg" alt="photo of solar system">
    <p>What do you know about space?</p>
    <form>
    <button type="submit" class="js-generateQuestionButton">Launch</button>
    </form>
   `);
}

// generateQuestion will be called by renderQuestion page (which is listening for submit events on
// start Quiz or Next Question buttons.
// we will possibly use a .forEach loop to go through the
// array of objects of our QUESTIONS bank.
// we will then return at string that will be our question.
//we will need to figure out how to loop through the bank and retrieve
//a question without the questions getting repeated.
//maybe useing .pop() to remove it from the array completely?
//however, we would need to be able to re-cycle through the questions
//when retake quiz is pressed. So permanentely changing the QUESTION bank
//probably would not work.
//maybe we can give each queston a property of "asked" and can be initally set to false.
// The generate question function can only pull questions marked as false.
// if the question is asked it can set the asked value to true.
// renderStartPage could then also reset all property values of asked to false?
// if we did this approach we would need a function for resetQuestionBank that will be called
// by renderStartPage.

function generateQuestion() {
  console.log('generateQuestion works');
}

//this function will sort through our QUESTIONS bank array of objects.
//It will return an array of answers that we will use with our renderQuestionPage.
//Again, need to work with the generateQuestion function to make sure we are not repeating questions/answers.
//potentially we can combine into one function with generateQuestion? Or this can be called by generateQuestion?
function generateAnswers() {
  console.log('generateAnswers works');
}
/* renderQuestionPage will listen for a submit event on the start quiz button or on the
next question button. It will push a text string into the main section of the html document
using the .html() method to render the content for the question page. 
*/

//also thought-- maybe we have an if statement that
//if questionCount > 5 then we run the render End Page function.
// if we approach it this way we would need to remove
//renderEndPage() from handleNewPageLoad();

function fetchPageData() {
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (QUESTIONS[i].ask === false) {
      QUESTIONS[i].ask = true;
      return QUESTIONS[i];
    }
  }
}

//function createQuestionPageData() {
//let pageObject = fetchPageData();
//let question = pageObject.question;
//let answers = pageObject.answers;
//let correctAnswer = pageObject.correct;
//}

function renderQuestionPage() {
$('main').submit(function(event){
  event.preventDefault();
   if ($('form').children('button').hasClass('js-generateQuestionButton')){
  //$('main').on('click', '.js-generateQuestionButton', function() {
    //need to figure out how to get .submit() to work
    // event.preventDefault();
    console.log('renderQuestion page works');
    questionCount += 1;
    if (questionCount > 5) {
      renderEndPage();
    }
    let pageObject = fetchPageData();
    let question = pageObject.question;
    let answers = pageObject.answers;
    let correctAnswer = pageObject.correct;
    $('main').html(
      `<h1>${question}</h1>
 <form class="js-quiz-questions" action="" method=""></form>
<input type="radio" name="js-answer-options" id="answer-option-one">
<label for = "answer-option-one">${answers[0]}</label>
<br>
<input type="radio" name="js-answer-options" id="answer-option-two">
<label for = "answer-option-two">${answers[1]}</label>
<br>
<input type="radio" name="js-answer-options" id="answer-option-three">
<label for = "answer-option-three">${answers[2]}</label>
<br>
<input type="radio" name="js-answer-options" id="answer-option-four">
<label for = "answer-option-four">${answers[3]}</label>
<br>
 <button type="submit" class="js-submitAnswerButton">Roger, Ready to check answer</button>
 </form>
 <p class="questionCount">Question Number ${questionCount}/5</p>`
    );
  }});
}

//renderCorrectAnswerPage will listen for a submit action on the submitAnswerButton
// However it will only run if the userAnswer === correct answer in the question bank
//we will need a way to retrieve the user's Answer and compare it to the correct answer for
// the question we have asked.
function renderCorrectAnswerPage() {
  console.log('renderCorrectAnswerPage works');
  // userScore += 1;
}

//renderWrongAnswerPage will listen for a submit action on the submitAnswerButton
//similar to the renderCorrectAnswerPage function. The function will only run IF userAnswer!== correct answer.
//we will use $('main').html('') to push in our html to render the wrong Answer page.
function renderWrongAnswerPage() {
  console.log('renderWrongAnswer Page works');
}

//renderEndPage will listen for a submit event on Next Question button.
// if question count is >5 then renderEndPage will use the .html method to push
// in the html to our main element to render the End Page.
// Also within this function, we will need to utilitize the value for user score
// that we have been adding to in the renderCorrectAnswerPage();
// ALTERNITAVELY-- renderEndPage can be called by renderQuestionPage if the
//question count > 5.
// if we do this we need to remove renderEndPage() from handleNewPageLoad().
function renderEndPage() {
  console.log('renderEndPage works');
}

//renderNewQuiz listens for a button click on Retake quiz. If clicked it will call
// the renderStartPage function.
function renderNewQuiz() {
  console.log('renderNewQuiz is working');
}

/*the functions within hadleNewPageLoad() are all of the base functions that we need
to run when the page is ready. These are the functions that either need to run automatically
such as renderStartPage. OR they are the functions that are assigning listeners
*/

function handleNewPageLoad() {
  renderStartPage();
  renderQuestionPage();
  renderCorrectAnswerPage();
  renderWrongAnswerPage();
  renderEndPage();
  renderNewQuiz();
}

$(handleNewPageLoad);
