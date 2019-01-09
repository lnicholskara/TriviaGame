var quizQuestions = [
    {question: "Leslie Knope marries two gay penguins at the Pawnee Zoo for publicity. Which local bar celebrates this union?",
    answers: {
      a: "The Glitter Factory",
      b: "The Bulge",
      c: "Tom’s Bistro",
      d: "Snakehole Lounge"
    },
    correctAnswer: "b",
    fullAnswer: "The Bulge",
    },

    {question: "Where does April Ludgate get her “lively and colorful” personality from?",
    answers: {
      a: "Her love of dogs",
      b: "Her boisterous family",
      c: "Her Puerto Rican heritage",
      d: "Her fascination with Halloween"
    },
    correctAnswer: "c",
    fullAnswer: "her Puerto Rican heritage",
    },

    {question: "Who does Leslie Knope run against during her Pawnee City Council race?",
    answers: {
      a: "Bobby Newport",
      b: "Denver Newport",
      c: "James Newport",
      d: "Nick Newport"
    },
    correctAnswer: "a",
    fullAnswer: "Bobby Newport",
    },

    {question: "What fictional game does Ben Wyatt invent after “resigning in disgrace”?",
    answers: {
      a: "Settlers of Catan",
      b: "Icetown",
      c: "Cones of Dunshire",
      d: "Gryzzl"
    },
    correctAnswer: "c",
    fullAnswer: "Cones of Dunshire",
    },

    {question: "How many times does Ron Swanson get married?",
    answers: {
      a: "1",
      b: "2",
      c: "3",
      d: "4"
    },
    correctAnswer: "d",
    fullAnswer: "4",
    },

    {question: "Which 90s R&B sensation is Donna Meagle’s cousin?",
    answers: {
      a: "Brian McKnight",
      b: "Ginuwine",
      c: "Dru Hill",
      d: "Mary J. Blige"
    },
    correctAnswer: "b",
    fullAnswer: "Ginuwine",
    },
]

var resultsPictures = ["https://giphy.com/gifs/vy3mYVqIyXpsc/html5",]

var questionCounter = 0; 
var correctAnswers = 0;
var incorrectAnswers = 0;
var correctAnswer;

var isTimerRunning = false; 
var intervalID;
var time;

function startTimer() {
    if (!isTimerRunning) {
        time = 10; 
        $("#countdown").text("Time Left: " + time); 
        intervalID = setInterval(count, 1000);
        isTimerRunning = true; 
    }
};

function stopTimer() {
    clearInterval(intervalID);
    isTimerRunning = false; 
};

function count() {
        time --;
        $("#countdown").text("Time Left: " + time); 
        if (time === 0) {    
            stopTimer();
            timedOut(); 
        }
};

function resetQuiz () {
    console.log("does reset work?")
    correctAnswers = 0;
    incorrectAnswers = 0;
    questionCounter = 0;
    timedOutCounter = 0;

    $(".content").empty();
    $(".content").append("<h2>Treat Yo' Self to this Quiz!</h2><br><img src='https://media.giphy.com/media/UDnYoVs7GHyU/giphy.gif'><br><br><button type='button' class='btn btn-warning btn-lg'>Start Now</button>")
    $(".btn-warning").on("click", function () {
      $(".content").empty();
      nextQuestion(questionCounter); 
      startTimer();
    });


    $(".content").off("click");
    $(".content").on("click", ".btn-info", function () {      
      var userGuess = $(this).attr("value");
      if (userGuess === correctAnswer){
        correctAnswers++;
        rightAnswer();
        stopTimer(); 
      }
      else {
        incorrectAnswers++;
        wrongAnswer(); 
        stopTimer(); 
      }
    });
};

function nextQuestion(questionCounter) {
    $(".content").append("<h3>" + quizQuestions[questionCounter].question + "</h3><br><button type='button' class='btn btn-info' value='a'>" + quizQuestions[questionCounter].answers.a + "</button><br><button type='button' class='btn btn-info' value='b'>" + quizQuestions[questionCounter].answers.b + "</button><br><button type='button' class='btn btn-info' value='c'>" + quizQuestions[questionCounter].answers.c + "</button><br><button type='button' class='btn btn-info' value='d'>" + quizQuestions[questionCounter].answers.d + "</button><br><div id='countdown'></div>")
    checkQuestion(questionCounter);
};
        
function checkQuestion(questionCounter) {
  correctAnswer = quizQuestions[questionCounter].correctAnswer
};

function rightAnswer () {  
  $(".content").empty();
  $(".content").append("<h4>Congratulations! The correct answer is " + quizQuestions[questionCounter].fullAnswer + ".</h4><br><br><img src='https://media.giphy.com/media/G8yIJMTsWptuM/giphy.gif' alt=Ron Dancing'>");
  setTimeout(questionReset, 2 * 1000); 
};

function wrongAnswer () {
  $(".content").empty();
  $(".content").append("<h4>Incorrect. The right answer is " + quizQuestions[questionCounter].fullAnswer + ".</h4><br><br><img src='https://media.giphy.com/media/vy3mYVqIyXpsc/giphy.gif' alt='Nice Try'>");
  setTimeout(questionReset, 2 * 1000); 
};

function timedOut () {
  incorrectAnswers++;
  $(".content").empty();
  $(".content").append("<h4>Times up Jerry! The right answer is " + quizQuestions[questionCounter].fullAnswer + ".</h4><br><br><img src='https://media.giphy.com/media/yRAAHNTBGegNi/giphy.gif' alt='Watch it!'>");
  setTimeout(questionReset, 2 * 1000); 
};

function questionReset() {   
  questionCounter++;
    if (questionCounter < quizQuestions.length) {
      $(".content").empty(); 
      nextQuestion(questionCounter);
      startTimer();
    }
    else {
      gameOver();
    }
};

function gameOver () {
  $(".content").empty();
  $(".content").append("<h4>Correct Answers: " + correctAnswers + "</h4><br><h4>Incorrect Answers: " + incorrectAnswers + "</h4><br><button type='button' class='btn btn-primary btn-lg'>Restart Now</button><br><br><img src='https://media.giphy.com/media/DHguk0osZWB7W/giphy.gif' alt='Great idea'>")
  $(".content").on("click", ".btn-primary", function () {
    resetQuiz();
  });
};