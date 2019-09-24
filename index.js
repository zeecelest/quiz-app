'use strict';
//adding the quiz questions to our QUESTION bank.
const QUESTIONS = [
  {
    question: 'What is the smallest planet in the Solar System?',
    answers: ['Mercury', 'Pluto', 'Jupiter', 'Mars'],
    correct: 'Mercury',
    ask: false
  },
  {
    question: 'What is the hottest planet in the Solar System?',
    answers: ['Mars', 'Venus', 'Sun', 'Saturn'],
    correct: 'Venus',
    ask: false
  },
  {
    question: 'What planet is closest in size to Earth?',
    answers: ['Uranus', 'Saturn', 'Venus', 'Jupiter'],
    correct: 'Venus',
    ask: false
  },
  {
    question: 'What is the brightest planet in the night sky?',
    answers: ['Venus', 'Earth', 'Saturn', 'Mars'],
    correct: 'Venus',
    ask: false
  },
  {
    question: 'What is the third planet from the Sun?',
    answers: ['Saturn', 'Earth', 'Pluto', 'Sun'],
    correct: 'Earth',
    ask: false
  }
];

/* initializing userScore and questionNumber to be 0 so that 
we can userScore++ and questionNumber++ as our app runs. Initializing keys
for question, answers, and correctAnswers to access throughout the app. 
*/

const pageObject = {
  userScore: 0,
  questionCount: 0,
  question: '',
  answers: '',
  correctAnswer: ''
};

/*if the user presses the Retake Quiz Button, these functions will
be called within the renderStartPage to set the UserScore back to 0.
and to set the questionCount back to 0 and will reset the Question bank so
that the property 'ask' will all be reset to false so that the questions can be asked again. 
*/

function resetUserScore() {
  pageObject.userScore = 0;
}

function resetQuestionCount() {
  pageObject.questionCount = 0;
}

function resetQuestionAsked() {
  for (let i = 0; i < QUESTIONS.length; i++) {
    QUESTIONS[i].ask = false;
  }
}

/*renderStartPage should run automatically when the page is loaded.
It will use the .html() method to push a string of html content to 
the <main> section in the html. Of note, this function will also
be called by the renderNewGame function when the user hits the "restart 
quiz button" */

