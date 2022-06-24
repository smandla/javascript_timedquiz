const storedData = localStorage.getItem("highscores") || "[]";
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
let highscore_area = document.getElementById("highscores");
let highscore_table = document.getElementById("highscore_table");

/**
 * variables
 */
var savedName;
let questionNum = 1;
let rightAnswers = 0;
let wrongAnswers = 0;
let maxSeconds = 25;
let totalAnswered;

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
 * Function playGame()
 *
 */
const playGame = () => {
  // savedName = nameVal.value;
  showQuestion();
  // startTimer();
};

/**
 * Function that changes UI based on question number, question, and timer. Also sets answer buttons for each question
 */
const showQuestion = () => {
  // console.log(savedName);
  // console.log(rightAnswers, wrongAnswers);
  // show question_numbers
  question_number.innerHTML = "Question " + questionNum + " of " + totalQs;
  //show timer
  timer_view.innerHTML = maxSeconds + "s";
  //show question from quizBank
  question_field.innerHTML = quizBank[questionNum - 1].question;
  //similar to display:none
  // nameVal.remove();
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
  e.preventDefault();
  let userAnswer = e.target.innerHTML;
  // console.log(userAnswer);
  if (userAnswer === quizBank[questionNum - 1].answer) {
    rightAnswers++;
    goToNextQuestion();
  } else {
    wrongAnswers++;

    // if (maxSeconds <= 0) {
    //   // answerBox.innerHTML = "";
    //   gameIsOver();
    //   //   break;
    // }
    // maxSeconds -= 10;

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
    console.log("game is over");
    gameIsOver();
  }
};

// const startTimer = () => {
//   let timer = setInterval(() => {
//     // console.log(maxSeconds);
//     //decremement maxSeconds
//     maxSeconds--;
//     // if()
//     //change ui everytime timer changes
//     timer_view.innerHTML = maxSeconds + " s";
//     //when timer is less than 0
//     //when questions answered is equal to totalQ's stop timer
//     totalAnswered = rightAnswers + wrongAnswers;
//     if (maxSeconds <= 0 || totalAnswered === totalQs) {
//       // maxSeconds = 0;
//       clearInterval(timer);
//       //game is over too
//       gameIsOver();
//     }
//   }, 1000);
// };
const gameIsOver = () => {
  // console.log(questionNum);
  answerBox.innerHTML = "";
  totalAnswered = rightAnswers + wrongAnswers;
  question_field.innerHTML =
    "You solved " +
    totalAnswered +
    " out of " +
    totalQs +
    ". You got " +
    rightAnswers +
    " correct out of " +
    totalQs +
    " questions";

  let restartBtn = document.createElement("button");
  restartBtn.innerHTML = "Restart Game";
  restartBtn.classList.add("button1");
  answerBox.appendChild(restartBtn);
  restartBtn.addEventListener("click", resetGame);

  // console.log(maxSeconds);
  console.log(document.body);
  if (maxSeconds < 0) {
    maxSeconds = 0;
  }
  let userData = {
    user: savedName,
    score: rightAnswers,
    time: maxSeconds,
  };
  const highscores = [...JSON.parse(storedData), userData]
    .sort(function (a, b) {
      return b.score - a.score;
    })
    .slice(0, 5);
  console.log("highscores length", highscores.length);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  // highscore_area.remove();
  highscore_area.classList.add("display");
  highscore_table.innerHTML = "";
  //   highscore_area.style.display = "inli";
  for (let i = 0; i < highscores.length; i++) {
    // console.log(highscores[i].user, highscores[i].score);
    let table_row = document.createElement("tr");
    let user = document.createElement("td");
    let score = document.createElement("td");
    let time = document.createElement("td");
    let user_data1 = document.createTextNode(highscores[i].user);
    let score_data2 = document.createTextNode(highscores[i].score);
    let time_data = document.createTextNode(highscores[i].time);

    user.appendChild(user_data1);
    score.appendChild(score_data2);
    time.appendChild(time_data);
    table_row.appendChild(user);
    table_row.appendChild(score);
    table_row.appendChild(time);
    highscore_table.appendChild(table_row);
  }
  // maxSeconds = 0;
};
const resetGame = () => {
  maxSeconds = 25;
  questionNum = 1;
  rightAnswers = 0;
  wrongAnswers = 0;
  // totalQs = 0;
  // highscores.remove();
  // highscore_area.innerHTML = "";
  highscore_area.classList.remove("display");
  // highscore_table.innerHTML = "";
  playGame();
};
startGameBtn.addEventListener("click", playGame);

// localStorage.removeItem("highscores");

/**
 *
 *
 * BUG: negative # shows up for timer after wrong answer timer deduction
 * timer problem still...
 */

/***
 *
 *
 *
 * STYLING that <input type="text" placeholder="Enter name" class="input" id="name" />
 */
