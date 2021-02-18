//* STEPS:
// CLICK BUTTON EVENT LISTENER
// START TIMER
// GENERATE QUESTIONS AND ANSWERS
//* SHOW A (RANDOM) QUESTION FROM THE QUIZ
//* SELECT ANSWER
//* DETERMINE IF ANSWER IS CORRECT
//* IF INCORRECT, REDUCE TIME
//* SHOW ANOTHER (RANDOM) QUESTION UNTIL NO MORE REMAIN
//* GAME OVER CRITERIA:
//* --A) ALL QUESTIONS ANSWERED
//* --B) NO TIME REMAINING
//* ON GAME OVER, SAVE INITIALS AND SCORE

// connects JS to HTML button
let quizButton = document.querySelector('.quiz-button');
// event listener for when user clicks on button
quizButton.addEventListener('click', "TODO:");

// start quiz timer
function quizTimer() { }

// quiz list object, containing an array of quiz questions and answers
let quizQuestions = [
  {
    question: "here is question #1 ?",
    answers: {
      a: "answer a",
      b: "answer b",
      c: "answer c",
      d: "answer d",
      e: "answer e"
    },

    question: "here is question #2 ?",
    answers: {
      a: "answer a",
      b: "answer b",
      c: "answer c",
      d: "answer d",
      e: "answer e"
    },

  }
]