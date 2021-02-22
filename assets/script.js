const question = document.getElementById('question-posed');
const choices = Array.from(document.getElementsByClassName('choice-text'));

const questionCounterText = document.getElementById('question-counter');
const scoreCounterText = document.getElementById('score-counter');
const startButton = document.getElementById('start-btn');

const answerPoints = 10;
const maxTestQuestions = 5;
let score = 0;

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
// questions and answers are pulled from https://www.codeconquest.com/coding-quizzes/javascript-knowledge-quiz-beginner/
let questions = [
  {
    question: "What kind of statement is used to execute actions based on a trigger or condition?",

    choice1: "Conditional Statement",
    choice2: "Regular Expression",
    choice3: "Fired Event",
    choice4: "Boolean Variable",

    answer: 1
  },
  {
    question: "What are the identifiers called that cannot be used as variables or function names?",

    choice1: "Constants",
    choice2: "Favorites",
    choice3: "Reserved Words",
    choice4: "Concrete Terms",

    answer: 3
  },
  {
    question: "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",

    choice1: "ForEach",
    choice2: "Loop",
    choice3: "Clone",
    choice4: "Repeater",

    answer: 2
  },
  {
    question: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",

    choice1: "Condition",
    choice2: "Boolean",
    choice3: "RegExp",
    choice4: "Events",

    answer: 4
  },
  {
    question: "In JavaScript, what element is used to store multiple values in a single variable?",

    choice1: "Strings",
    choice2: "Variables",
    choice3: "Arrays",
    choice4: "Functions",

    answer: 3
  }

];

const startingMinutes = 3;
let time = (startingMinutes * 60 - 1); //to start at 2:59 instead of 3:00, due to unknown time delay bug
const countdownEl = document.getElementById('countdown');
let timerInterval;

// * START GAME, START TIMER, SHOW QUESTIONS
startButton.addEventListener('click', function() {
  // ? COUNTDOWN TIMER
  // NOTE: there is a delay on timer start
  // clears interval ID if it is already set
  // prevents timer from having seizures when startButton is clicked after the first time
  if (timerInterval != null) {
    clearInterval(timerInterval);
    timerInterval = null;
  } else {
    timerInterval = setInterval(updateCountdown, 1000);
  }

  // timer math
  function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = (time % 60);
    // conditional statement to prevent timer from starting at 3:0 instead of 3:00, 
    seconds = seconds < 10 ? ('0' + seconds) : seconds;
    // display countdown as text on page
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;

    // ? END QUIZ IF TIMER RUNS OUT
    if (time < 0) {
      clearInterval(timerInterval);
      //console.log("here is an expression");
      alert("Sorry, time is up!");
      return window.location.assign("index.html");
    }
  }

  // ? REVEAL QUESTION/ANSWER SECTION ON QUIZ START
  let qaContainer = document.getElementById("qa-container");
    //console.log(qaContainer.style.display);

    if (qaContainer.style.display == "none") {
      qaContainer.style.display = "block";
    } else if (qaContainer.style.display == "") {
      qaContainer.style.display = "block";
    } else {
      qaContainer.style.display = "none";
    }


  // '...' (spread) syntax 'clones' the QUESTIONS array into this array, so any changes made here don't also change that array
  availableQuestions = [...questions];

  getNewQuestion();

});

// * UPDATING SCORE
incrementScore = num => {
  score += num;
  scoreCounterText.innerText = score;
};

decreaseTime = num => {
  time -=30;
  scoreCounterText.innerText = score;
};

// * SHOWING NEW QUESTION
getNewQuestion = () => {

  // TODO: add more questions while still only showing 5 to the user. would that be a for loop, i++ to 4?
  if (availableQuestions.length === 0) {
    // save score to local storage
    //localStorage.setItem("mostRecentScore", score);
    localStorage.setItem("mostRecentScore", JSON.stringify(score));
    // move to winner.html page
    return window.location.assign("win/winner.html");
  } 

  // update HUD question counter each round
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${maxTestQuestions}`;

  // base the questionIndex on length of array so that it changes as more questions are answered
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  // question is the link to <h3> questionPosed. this updates the h3 text to match the question property of cQ object.
  question.innerText = currentQuestion.question;

  // choices is the link to <p> choice-text. forEach combined with dataset updates every <p> with the appropriate answer.
  choices.forEach(choice => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion['choice' + number];
  });

  // splice current aQ from qI so that the question is not repeated, and qI shrinks each round
  availableQuestions.splice(questionIndex, 1);
  //console.log(availableQuestions);
};

// * EVALUATING ANSWER & GETTING NEW QUESTION
choices.forEach(choice => {
  choice.addEventListener('click', event => {
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset.number;
      //console.log(selectedAnswer == currentQuestion.answer);

    // add correct (green) or incorrect (red) class styling. 
    // ternary operator (either/or):
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    // increase score counter on correct answers
    if (classToApply === 'correct') {
      incrementScore(answerPoints);
    }

    // reduces time by 10 seconds on incorrect answers
    if (classToApply === 'incorrect') {
      decreaseTime();
    }

    // add appropriate class styling
    selectedChoice.parentElement.classList.add(classToApply);
    // give small delay before removing class and showing a new question
    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);

  });
});