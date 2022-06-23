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
let question_field = document.getElementById("question_field");
let question_number = document.getElementById("question_number");
let answerBox = document.getElementById("answer");
let timer_view = document.getElementById("timer_seconds");

var savedName;
let questionNum = 1;
let quizBank = [
  {
    question: "What is not a data type supported by JavaScript?",
    options: ["Boolean", "String", "Object", "Stream"],
    answer: "Stream",
  },
  {
    question: "What is the right syntax for an object?",
    options: ["[ ]", "( )", "{ }", "' '"],
    answer: "{ }",
  },
  {
    question: "Which type of variable can be modified?",
    options: ["var", "const", "constant", "let"],
    answer: "let",
  },
  {
    question: 'What is \'console.log(5 + 2 + "3")',
    options: ["103", "10", "7 + '3'", "73"],
    answer: "73",
  },
  {
    question: "How do you do a multiline comment?",
    options: ["//", "/** **/", "*/ /*", "//* *//"],
    answer: "/** **/",
  },
];
let totalQs = quizBank.length;
let maxSeconds = 25;
const checkAndSaveInput = () => {};
const showQuestions = () => {
  // show question_numbers
  question_number.innerHTML = "Question " + questionNum + " of " + totalQs;
  timer_view.innerHTML = maxSeconds + "s";
  question_field.innerHTML = quizBank[questionNum - 1].question;
  nameVal.remove();
};
const playGame = () => {
  if (nameVal.value) {
    savedName = nameVal.value;
  } else {
    alert("Please enter your name!");
  }

  showQuestions();
};
startGameBtn.addEventListener("click", playGame);
