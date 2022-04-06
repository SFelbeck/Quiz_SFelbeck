//varialbes that link every single html element for use
var startGame  = document.getElementById("start-game");
var questions = document.getElementById('questions');
var answers = document.getElementById('answers');
var highscores = document.getElementById('highscores');
var timer = document.getElementById('timer');
var ansResult = document.getElementById('ans-result');
var ans1 = document.getElementById('ans1');
var ans2 = document.getElementById('ans2');
var ans3 = document.getElementById('ans3');
var ans4 = document.getElementById('ans4');

// A giant array filled with objects that contain the questions and their related answers
const quizContent = [
    {
        question: "What is the name of the mysterious power in Star Wars?",
        ans: {
            a:"The Mysterious Power",
            b: "The Force",
            c: "The Vibes",
            d: "The Jedi",
        },
    },
    {
        question: "Which alien creatures populate the planet Arrakis in Dune?",
        ans: {
            a: "Elves",
            b: "Klingons",
            c: "Sand Worms",
            d: "Small Children"
        }
    },
    {
        question: "What is the name of the spaceship made famous in Star Trek?",
        ans: {
            a: "The Good Ship St. Agnes",
            b: "The Batmobile",
            c: "The BlackHawk",
            d: "The Enterprise",
        }
    },
    {
        question: "Who deserves a good grade and cookie for this assignment?",
        ans: {
            a: "Stefan",
            b: "Not Stefan",
            c: "Someone Else",
            d: "Nobody",
        }
    }
];

var i = 0;
var currentQuestion = quizContent[i];
var currentAnswers = currentQuestion.ans;

startGame.addEventListener("click", start);

function start(){
    if(startGame.innerText === "Start Quiz"){
        startGame.innerText = "Start Over";
        timerStart();
        questions.classList.remove("hide");
        answers.classList.remove("hide");
        ansResult.classList.remove("hide");
        questions.innerText = currentQuestion.question;
        ans1.innerText = currentQuestion.ans.a;
        ans2.innerText = currentQuestion.ans.b;
        ans3.innerText = currentQuestion.ans.c;
        ans4.innerText = currentQuestion.ans.d;
    }else{
        startGame.innerText = "Start Quiz";
        resetGameState();
        clearInterval(timeInterval);
    }
}

var timeInterval;
var timeLeft;
function timerStart(){
    timeLeft = 30;
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            questions.innerText = "Time's up, Try Again!"
            answers.classList.add("hide");
            ansResult.classList.add("hide");
            i = 0;
        }
    timer.innerText = ("Time: " + timeLeft);
  }, 1000);
}

function cycleQuestion(){
    i++;
    if(i < 4){
        questions.innerText = quizContent[i].question;
        ans1.innerText = quizContent[i].ans.a;
        ans2.innerText = quizContent[i].ans.b;
        ans3.innerText = quizContent[i].ans.c;
        ans4.innerText = quizContent[i].ans.d;
    }else{
        endGame();
    }
}

answers.addEventListener("click", ansBtnsUse);

//cycles through all correct answers and cycles to the next question, there was probably a better way to do this but this was the only way that worked haha
function ansBtnsUse(event){
    if(event.target.textContent == ("The Force")){
        cycleQuestion();
        ansResult.innerText = "Correct!";
    }else if(event.target.textContent == ("Sand Worms")){
        cycleQuestion();
        ansResult.innerText = "Correct!";
    }else if(event.target.textContent == ("The Enterprise")){
        cycleQuestion();
        ansResult.innerText = "Correct!";
    }else if(event.target.textContent == ("Stefan")){
        cycleQuestion();
        ansResult.innerText = "Correct!";
    }else{
        //displays an incorrect message and subtracts 5 seconds off timer
        ansResult.innerText = "Incorrect!"
         timeLeft -= 5;
         timer.innerText = ("Time: " + timeLeft);
    }
}

function resetGameState(){
    i = 0;
    questions.classList.add("hide");
    answers.classList.add("hide");
    ansResult.classList.add("hide");
}

function endGame(){
    clearTimeout(timeInterval);
    answers.classList.add("hide");
    ansResult.classList.add("hide");
    questions.innerText = "Congratulations! You win! you're final score is " + timeLeft;
    finalResult();
}

function finalResult(){
    let score = prompt("Congratulations! Your score is " + timeLeft + "please enter your initials")
    localStorage.setItem("Player", score);
    localStorage.setItem("Score", timeLeft)
}

highscores.addEventListener("click", displayScores);

function displayScores(event){
    var scoreA = localStorage.getItem("Player");
    var scoreB = localStorage.getItem("Score");
    var scoreBoard = alert("The previous score was " + scoreB + " by " + scoreA);
}
