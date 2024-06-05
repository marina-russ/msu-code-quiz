// DOM ELEMENTS
const saveButton = document.getElementById("btn__save-score");
const finalScoreElement = document.getElementById("result__user-score");
const inputInitials = document.getElementById("result__user-initials");
const scoreEntryList = document.getElementById("score-list__entry__block"); // for appending child elements

// GLOBAL VARIABLES
let mostRecentScore = localStorage.getItem("mostRecentScore");
let newEntry = {};
let scoreHistoryArray = JSON.parse(localStorage.getItem("scoreHistory")) || [];

// Shows user their quiz result
finalScoreElement.innerText = mostRecentScore;

function displayStoredScores() {
  // For each item in array, create <ul>
  scoreHistoryArray.forEach((entry) => {
    // 1. Create new <ul> & <li> elements
    let unorderedEl = document.createElement("ul");
    let initialsListItem = document.createElement("li");
    let scoreListItem = document.createElement("li");

    // 2. Add CSS classes
    unorderedEl.classList.add("score-list__entry__row");
    initialsListItem.classList.add("score-list__entry__user-initials");
    scoreListItem.classList.add("score-list__entry__user-score");

    // 3. Add text nodes with data
    initialsListItem.appendChild(document.createTextNode(entry.userInitials));
    scoreListItem.appendChild(document.createTextNode(entry.userScoreValue));

    // 4. Append elements for DOM rendering
    unorderedEl.appendChild(initialsListItem);
    unorderedEl.appendChild(scoreListItem);
    scoreEntryList.appendChild(unorderedEl);
  });
}

displayStoredScores();

function createNewEntry() {
  let newInitials = inputInitials.value;
  let newScoreValue = mostRecentScore;

  newEntry = {
    "userInitials": newInitials,
    "userScoreValue": newScoreValue,
  };

  return newEntry;
}

function saveNewEntry() {
  scoreHistoryArray.push(newEntry);
  localStorage.setItem("scoreHistory", JSON.stringify(scoreHistoryArray));
}

function addNewScore() {
  console.log(newEntry);
  // 1. Grab data from object entry
  let newInitials = newEntry.userInitials;
  let newScoreValue = newEntry.userScoreValue;

  // 2. Create <ul> element containing data
  let newEntryEl = document.createElement("ul");
  newEntryEl.classList.add("score-entry-data");

  // 3. Create <li> child elements
  let newInitialsList = document.createElement("li");
  let newScoreList = document.createElement("li");

  // 4. Set CSS classes
  newInitialsList.classList.add("user-initials");
  newScoreList.classList.add("user-initials");

  // 5. Add text nodes with data
  newInitialsList.appendChild(document.createTextNode(`${newInitials}`));
  newScoreList.appendChild(document.createTextNode(`${newScoreValue}`));

  // 6. Append <li> child elements to <ul>
  newEntryEl.appendChild(newInitialsList);
  newEntryEl.appendChild(newScoreList);

  // 7. Append <ul> items as children of <li id="score-entry-list">, for DOM rendering
  scoreEntryList.appendChild(newEntryEl);
}

saveButton.addEventListener("click", function (e) {
  e.preventDefault();

  createNewEntry();
  saveNewEntry(newEntry);
  addNewScore({ newEntry });
});
