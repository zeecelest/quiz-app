'use strict';
//adding the quiz questions to our QUESTION bank.
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
    answers: ['Venus', 'Earth', 'Saturn', 'Mars'],
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
we can userScore++ and questionNumber++ as our app runs. Setting Global Variables
for question, answers, and correctAnswers to access throughout the app. 
*/

let userScore = 0;
let questionCount = 0;
let question;
let answers;
let correctAnswer;

/*if the user presses the Retake Quiz Button, these functions will
be called within the renderStartPage to set the UserScore back to 0.
and to set the questionCount back to 0 and will reset the Question bank so
that the questions will all be asked again. 
*/

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
the <main> section in the html. Of note, this function will also
be called by the renderNewGame function when the user hits the "restart 
quiz button" */

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

/* fetchPageData will generate an objet that we will use to get the data for 
renderQuestionPage.
*/

function fetchPageData() {
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (QUESTIONS[i].ask === false) {
      QUESTIONS[i].ask = true;
      return QUESTIONS[i];
    }
  }
}

/* createQuestionPageData will alter the global variables
to allow us to access the question, answers, and correctAnswer
for the question that we are on */

function createQuestionPageData() {
  let pageObject = fetchPageData();
  question = pageObject.question;
  answers = pageObject.answers;
  correctAnswer = pageObject.correct;
}

/*this function decides if a new question should be loaded OR if the renderEndPage should be loaded.
*/

function nextButtonAction(){
  $('main').submit(function() {
    event.preventDefault();
    if (
      $('form')
        .children('button')
        .hasClass('js-generateQuestionButton')
    ) {
      questionCount += 1;
      if (questionCount > 5) {
        renderEndPage();
      } else {
        renderQuestionPage();
      }
    }});}


/* renderQuestionPage will listen for a submit event on the start quiz button or on the
next question button. It will push a text string into the main section of the html document
using the .html() method to render the content for the question page. 
*/

function renderQuestionPage() {
  createQuestionPageData();
  $('main').html(
    `<h1>${question}</h1>
          <form class="js-quiz-questions" action="" method=""></form>
            <input type="radio" name="js-answer-options" id="answer-option-one" value= ${answers[0]}>
            <label for = "answer-option-one">${answers[0]}</label>
            <br>
            <input type="radio" name="js-answer-options" id="answer-option-two" value= ${answers[1]}>
            <label for = "answer-option-two">${answers[1]}</label>
            <br>
            <input type="radio" name="js-answer-options" id="answer-option-three" value= ${answers[2]}>
            <label for = "answer-option-three">${answers[2]}</label>
            <br>
            <input type="radio" name="js-answer-options" id="answer-option-four" value= ${answers[3]}>
            <label for = "answer-option-four">${answers[3]}</label>
            <br>
            <button type="submit" class="js-submitAnswerButton">Roger, Ready to check answer...</button>
        </form>
        <p class="questionCount">Question Number: ${questionCount}/5</p>`
  );
}
//     }
//   });
// }

//renderCorrectAnswerPage will listen for a submit action on the submitAnswerButton
// However it will only run if the userAnswer === correct answer in the question bank
//we will need a way to retrieve the user's Answer and compare it to the correct answer for
// the question we have asked.
function renderCorrectAnswerPage() {
  // $('main').submit(function () {
  // event.preventDefault();
  // if ($('form').children('button').hasClass('js-submitAnswerButton')) {
  $('main').on('click', '.js-submitAnswerButton', function(event) {
    //why won't submit work here but it works above?
    event.preventDefault();
    let userSelected = $('input:checked').val();
    if (userSelected === correctAnswer) {
      console.log('renderCorrectAnswerPage works');
      userScore += 1;
      $('main').html(`
      <h1>You Got The Answer Right!</h1>
      <img src = "https://i.dailymail.co.uk/i/newpix/2018/02/23/12/4983FD9D00000578-5426527-image-a-41_1519387515971.jpg" alt= "Two Thumbs Up From An Astronaut">
      <form>
      <button type="submit" class="js-generateQuestionButton">Blast Off To The Next Question</button>  
      </form>
      `);
    } else {
      renderWrongAnswerPage();
    }
  });
}

//renderWrongAnswerPage will listen for a submit action on the submitAnswerButton
//similar to the renderCorrectAnswerPage function. The function will only run IF userAnswer!== correct answer.
//we will use $('main').html('') to push in our html to render the wrong Answer page.
function renderWrongAnswerPage() {
  console.log('renderWrongAnswer Page works');
  $('main').html(`
      <h1> Houston, we have a problem!</h1>
      <img src = "http://cdn9.dissolve.com/p/D84_99_007/D84_99_007_0004_600.jpg" alt= "Sad Astronaut sits on a bench" >
      <p>You got the answer wrong. The correct answer was ${correctAnswer}. </p>
      <form>
      <button type="submit" class="js-generateQuestionButton">Blast Off To The Next Question</button>
      </form>
  `);
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
  $('main').html(`
  <h1>Mission Complete</h1>
  <img src ="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F582161602%2F960x0.jpg%3Ffit%3Dscale" alt= "Astronaut waves from space">
  <p>You answered ${userScore}/5 questions correct!</p>
  <form>
  <button type="submit" class="js-ResetQuizButton">Repeat Mission?
  </button>
  </form>`);
}

//renderNewQuiz listens for a button click on Retake quiz. If clicked it will call
// the renderStartPage function.
function renderNewQuiz() {
  $('main').on('click', '.js-ResetQuizButton', function() {
    //$('main').submit(function(event) {
    event.preventDefault();
    //if (
    //$('form')
    //.children('button')
    //.hasClass('js-ResetQuizButton')
    //) {
    renderStartPage();
  });
  //log('renderNewQuiz is working');
}

/*the functions within hadleNewPageLoad() are all of the base functions that we need
to run when the page is ready. These are the functions that either need to run automatically
such as renderStartPage. OR they are the functions that are assigning listeners
*/

function handleNewPageLoad() {
  renderStartPage();
  //renderQuestionPage();
  renderCorrectAnswerPage();
  //renderWrongAnswerPage();
  //renderEndPage();
  renderNewQuiz();
  nextButtonAction();
}

$(handleNewPageLoad);
