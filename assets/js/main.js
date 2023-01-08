const questionEl = document.querySelector("#questions") //where it is in the HTML
const answersEL = document.querySelector("#choices")
const resultsEl = document.querySelector("#results")
const endResults = document.querySelector("#end-result")
const questionScreen = document.querySelector("#question-screen")
const highscoreScreen = document.querySelector("#highscore-screen")
const goBackBtn = document.querySelector("#go-back")
const viewHighScore = document.querySelector("#scoreboard")
const navigationBar = document.querySelector("#navigation")
const splashScreen = document.querySelector("#splash-screen")
const timerTag = document.querySelector("#timer")
const scoreTag = document.querySelector("#score")
const finalScoreTag = document.querySelector("#final-score");

let score = 0
let time = 120
let timer;
let timeoutId;

//local storage
const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [] 

//looks for the "key" leaderboard in the browser, 
//if it exists then it returns the value inside leaderboard key 
//otherwise returns an empty array because of the or operator


//quiz information
const QUIZ_LIST = [
  {  
    question: "what's my fav color?",
    answerChoices: [
      {answer: "red", isCorrect: true},
      {answer:"blue",isCorrect: false},
      {answer:"green", isCorrect: false},
      {answer:"yellow",isCorrect: false}
    ]
  },

  {
    question: "what's my fav animal?",
    answerChoices: [
      {answer: "dog", isCorrect: true},
      {answer: "cat", isCorrect: false},
      {answer: "bird", isCorrect: false},
      {answer: "rabbit", isCorrect: false}
    ]

  },

  {
    question: "what's my fav food?",
    answerChoices: [
      {answer: "fries", isCorrect: true},
      {answer: "pizza", isCorrect: false},
      {answer: "tacos", isCorrect: false},
      {answer: "pasta", isCorrect: false}
    ]
  }
]
let quiz = [...QUIZ_LIST] // shallow copy of quiz



function getRandomQuestion() {
  let randomQuestionIdx = Math.floor(Math.random() * quiz.length); //keeping track of the questions to be displayed
  const randomQuestionObj = quiz[randomQuestionIdx];
  removeQuestionFromList(randomQuestionIdx);
  
  return randomQuestionObj;
}

function removeQuestionFromList(questionIdx) {
  for (let i = 0; i < quiz.length; i++) {
    if (i === questionIdx) {
      quiz.splice(questionIdx, 1);
    }
  }
}

function navigateToResultsScreen() {
  clearTimeout(timer);
  finalScoreTag.innerText = score;
  toggleHTMLElement(endResults, questionScreen)
}

function displayQuestion() {
  clearTimeout(timeoutId);
  const currentQuestionObj = getRandomQuestion(); //so all the info lives here i guess and therfore we need a codename for it
  if (currentQuestionObj === undefined) { //so when we run out of questions goes to final screen
    return navigateToResultsScreen();
  } 

  const shuffledChoices = currentQuestionObj.answerChoices.sort(() => Math.random() - .5)
  questionEl.textContent = currentQuestionObj.question; //this shows the question on the screen

  for (let i = 0; i < shuffledChoices.length; i++) { 
    const currentAnswerChoice = shuffledChoices[i]; //grabs the info
    createAnswerBtn(currentAnswerChoice)//puts it in the function
  }
}

function createAnswerBtn(answerChoice){
  const answerBtn = document.createElement("button"); //this makes a button
  answerBtn.className = "answer-choices"; //this is to style
  answerBtn.innerText = answerChoice.answer;//this shows text on button
  answerBtn.value = answerChoice.isCorrect;//this makes it true or false, since we're storing this into the value it becomes a string
  answersEL.appendChild(answerBtn);//this adds it to the DOM
}

function toggleHTMLElement(elementToDisplay, elementToHide){
  elementToDisplay.classList.remove("hidden") //displays screen
  elementToHide.classList.add("hidden") //hides other screen
}

function submitScores() {
  const initialsBox = document.querySelector("#initials-box")
  const initialsValue = initialsBox.value.trim() //grabbing the value inside the input tag
  if (!initialsValue.length) {
    return alert('Please insert initials')
  } else if (initialsValue.length > 5) {
    return alert('Please enter initials no longer than 5 characters')
  }
  leaderBoard.push({initials: initialsValue, score: score}) //saving the initials and score in the leaderboard array
  localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard)) //saving leaderboard array to the browser
  navigationBar.classList.remove("hidden");
  navigateToLeaderboard(endResults)
  initialsBox.value = "";
}

function displayLeaderboardItems() {
  const sortedLeaderboard = leaderBoard.sort((a, b) => b.score - a.score);
  highscoreScreen.innerHTML = "";

  for (let i = 0; i < Math.min(sortedLeaderboard.length, 10); i++) {
    const currentLeaderboardItem = sortedLeaderboard[i];
    const leaderboardItemHTML = (
      `<div class="flex leaderboard-item">
        <p>${currentLeaderboardItem.initials}</p>
        <p>${currentLeaderboardItem.score}</p>
      </div>`
    )

    highscoreScreen.innerHTML += leaderboardItemHTML;
  }
}

function hideHTMLEl(HTMLel) {
  HTMLel.classList.add("hidden")
}

function navigateToLeaderboard(screenToHide) {
  displayLeaderboardItems()
  toggleHTMLElement(goBackBtn, viewHighScore)
  toggleHTMLElement(highscoreScreen, screenToHide)
}

function navigateToSplashScreen() {
  toggleHTMLElement(viewHighScore, goBackBtn)
  toggleHTMLElement(splashScreen, highscoreScreen)
}

function setTimer() {
  timer = setInterval(() => {
    time -= 1;
    timerTag.innerText = time;

    if (time <= 0) {
      navigateToResultsScreen()
    }
  }, 1000)
}
function startQuiz() {
  resetQuiz();
  displayQuestion();
  toggleHTMLElement(questionScreen, splashScreen);
  hideHTMLEl(navigationBar);
  setTimer();
}

function resetQuiz() {
  score = 0;
  scoreTag.innerText = score;
  time = 120;
  timerTag.innerText = time;
  resultsEl.innerHTML = "";
  quiz = [...QUIZ_LIST];
}

answersEL.addEventListener("click", (event) => {
  const tagName = event.target.tagName;

  if (tagName === "BUTTON") {
    const rightAnswer = JSON.parse(event.target.value);//makes the isCorrect value a boolean

    if (rightAnswer) {
      score += 10;
      scoreTag.innerText = score;
      resultsEl.innerHTML = "<p>Correct!</p>"; 
    } else {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerTag.innerText = time;
      resultsEl.innerHTML = "<p>Wrong!</p>";
    }
    setTimeout(() => {
      answersEL.innerHTML = ""; //remvoving previous answer choices
      resultsEl.innerHTML = "";
      displayQuestion()
    }, 1250);
  }
})

endResults.addEventListener("click", (event) => {
  if (event.target.id === "submit") {
    submitScores()
  }
})

navigationBar.addEventListener("click", (event) => {
  if (event.target.id === "go-back") {
    navigateToSplashScreen();
  } else if (event.target.id === "scoreboard") {
    navigateToLeaderboard(splashScreen)
  }
})

splashScreen.addEventListener("click", (event) => {
  if (event.target.id === "play-game") {
    startQuiz()
  }
})