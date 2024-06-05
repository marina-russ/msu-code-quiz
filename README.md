# code-quiz
A timed JavaScript coding quiz with multiple-choice questions

## :star: Objectives:
- generate quiz where answers are shown in random order
- display timer countdown during quiz
- once quiz is completed, save score
- view previous scores

## :heart: Additional Features:
- clicked answer turns green for correct or red for incorrect
- user can see their progress on total questions
- retro legend of zelda theme

## Future Development Ideas
- Add more questions.
- Check that submitted initials are 3 letters in length, no numbers or symbols.
- Accept keyboard input for selecting answers.
- Change to a module framework so questions can be separated to a separate file from script.js.
- Randomize the sequence in which potential answers are listed.
- Perhaps have scores include some additional information, such as time remaining.
- Question Count, change css color as quiz progresses?
- A page that shows questions you answered incorrectly, so you can study them further.


## :triangular_ruler: Deployed App

[Deployed App](https://marina-russ.github.io/msu-code-quiz/)

![Screenshot](/assets/quiz-screenshot.png)


- Used `pointer-event` to apply hover effect on one specific child element of a parent element
- Used `ul ::marker { font-size: 0; }` to hide the list style marker as opposed to `list-style: none;` which removes the semantic meaning of `<li>` within Safari browsers. 



## REFACTORING
- Fixed Bugs: 
    - Issue with saving and displaying scores.
    - 'Start Quiz' button could be clicked multiple times, which would increase Question Count
    - Fixed issue where initialization of timer took two seconds, resulting in "starting" at 4:59 instead of 5:00.
- New features: 

- Made multiple functions instead of one big function
- Changed folder structure, /assets now broken up into /img and /css
- Did not style buttons and links to look exactly the same
- Updated CSS styling to a more modern look.
- Removed unused HTML classes and IDs.


TODO:
Don't accept input if initials are blank
When adding new score, it doesn't format properly. But then when you reload page, it does...