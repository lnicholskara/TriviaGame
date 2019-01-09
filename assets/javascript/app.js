//Declare global variables
var quizQuestions = [
    {question: "At which local watering hole is Leslie Knope revered for marrying two gay penguins at the Pawnee Zoo?",
    answers: {
      a: "The Glitter Factory",
      b: "The Bulge",
      c: "Tom’s Bistro",
      d: "Snakehole Lounge"
    },
    correctAnswer: "b"
    },

    {question: "Where does April Ludgate get her “lively and colorful” personality from?",
    answers: {
      a: "Her love of dogs",
      b: "Her boisterous family",
      c: "Her Puerto Rican heritage",
      d: "Her fascination with Halloween"
    },
    correctAnswer: "c"
    },

    {question: "Who does Leslie Knope run against during her City Council race?",
    answers: {
      a: "Bobby Newport",
      b: "Denver Newport",
      c: "James Newporte",
      d: "Nick Newport"
    },
    correctAnswer: "a"
    },

    {question: "What fictional game does Ben Wyatt invent after “resigning in disgrace”?",
    answers: {
      a: "Settlers of Catan",
      b: "Icetown",
      c: "Cones of Dunshire",
      d: "Gryzzl"
    },
    correctAnswer: "c"
    },

    {question: "How many times does Ron Swanson get married?",
    answers: {
      a: "1",
      b: "2",
      c: "3",
      d: "4"
    },
    correctAnswer: "d"
    },

    {question: "Which 90s R&B sensation is Donna Meagle’s cousin?",
    answers: {
      a: "Brian McKnight",
      b: "Ginuwine",
      c: "Dru Hill",
      d: "Mary J. Blige"
    },
    correctAnswer: "b"
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
        $("#countdown").text(time); 
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
        $("#countdown").text(time); 
        if (time === 0) {    
            stopTimer();
            timedOut(); 
        }
};

function resetQuiz () {
    correctAnswers = 0;
    incorrectAnswers = 0;
    questionCounter = 0;
    timedOutCounter = 0;

    $(".content").append("<h2>Click Below to Treat Yo' Self to this Quiz!</h2><br><br><button type='button' class='btn btn-warning btn-lg'>Start Now</button>")
    $(".btn-warning").on("click", function () {
      $(".content").empty();
      nextQuestion(questionCounter); 
      startTimer();
    });
};

function nextQuestion(questionCounter) {
    $(".content").append("<h3>" + quizQuestions[questionCounter].question + "</h3><br><button type='button' class='btn btn-info' value='a'>" + quizQuestions[questionCounter].answers.a + "</button><br><button type='button' class='btn btn-info' value='b'>" + quizQuestions[questionCounter].answers.b + "</button><br><button type='button' class='btn btn-info' value='c'>" + quizQuestions[questionCounter].answers.c + "</button><br><button type='button' class='btn btn-info' value='d'>" + quizQuestions[questionCounter].answers.d + "</button><br><div id='countdown'>10</div>")
    checkQuestion(questionCounter);
};
        
function checkQuestion(questionCounter) {
  
  correctAnswer = quizQuestions[questionCounter].correctAnswer
  console.log(correctAnswer); 

  $(".content").on("click", ".btn-info", function () {
            
    var userGuess = $(this).attr("value"); 
    console.log(userGuess); 
    
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

function rightAnswer () {
  
  $(".content").empty();
  $(".content").append("<h4>Congratulations, the correct answer is " + quizQuestions[questionCounter].correctAnswer + "</h4>");
  setTimeout(questionReset, 2 * 1000); 
};

function wrongAnswer () {
  
  $(".content").empty();
  $(".content").append("<h4>Incorrect! The right answer is " + quizQuestions[questionCounter].correctAnswer + "</h4>");
  setTimeout(questionReset, 2 * 1000); 
};

function timedOut () {
  incorrectAnswers++;
  $(".content").empty();
  $(".content").append("<h4>You ran out of time :( The right answer is " + quizQuestions[questionCounter].correctAnswer + "</h4>");
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
    $(".content").append("<h4>Correct Answers: " + correctAnswers + "</h4><br><h4>Incorrect Answers: " + incorrectAnswers + "</h4><br><br><button type='button' class='btn btn-secondary btn-lg'>Restart Now</button>")
    $(".content").on("click", ".btn-secondary", function () {
        startQuiz();
    });
  };


