// SCRIPT.JS has localStorage.setItem("mostRecentScore", JSON.stringify(score));

// pulls mostRecentScore data from local storage via getItem method
const mostRecentScore = localStorage.getItem('mostRecentScore');
// connects JS finalScore variable to HTML final-score <h1> tag
const finalScore = document.getElementById('final-score');
// displays mostRecentScore on page using innerText
finalScore.innerText = mostRecentScore;

// link JS to HTML for buttons
const saveButton = document.getElementById('save-score-btn');

// pull input info from HTML and make into JS variable
let nameStored = JSON.parse(localStorage.getItem("initials"));

saveButton.addEventListener('click', function() {
  // ! can't get input data to save to local storage... preventDefault() doesn't seem to do anything...
  saveButton.preventDefault();
  // object for JSON to store individual score/initial pairings
  let highScore = {
    name: nameStored,
    yourScore: mostRecentScore
  };

  // update nameStored with input from webpage
  if (nameStored === null) {
    nameStored = [nameStored.value];
  } else {
    // if same player is entering name, just add it again
    nameStored.unshift(nameStored.value);
  }

  // taking object highScore values & converting into JSON string so local storage can store highScoreHistory values
  // setItem('key', 'value')
  localStorage.setItem('highScoreHistory', JSON.stringify(highScore));

  // taking JSON string highScoreHistory values & converting into object so code can reference highScoreHistory value
  // getItem('key'), will return the appropriate object value
  JSON.parse(localStorage.getItem('highScoreHistory'));

  // add new <li> element when 'save' button is clicked
  addNewLi = function() {
    let liItem = document.createElement("li");

    // add NAME to the <ul id="list-name">
    let ulNameList = document.getElementById("list-name");
    // add text node to <li>
    liItem.innerHTML(highScore.name);
    // add <li> to <ul>
    ulNameList.appendChild(liItem);

    // add SCORE to the <ul id="list-score">
    let ulScoreList = document.getElementById("list-score");
    liItem.innerHTML(highScore.yourScore);
    ulScoreItem.appendChild(liItem);
  };

  liItem.forEach();
  addNewLi();
});