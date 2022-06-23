/**
 * Set timer when start button is clicked
 */
//
/**
 * When start quiz button is clicked, make sure input has a value
 * show question_number, start timer, show question, show answer buttons
 */
let startGameBtn = document.querySelector("#start_quiz");
let nameVal = document.getElementById("name");
let questionField = document.getElementById("question_field");
let questionNumber = document.getElementById("question_number");
let answerBox = document.getElementById("answer");
let timerView = document.getElementById("timer_seconds");

var savedName;
const checkAndSaveInput = () => {};

const playGame = () => {
  if (nameVal.value) {
    savedName = nameVal.value;
  } else {
    alert("Please enter your name!");
  }

  showQuestions();
};
startGameBtn.addEventListener("click", playGame);
