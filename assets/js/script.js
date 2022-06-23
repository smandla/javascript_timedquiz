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

/**
 * variables
 */
var savedName;
let questionNum = 1;
let rightAnswers = 0;
let wrongAnswers = 0;
let maxSeconds = 25;

// Question Bank
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

/**
 * Function that changes UI based on question number, question, and timer. Also sets answer buttons for each question
 */
const showQuestion = () => {
  // show question_numbers
  question_number.innerHTML = "Question " + questionNum + " of " + totalQs;
  //show timer
  timer_view.innerHTML = maxSeconds + "s";
  //show question from quizBank
  question_field.innerHTML = quizBank[questionNum - 1].question;
  //similar to display:none
  nameVal.remove();
  //similar to display:none
  startGameBtn.remove();
  answerBox.innerHTML = "";

  // options is the array of options
  let options = quizBank[questionNum - 1].options;

  //give answer button an element for each index and style it
  for (let i = 0; i < options.length; i++) {
    let answerBtn = document.createElement("button");
    answerBtn.innerHTML = options[i];
    answerBox.appendChild(answerBtn);
    answerBox.classList.add("answer_box");
    answerBtn.classList = "answer_btn";
    // add onclick event listener
    answerBtn.addEventListener("click", checkAnswer);
  }
};
/**
 * Function that checks if answer is right wrong, continues to next question
 * @param {*} e
 */
const checkAnswer = (e) => {
  let userAnswer = e.target.innerHTML;
  console.log(userAnswer);
  if (userAnswer === quizBank[questionNum - 1].answer) {
    rightAnswers++;
    goToNextQuestion();
  } else {
    wrongAnswers++;
    goToNextQuestion();
  }
};
/**
 * Function increment question number and show question
 */
const goToNextQuestion = () => {
  // increment question number
  //add condition to make sure question number is less than total number
  if (questionNum < totalQs) {
    questionNum++;
    console.log(questionNum);
    showQuestion();
  } else {
    gameIsOver();
  }
};
const playGame = () => {
  if (nameVal.value) {
    savedName = nameVal.value;
  } else {
    alert("Please enter your name!");
  }

  showQuestion();
  startTimer();
};

const startTimer = setInterval(() => {
  //decremement maxSeconds
  //change ui everytime timer changes

  //when timer is less than 0
  if (maxSeconds <= 0) {
    clearInterval(startTimer);
    //game is over too
  }
}, 1000);
const gameIsOver = () => {
  answerBox.innerHTML = "";
  question_field.innerHTML = "You got " + rightAnswers + " out of " + totalQs;
};
startGameBtn.addEventListener("click", playGame);

/**
 * TODO
 * Local storage for high score
 *
 * BUG: goes past # of total questions
 */
