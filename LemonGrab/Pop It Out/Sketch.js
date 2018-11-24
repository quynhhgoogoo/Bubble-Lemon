var blocks = [];
var goodThings = [];
var score;

var imgBadThings;
var imgGoodThings;
var bg;
var mySound;
var Badmp3;

function preload() {
    imgBadThings = loadImage('img/pink.jpg');
    imgGoodThings = loadImage('img/fire.jpg');

    mySound = loadSound('sound/meow.mp3');
    Badmp3 = loadSound('sound/iceking.mp3');
}

function setup() {
    bg = loadImage("img/bg.png");
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);

    /*button = createButton("Next");
    button.position(width / 2, height / 2);
    button.mousePressed(clickFunction);*/

    score = 0;
}

function draw() {
    background(bg);

    if (frameCount % 20 == 0) {
        if (random() > 0.5) {
            blocks.push(new Block(random(width / 2) + width / 4, random(7), random(40) + 30));
        }
        if (random() > 0.8) {
            goodThings.push(new GoodThings(random(width / 2) + width / 4, random(10), random(40) + 30));
        }
    }

    drawScore();
    drawBlocks();
    drawgoodThings();

}

//Initialize Blocks
function drawBlocks() {
    for (var i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i].pos.y < height) {
            blocks[i].update();
            blocks[i].draw();
        }
        //if blocks reaches the bottom of canvas
        else {
            endGame();
        }
    }
}

//Draw GoodThings
function drawgoodThings() {
    for (var i = goodThings.length - 1; i >= 0; i--) {
        if (goodThings[i].pos.y < height) {
            goodThings[i].update();
            goodThings[i].draw();
        }
    }
}

function mousePressed() {
    for (var i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i].isClicked(mouseX, mouseY)) {
            Badmp3.play();
            blocks.splice(i, 1);
            score--;
        }
    }

    for (var i = goodThings.length - 1; i >= 0; i--) {
        if (goodThings[i].isClicked(mouseX, mouseY)) {
            mySound.play();
            goodThings.splice(i, 1);
            score++;
        }
    }
}

//Define Score
function drawScore() {
    textSize(30);
    noStroke();
    fill(255);
    text("Score : " + score, width / 2, 50);
}


function endGame() {

    noLoop();

    fill(255);
    noStroke();

    textSize(50);
    //text("Game Over", width / 2, height / 2);
    if (score <= 5) {
        button = createImg('img/button.png');
        //button.position(input.x + input.width, 65);
        button.mousePressed(refreshPage);
        button.position(width / 2.15, 1.1 * height / 2);
        text("Play Again", width / 2, height / 2);
        //  document.getElementById("playAgain").style.display = "block";
    } else {
        button = createImg('img/button.png');
        //button.position(input.x + input.width, 65);
        button.mousePressed(move);
        button.position(width / 2.2, height / 2);
        text("Next Game", width / 2, height / 2.2);
        //  document.getElementById("move").style.display = "block";
    }
}

function refreshPage() {
    window.location.reload();
}

function move() {
    window.location.href = 'https://quynhhgoogoo.github.io/Bubble-Lemon/Bubble/Movement'
}