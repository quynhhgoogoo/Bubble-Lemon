//Select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");
const button = document.getElementById("button");

//Create questions
let questions = [{
    question: "What kind of person most alike to you in a typical party ?",
    imgSrc: "img/quiz1.png",
    choiceA: "I am always the highlight of any party",
    choiceB: "I just sit in somewhere with my smart phone",
    choiceC: "I dont know. I may have a conversation with someone who is willing to talk to me",
    bubble: "A",
    lemon: "B",
    norm: "C"

}, {
    question: "Which words describe your friends most ?",
    imgSrc: "img/quiz2.png",
    choiceA: "An important element in my life. I feel always safe and being loved around them",
    choiceB: "Err.. It is okay to have them or not. I do not care",
    choiceC: "Friends are fake",
    bubble: "A",
    lemon: "C",
    norm: "B"
}, {
    question: "If you are a candy, you would describe yourself as ?",
    imgSrc: "img/quiz3.png",
    choiceA: "Sour",
    choiceB: "Nothing",
    choiceC: "Sweet",
    bubble: "C",
    lemon: "A",
    norm: "B"
}, {
    question: "What would you do in a traffic jam ?",
    imgSrc: "img/quiz4.png",
    choiceA: "Trying to push and squeeze other commuters more forwards",
    choiceB: "Playing your fav song max volume and wait traffic over",
    choiceC: "Do nothing but feel super annoyed for the whole day",
    bubble: "B",
    lemon: "A",
    norm: "C"
}, {
    question: "What would you do if you realize you only have 1 day to live ?",
    imgSrc: "img/quiz5.png",
    choiceA: "Kiss my beloved people and tell them that I love them",
    choiceB: "Jump out of window. I will die anyway",
    choiceC: "Enjoy last time for myself, do something that I did not do before",
    bubble: "A",
    lemon: "B",
    norm: "C"
}, {
    question: "What would you do if you heard that your bff stab behind your back?",
    imgSrc: "img/quiz1.png",
    choiceA: "She is bitching me. I will bitch her back",
    choiceB: "I do not believe it. I would ask her again to confirm it",
    choiceC: "Okay I will stop this toxic relationship",
    bubble: "B",
    lemon: "A",
    norm: "C"
}, {
    question: "All human are monster. This world is too toxic to live",
    imgSrc: "img/quiz2.png",
    choiceA: "Not True",
    choiceB: "Maybe",
    choiceC: "Exactly",
    bubble: "A",
    lemon: "C",
    norm: "B"
}, {
    question: "People always hate me even when we have not said anything to each other",
    imgSrc: "img/quiz3.png",
    choiceA: "Not True",
    choiceB: "Err.. Sometimes",
    choiceC: "Asolutely Correct",
    bubble: "A",
    lemon: "C",
    norm: "B"
}, {
    question: "What is your opinion about haters",
    imgSrc: "img/quiz4.png",
    choiceA: "I have no idea about the feeling of being hated",
    choiceB: "I do not care. They always be in my back",
    choiceC: "I will bitch them until they stop",
    bubble: "A",
    lemon: "C",
    norm: "B"
}, {
    question: "Which character describes yourself most in Adventure Time ?",
    imgSrc: "img/quiz5.png",
    choiceA: "Bubble Gum Princess",
    choiceB: "Earl of Lemongrab",
    choiceC: "Finn",
    bubble: "A",
    lemon: "B",
    norm: "C"
}];

//Create render variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let Timer;
let score = 0;


function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src =" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

//Start Quiz

start.addEventListener("click", Start);

function startQuiz() {
    start.style.display = "none"; //Hide the start button away
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    Timer = setInterval(renderCounter, 1000);
}

function Continue() {
    console.log("Stopped");
    start.removeEventListener("click", Stop);
    start.addEventListener("click", Start);
    start.value = "Start";
}

//Render progress
function renderProgress() {
    for (let qIndex = 0; qIndex < lastQuestion + 1; qIndex++) {
        progress.innerHTML += "<div class ='prog' id=" + qIndex + "></div>";
    }
}

//Counter render
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    } else {
        count--;
        answerIsFire();

        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            clearInterval(Timer);
            scoreRender();
        }
    }
}

//checkAnswer function
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].bubble) {
        score++;
        answerIsBubble();
    } else if (answer == questions[runningQuestion].norm) {
        score = score + 0;
        answerIsNorm();
    } else {
        answerIsFire();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        //end the quiz and show result
        clearInterval(Timer);
        scoreRender();
    }
}

//Answer is Bubble
function answerIsBubble() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//Answer is Fire
function answerIsFire() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function answerIsNorm() {
    document.getElementById(runningQuestion).style.backgroundColor = "#FFFF00";
}

//Score Render
function scoreRender() {
    scoreContainer.style.display = "block";


    //Calculate percentage
    const scorePer = score;

    //Assign appropiated image
    let img = (scorePer >= 50) ? "img/bubble.png" :
        "img/lemon.png";

    //Make img and score available on score Container

    scoreContainer.innerHTML = "<img src=" + img + ">";
    if (scorePer > 5) {
        scoreContainer.innerHTML = "<p>You are Buble Gum princess</p>";
        setTimeout(function move() {
            window.location.href = 'https://quynhhgoogoo.github.io/Bubble-Lemon/Bubble/Your Voice'
        }, 2000);
    } else {
        scoreContainer.innerHTML = "<p>You are Lemon Grab</p>";
        setTimeout(function move() {
            window.location.href = 'https://quynhhgoogoo.github.io/Bubble-Lemon/LemonGrab/Your Voice'
        }, 2000);
    }

}