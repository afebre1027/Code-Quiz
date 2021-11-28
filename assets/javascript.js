var question = document.querySelector(".question");
var answerText = Array.from(document.querySelector(".answer-text"));
var highScore = document.querySelector(".high-score");


var currentQuestion = {};
var questionCounter = 0;
var acceptingAnswer = true;
var score = 0;
var availableQuestions = [];

var questions = [
    {
        question: "this is what type of quiz?",
        choice1:"coding",
        choice2:"mathing",
        choice3:"science",
        choice4:"english",
        answer: 1,
    },
    {
        question: "what program is being used to make this?",
        choice1:"html",
        choice2:"css",
        choice3:"javaScript",
        choice4:"all of the above",
        answer: 4,
    },
    {
        question: "what days are class on?",
        choice1:"Tuesday, Friday",
        choice2:"Monday, Thursday",
        choice3:"Tuesday, Thursday",
        choice4:"Monday, Wednesday",
        answer: 3,
    },
    {
        question: "what time is class during the week?",
        choice1:"7am to 9am",
        choice2:"7pm to 9pm",
        choice3:"8am to 10am",
        choice4:"8pm to 10pm",
        answer: 2,
    }
];

var scorePoints = 100;
var maxQuestions = 4;

starGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    
     getQuestion()
};
 
getQuestion = () => {
    if( availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("/end.html")
    }
    
    questionCounter++

    var questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    answerText.forEach(choice =>{
        var number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    });

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswer = true
};

answerText.forEach(choice =>{
    choice.addEventListner("click", i =>{
        if(!acceptingAnswer) return

        acceptingAnswer = false
        var selectedChoice = i.target
        var selectedAnswer = selectedChoice.dataset["number"]
        
        var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
        if(classToApply === "correct") {
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getQuestion()
        }, 1000)
    })
});