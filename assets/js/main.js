const questionEl = document.querySelector("#questions")
const answersEL = document.querySelector("#choices")
const resultsEl = document.querySelector("#results")

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

  }
]

questionEl.textContent = quiz[0].question;

for (let i = 0; i < quiz[0].answerChoices.length; i++){
  const answerBtn = document.createElement("button");
  answerBtn.innerText = quiz[0].answerChoices[i].answer;
  answerBtn.value = quiz[0].answerChoices[i].isCorrect;
  answersEL.appendChild(answerBtn);
}

answersEL.addEventListener("click", (event) => {
  const rightAnswer = JSON.parse(event.target.value);
  if (rightAnswer) {
    resultsEl.innerHTML = "<p>Correct!</p>";
  } else {
    resultsEl.innerHTML = "<p>Wrong!</p>";
  }

})