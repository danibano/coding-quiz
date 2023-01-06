const questionEl = document.querySelector("#questions") //where it is in the HTML
const answersEL = document.querySelector("#choices")
const resultsEl = document.querySelector("#results")
const previousQuestions = []

//quiz information
const quiz = [
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

function displayQuestion() {
  const currentQuestionObj = getRandomQuestion(); //so all the info lives here i guess and therfore we need a codename for it
  questionEl.textContent = currentQuestionObj.question; //this shows the question on the screen

  
  for (let i = 0; i < currentQuestionObj.answerChoices.length; i++) { 
    const currentAnswerChoice = currentQuestionObj.answerChoices[i]; //grabs the info
    createAnswerBtn(currentAnswerChoice)//puts it in the function
  }
}

function createAnswerBtn(answerChoice){
    const answerBtn = document.createElement("button"); //this makes a button
    answerBtn.innerText = answerChoice.answer;//this shows text on button
    answerBtn.value = answerChoice.isCorrect;//this makes it true or false, since we're storing this into the value it becomes a string
    answersEL.appendChild(answerBtn);//this adds it to the DOM
}

answersEL.addEventListener("click", (event) => {
  const rightAnswer = JSON.parse(event.target.value);//makes the isCorrect value a boolean
  if (rightAnswer) {
    resultsEl.innerHTML = "<p>Correct!</p>"; 
  } else {
    resultsEl.innerHTML = "<p>Wrong!</p>";
  }

  answersEL.innerHTML = ""; //remvoving previous answer choices
  displayQuestion()
})

displayQuestion()