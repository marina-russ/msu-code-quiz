// *** DOM ELEMENTS
// setup container: 
const setupContainer = document.getElementById("container__setup");
const startButton = document.getElementById("btn__start");
// hud container:
const timerEl = document.getElementById("hud__timer-countdown");
const questionCountText = document.getElementById("hud__question-number");
const scoreCount = document.getElementById("hud__score-counter");
// quiz container:
const quizContainer = document.getElementById("container__quiz");
const questionText = document.getElementById("question__text");
const multipleChoices = Array.from(document.getElementsByClassName("answer__text"));

// VARIABLES - GENERAL
const maxTestQuestions = 5;

// VARIABLES - BEFORE QUIZ START
let questionCount = 0;
let score = 0;
let currentQuestion = {};

// *** TIMER SETUP
//const startTime = 5;
//TODO: DELETE;
const startTime = 5;
let quizTime = (startTime * 60);

// *** DISPLAY QUIZ 
function showQuiz() {
  // Reveals questions via CSS styling
  if (quizContainer.style.display === "none") {
    quizContainer.style.display = "block";
  }

  // Hides start button
  if (setupContainer.style.display === "inline-block") {
    setupContainer.style.display = "none";
  }
}

// *** DISPLAY TIMER
function showTimer() {
  // 1. Decrease timer by 1 increment (variable is measured in seconds)
  quizTime--;

  // 2. Grab values for display
  let displayMinute = Math.floor(quizTime / 60); // for ?:##
  let displaySeconds = (quizTime % 60); // for #:??

  // 3. Prevent timer from displaying 3:7 instead of 3:07
  displaySeconds = displaySeconds < 10 ? ("0" + displaySeconds) : displaySeconds;

  // 4. Display timer as text
  timerEl.innerHTML = `${displayMinute}:${displaySeconds}`;

  // 5. End quiz when time runs out
  if (quizTime == 0) {
    endQuiz();
  }
}

// *** END QUIZ DUE TO TIME
function endQuiz() {
  if (quizTime === 0) {
    alert("Sorry, time is up! \nYou'll have to try again.");
    return window.location.assign("index.html");
  }
}

// *** QUIZ QUESTION LIST
let questionList = [
  {
    question: "What kind of statement is used to execute actions based on a trigger or condition?",

    choice1: "Conditional Statement",
    choice2: "Regular Expression",
    choice3: "Fired Event",
    choice4: "Boolean Variable",

    answer: 1,
  },
  {
    question: "What are the identifiers called that cannot be used as variables or function names?",

    choice1: "Constants",
    choice2: "Favorites",
    choice3: "Reserved Words",
    choice4: "Concrete Terms",

    answer: 3,
  },
  {
    question: "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",

    choice1: "ForEach",
    choice2: "Loop",
    choice3: "Clone",
    choice4: "Repeater",

    answer: 2,
  },
  {
    question: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",

    choice1: "Condition",
    choice2: "Boolean",
    choice3: "RegExp",
    choice4: "Events",

    answer: 4,
  },
  {
    question: "In JavaScript, what element is used to store multiple values in a single variable?",

    choice1: "Strings",
    choice2: "Variables",
    choice3: "Arrays",
    choice4: "Functions",

    answer: 3,
  }
];
let availableQuestions = [...questionList];

// *** SHOW NEW QUESTION
function getNewQuestion() {
  // 1. Check if Quiz is Complete
  if (availableQuestions.length === 0) {
    // Saves score to local storage
    localStorage.setItem("mostRecentScore", score);
    // Moves user to score page
    return window.location.assign("score.html");
  }

  // 2. Update HUD question counter each round
  questionCount++;
  questionCountText.innerText = `${questionCount}/${maxTestQuestions}`;

  // 3. Randomly pick a new question from array based on index #
  let questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  // 4. Remove current question from pool of future questions
  availableQuestions.splice(questionIndex, 1);

  // 5. Display question and multiple choice answers
  questionText.innerText = currentQuestion.question;
  multipleChoices.forEach(choice => {
    // Grabs multiple choice answer #
    let choiceNumber = choice.dataset.number;
    // Displays potential answer text
    choice.innerText = currentQuestion["choice" + choiceNumber];
  });
}

// *** UPDATE SCORE
let incrementScore = num => {
  score += num;
  scoreCount.innerText = score;
};

// *** EVALUATE ANSWER & GET NEW QUESTION
multipleChoices.forEach(choice => {
  choice.addEventListener("click", event => {
    // 1. Label answer that user selected
    let selectedChoice = event.target;
    let selectedAnswer = selectedChoice.dataset.number;

    // 2. Determine if answer is correct
    let answerStyle = (selectedAnswer == currentQuestion.answer) ? "correct" : "incorrect";

    // 3. Increase score counter by 10 points for correct answers
    if (answerStyle === "correct") {
      incrementScore(10);
    }

    // 4. Reduce time (by 30sec) for incorrect answers
    if (answerStyle === "incorrect") {
      quizTime -= 30;
    }

    // 5. Add CSS styling
    selectedChoice.classList.add(answerStyle);

    // 6. Create slight pause before style reset and next question
    setTimeout(() => {
      selectedChoice.classList.remove(answerStyle);
      getNewQuestion();
    }, 700);
  });
});

// *** START QUIZ
startButton.addEventListener("click", function () {

  // 0. Start timer + display start time
  timerEl.innerHTML = `${startTime}:00`;

  // 1. Set showTimer to run/"refresh" every second
  setInterval(showTimer, 1000);

  // 2. Display Quiz
  showQuiz();

  // 3. Get first question
  getNewQuestion();
});
