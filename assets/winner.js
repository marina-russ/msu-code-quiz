// * WINNER : SAVE HIGH SCORE

const initials = document.getElementById('initials');
const saveScoreBtn = document.getElementById('save-score-btn');
const finalScore = document.getElementById('final-score');

// grab saved score from local storage
const mostRecentScore = localStorage.getItem('mostRecentScore');
// update score text
finalScore.innerText = mostRecentScore;

//function is declared within winner.html file
saveHighScore = event => {
  console.log("clicked save button");
  event.preventDefault();
}

