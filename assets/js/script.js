//receive data from localstorage
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
let nameInput = document.createElement("input");
let submitNameBtn = document.createElement("button");
let restartBtn = document.createElement("button");

/**
 * variables
 */
var savedName;
let currentQuestion = 1;
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
 * Function to play game
 */
const playGame = () => {
  showQuestion();
  timer();
};

/**
 * Function that changes UI based on question number, question, and timer. Also sets answer buttons for each question
 */
const showQuestion = () => {
  // show question_numbers
  question_number.innerHTML = "Question " + currentQuestion + " of " + totalQs;
  //show timer
  timer_view.innerHTML = maxSeconds + "s";
  //show question from quizBank
  question_field.innerHTML = quizBank[currentQuestion - 1].question;

  //similar to display:none
  startGameBtn.remove();
  //remove html inside answer box
  answerBox.innerHTML = "";

  // options is the array of options
  let options = quizBank[currentQuestion - 1].options;

  //give answer button an element for each index and style it
  for (let i = 0; i < options.length; i++) {
    let answerBtn = document.createElement("button");
    answerBtn.innerHTML = options[i];
    //adds btn to answer box element
    answerBox.appendChild(answerBtn);
    answerBox.classList.add("answer_box");
    answerBtn.classList = "answer_btn";
    // add onclick event listener to check answer
    answerBtn.addEventListener("click", checkAnswer);
  }
};
/**
 * Function that checks if answer is right wrong, continues to next question
 *
 */
const checkAnswer = (e) => {
  e.preventDefault();
  //get the user answer from the button html
  let userAnswer = e.target.innerHTML;

  //check to see if user answer matches actual answer
  if (userAnswer === quizBank[currentQuestion - 1].answer) {
    //increment right answers
    rightAnswers++;
    //proceed to next question
    goToNextQuestion();
  } else {
    //increment wrong answers
    wrongAnswers++;
    //give time penalty by 10s
    maxSeconds -= 10;

    //proceed to next question
    goToNextQuestion();
  }
};
/**
 * Function increment question number and show question
 */
const goToNextQuestion = () => {
  //if currentQuestion is less than the total # of questions...
  if (currentQuestion < totalQs) {
    // increment question number
    currentQuestion++;

    //display question by changing ui
    showQuestion();
  } else {
    // game is over
    gameIsOver();
  }
};

/**
 * timer function
 */
const timer = () => {
  let timeLeft = setInterval(() => {
    //decremement maxSeconds
    maxSeconds--;
    //change ui everytime timer changes
    timer_view.innerHTML = maxSeconds + " s";
    //when timer is less than 0
    totalAnswered = rightAnswers + wrongAnswers;
    if (maxSeconds <= 0) {
      timer_view.innerHTML = "0 s";
      clearInterval(timeLeft);
      //game is over too
      gameIsOver();
    }
    //end timer when player is done before the timer
    if (totalAnswered === totalQs) {
      clearInterval(timer);
      gameIsOver();
    }
  }, 1000);
};
/**
 * Game is over function
 * that changes ui
 */
const gameIsOver = () => {
  //remove answer btns
  answerBox.innerHTML = "";
  //get total answered
  totalAnswered = rightAnswers + wrongAnswers;
  //show user results
  question_field.innerHTML =
    "You got " + rightAnswers + " correct out of " + totalQs + " questions.";

  // add class and styling to name Input
  nameInput.classList.add("input");
  nameInput.type = "text";
  nameInput.placeholder = "Enter name";
  answerBox.appendChild(nameInput);

  // add class and add to document
  submitNameBtn.classList.add("button1");
  submitNameBtn.innerHTML = "Submit";
  answerBox.appendChild(submitNameBtn);
  submitNameBtn.addEventListener("click", showScores);
};

/**
 * show Scores once name has been submitted
 */
const showScores = () => {
  //if there is no name value then alert user and recall game is over function to resubmit name
  if (!nameInput.value) {
    alert("Please enter your name");
    gameIsOver();
  } else {
    //save user name
    savedName = nameInput.value;

    //change ui by removing elements
    nameInput.remove();
    submitNameBtn.remove();

    //add class and styling and add to document
    restartBtn.classList.add("button1");
    restartBtn.innerHTML = "Restart Game";
    restartBtn.addEventListener("click", resetGame);
    answerBox.appendChild(restartBtn);

    //display highscore section
    highscore_area.classList.add("display");
    //if maxSeconds is negative, save as 0
    if (maxSeconds < 0) {
      maxSeconds = 0;
    }
    //save user info as an object
    let userData = {
      user: savedName,
      score: rightAnswers,
      time: maxSeconds,
    };
    //parse data from local storage and add user data. data is sorted and only the first five are shown
    const highscores = [...JSON.parse(storedData), userData]
      .sort(function (a, b) {
        return b.score - a.score;
      })
      .slice(0, 5);

    //set the local storage item with updated high scores
    localStorage.setItem("highscores", JSON.stringify(highscores));

    highscore_table.innerHTML = "";
    let table_columns = ["User", "Score", "Time"];
    let table_row_titles = document.createElement("tr");
    let user_title = document.createElement("td");
    let score_title = document.createElement("td");
    let time_title = document.createElement("td");
    let user_title1 = document.createTextNode(table_columns[0]);
    let score_title1 = document.createTextNode(table_columns[1]);
    let time_title1 = document.createTextNode(table_columns[2]);
    user_title.appendChild(user_title1);
    score_title.appendChild(score_title1);
    time_title.appendChild(time_title1);
    table_row_titles.appendChild(user_title);

    table_row_titles.appendChild(score_title);
    table_row_titles.appendChild(time_title);
    highscore_table.appendChild(table_row_titles); //
    for (let i = 0; i < highscores.length; i++) {
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
  }
};

const resetGame = () => {
  maxSeconds = 25;
  currentQuestion = 1;
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
 * BUG: wont let me type name until timer is out
 */
