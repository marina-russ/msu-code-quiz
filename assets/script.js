const question = document.getElementById('question-posed');
const choices = Array.from(document.getElementsByClassName('choice-text'));

const questionCounterText = document.getElementById('question-counter');
const scoreCounterText = document.getElementById('score-counter');

const answerPoints = 10;
const maxTestQuestions = 5;

const startButton = document.getElementById('start-btn');
const showTimer = document.getElementById('timer-div');

let currentQuestion = {};
let questionCounter = 0;
let scoreCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "question string bbbbb",

    choice1: "answer 1",
    choice2: "answer 2",
    choice3: "answer 3",
    choice4: "answer 4",

    answer: 1
  },
  {
    question: "question string aaaaa",

    choice1: "answer 111",
    choice2: "answer 222",
    choice3: "answer 333",
    choice4: "answer 444",

    answer: 1
  },
  {
    question: "question string ccccc",

    choice1: "answer 11111",
    choice2: "answer 22222",
    choice3: "answer 33333",
    choice4: "answer 44444",

    answer: 1
  },
  {
    question: "question string dddddddd",

    choice1: "answer 11111",
    choice2: "answer 22222",
    choice3: "answer 33333",
    choice4: "answer 44444",

    answer: 1
  },
  {
    question: "question string eeeeeee",

    choice1: "answer 11111",
    choice2: "answer 22222",
    choice3: "answer 33333",
    choice4: "answer 44444",

    answer: 1
  }

]

// arrow function: function name = (parameters) => return
startGame = () => {
  //! startTimer();

  questionCounter = 0;
  score = 0;

  // ... spread syntax 'clones' the QUESTIONS array into this array, so any changes made here don't also change that array
  availableQuestions = [...questions];
  //console.log(availableQuestions);
  getNewQuestion();
};

// TODO: change <div id="time-div"> class name CSS from 'hidden' to 'display'
//! function startTimer() {
//   var presentTime = document.getElementById('timer-counter').innerHTML;
//   var timeArray = presentTime.split(/[:]+/);
//   var m = timeArray[0];
//   var s = checkSecond((timeArray[1] - 1));
//   if (s == 59) { m = m - 1 }
//   //if(m<0){alert('timer completed')}

//   document.getElementById('timer').innerHTML =
//     m + ":" + s;
//   console.log(m)
//   setTimeout(startTimer, 1000);

//   showTimer.addEventListener('click', function (

//     let timerText = document.getElementById('timer-counter');

//   document.getElementById('timer-counter').innerHTML = 1 + ":" + 00;

// ));

//}



// * UPDATING SCORE
incrementScore = num => {
  score += num;
  scoreCounterText.innerText = score;
}

getNewQuestion = () => {

  if (availableQuestions.length === 0) {
    //if (availableQuestions.length === 0 || timer = 0) {} 
    // save score to local storage
    //localStorage.setItem("mostRecentScore", score);

    localStorage.setItem("mostRecentScore", JSON.stringify(score));

    // move to winner.html page
    return window.location.assign("winner.html");
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
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  // splice current aQ from qI so that the question is not repeated, and qI shrinks each round
  availableQuestions.splice(questionIndex, 1)
  //console.log(availableQuestions);
};

// * EVALUATING ANSWER & GETTING NEW QUESTION
choices.forEach(choice => {
  choice.addEventListener('click', event => {
    const selectedChoice = event.target;
      //console.log(event.target);
    const selectedAnswer = selectedChoice.dataset['number'];
      //console.log(selectedAnswer == currentQuestion.answer);

    // add correct(green) or incorrect(red) class styling. 
    // ternary operator (either/or):
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    // increase score counter on correct answers
    if (classToApply === 'correct') {
      incrementScore(answerPoints);
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

startGame();

//********************** */