function renderStartPage() {
  resetUserScore();
  resetQuestionCount();
  resetQuestionAsked();
  $('main').html(`
    <h1>Space Quiz!</h1>
    <img src= "https://aasnova.org/wp-content/uploads/2016/11/fig13.jpg" alt="photo of solar system">
    <p>What do you know about space?</p>
    <form class = "js-launchNextQuestion">
    <button type="submit" class="js-generateQuestionButton">LAUNCH</button>
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

/* createQuestionPageData will alter the pageObject values
to allow us to access the question, answers, and correctAnswer
for the question that we are on */

function createQuestionPageData() {
  let currentQuestionData = fetchPageData();
  pageObject.question = currentQuestionData.question;
  pageObject.answers = currentQuestionData.answers;
  pageObject.correctAnswer = currentQuestionData.correct;
}

/*this function decides if a new question should be loaded OR if the renderEndPage should be loaded.
 */

function nextButtonAction() {
  $('main').on('submit', '.js-launchNextQuestion', function() {
    event.preventDefault();
    pageObject.questionCount += 1;
    if (pageObject.questionCount > 5) {
      renderEndPage();
    } else {
      renderQuestionPage();
    }
  });
}

/* renderQuestionPage will be called by nextButtonAction(). It will push a text string into the main section of the html document
using the .html() method to render the content for the question page. 
*/

function renderQuestionPage() {
  createQuestionPageData();
  $('main').html(
    `<h1>${pageObject.question}</h1>
          <form class="js-quiz-questions" action="" method="">
          <fieldset name= "selectAnAnswer">
          <legend> Select An Answer </legend>
            <input type="radio" name="js-answer-options" id="answer-option-one" value= ${
              pageObject.answers[0]
            } required>
            <label for = "answer-option-one">${pageObject.answers[0]}</label>
            <br>
            <input type="radio" name="js-answer-options" id="answer-option-two" value= ${
              pageObject.answers[1]
            }>
            <label for = "answer-option-two">${pageObject.answers[1]}</label>
            <br>
            <input type="radio" name="js-answer-options" id="answer-option-three" value= ${
              pageObject.answers[2]
            }>
            <label for = "answer-option-three">${pageObject.answers[2]}</label>
            <br>
            <input type="radio" name="js-answer-options" id="answer-option-four" value= ${
              pageObject.answers[3]
            }>
            <label for = "answer-option-four">${pageObject.answers[3]}</label>
          </fieldset>
            <br>
            <p class="questionCount">You are on question number: <span>${
              pageObject.questionCount
            } out of 5.</span> <br> Your current score is: <span>${
      pageObject.userScore
    } out of 5.</span></p>
            <button type="submit" class="js-submitAnswerButton">Roger, Ready to check answer...</button>
        </form>
        `
  );
}

/* this will listen for an event when the user submits their answer.
it will check to see if their answer is correct. It will send the user
either to the correct answer page or wrong answer page 
depending on if the user was right or not. */

function checkUserAnswer() {
  $('main').on('submit', '.js-quiz-questions', function() {
    event.preventDefault();
    let userSelected = $('input:checked').val();
    if (userSelected === pageObject.correctAnswer) {
      renderCorrectAnswerPage();
    } else {
      renderWrongAnswerPage();
    }
  });
}

/*renderCorrectAnswerPage will be called if the user got the answer right.
it will use the .html method to push in the html to the main Element.
*/

function renderCorrectAnswerPage() {
  pageObject.userScore += 1;
  $('main').html(`
      <h1>Stellar Job!</h1>
      <img src = "https://i.dailymail.co.uk/i/newpix/2018/02/23/12/4983FD9D00000578-5426527-image-a-41_1519387515971.jpg" alt= "Two Thumbs Up From An Astronaut">
      <form class= "js-launchNextQuestion">
      <p>You got the answer right!</p>
      <button type="submit" class="js-generateQuestionButton">Blast Off To The Next Question</button>  
      </form>
      `);
}

/*renderWrongAnswerPage will be called by checkUserAnswer if the user got the question wrong. 
It will use .html method to push into the main element of the html.
*/
function renderWrongAnswerPage() {
  $('main').html(`
      <h1> Houston, we have a problem!</h1>
      <img src = "http://cdn9.dissolve.com/p/D84_99_007/D84_99_007_0004_600.jpg" alt= "Sad Astronaut sits on a bench" >
      <p>You got the answer wrong. The correct answer was ${pageObject.correctAnswer}. </p>
      <form class= js-launchNextQuestion>
      <button type="submit" class="js-generateQuestionButton">Blast Off To The Next Question</button>
      </form>
  `);
}

/*renderEndPage will be called by nextButtonAction() if the question count > 5.
it uses .html method to push into the main element.
*/

function renderEndPage() {
  $('main').html(`
  <h1>Mission Complete</h1>
  <img src ="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F582161602%2F960x0.jpg%3Ffit%3Dscale" alt= "Astronaut waves from space">
  <p>You answered ${pageObject.userScore} out of 5 questions correctly!</p>
  <form class= "js-resetNewQuiz">
  <button type="submit" class="js-ResetQuizButton">Repeat Mission?
  </button>
  </form>`);
}

//renderNewQuiz listens for a button click on Retake quiz. If clicked it will call
// the renderStartPage function.

function renderNewQuiz() {
  $('main').on('submit', '.js-newQuiz', function() {
    event.preventDefault();
    renderStartPage();
  });
}

/*the functions within handleNewPageLoad() are all of the base functions that we need
to run when the page is ready. These are the functions that either need to run automatically
such as renderStartPage. OR they are the functions that are assigning listeners
*/

function handleNewPageLoad() {
  renderStartPage();
  renderNewQuiz();
  nextButtonAction();
  checkUserAnswer();
}

$(handleNewPageLoad);
