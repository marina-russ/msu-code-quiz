const question = document.getElementById('question-posed');
const choices = Array.from(document.getElementsByClassName('choice-text'));
//console.log(choices);
const questionCounterText = document.getElementById('question-counter');
const scoreCounterText = document.getElementById('score-counter');
const answerPoints = 1;
const maxTestQuestions = 5;

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
  }
]

// arrow function: function name = (parameters) => return
startGame = () => {
  questionCounter = 0;
  score = 0;

  // ... spread syntax 'clones' the QUESTIONS array into this array, so any changes made here don't also change that array
  availableQuestions = [...questions];
  //console.log(availableQuestions);
  getNewQuestion();
};

// * UPDATING SCORE
incrementScore = num => {
  score += num;
  scoreCounterText.innerText = score;
}

getNewQuestion = () => {

  // if (availableQuestions.length === 0) {
  //   // if (availableQuestions.length === 0 || timer = 0) {} 
  //   // TODO: add end game screen
  //   return window.location.assign("/end.html");
  // }

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

// * EVALUATING ANSWER & NEW QUESTION
// TODO: right now only .choice-text (choice) has eventListener. how do i add eventListener to parent .answer-container so that .choice-option also has an eventListener?
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