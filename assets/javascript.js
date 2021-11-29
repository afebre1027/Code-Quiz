var question = document.querySelector(".question");
var answerText = Array.from(document.querySelectorAll(".answer-text"));
var scoreText = document.getElementById("score");


var currentQuestion = {};
var acceptingAnswer = true;
var questionCounter = 0;
var score = 0;
var availableQuestions = [];

var questions = [
  {
    question: "this is what type of quiz?",
    choice1: "coding",
    choice2: "mathing",
    choice3: "science",
    choice4: "english",
    answer: 1
  },
  {
    question: "what program is being used to make this?",
    choice1: "html",
    choice2: "css",
    choice3: "javaScript",
    choice4: "all of the above",
    answer: 4
  },
  {
    question: "what days are class on?",
    choice1: "Tuesday, Friday",
    choice2: "Monday, Thursday",
    choice3: "Tuesday, Thursday",
    choice4: "Monday, Wednesday",
    answer: 3
  },
  {
    question: "what time is class during the week?",
    choice1: "7am to 9am",
    choice2: "7pm to 9pm",
    choice3: "8am to 10am",
    choice4: "8pm to 10pm",
    answer: 2
  }
];

var scorePoints = 25;
var maxQuestions = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
 
getNewQuestion = () => {
    
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        // localStorage.setItem.setItem("mostRecentScore", score);
        // goes to high score package
        return window.location.assign("./highscore.html");
    }
    
    
    questionCounter++;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    answerText.forEach(choice => {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    // get rid of the question in use
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};

answerText.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswer) return;

        acceptingAnswer = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset['number'];
        
        var classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        
            if (classToApply == 'correct') {
                incrementScore(scorePoints);
            }
        }

        console.log(classToApply);
        getNewQuestion();
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();