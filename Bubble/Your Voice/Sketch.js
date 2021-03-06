var bubble;
var score;
var obstacles = [];

var bgSound;
var gameOverSound;
var img;

var bubbleImg;
var bmoImg;

function preload() {
    bubbleImg = loadImage('img/bubble.png');
    bmoImg = loadImage('img/bmo.jpg');

    bgSound = loadSound('sound/gum.mp3');
    gameOverSound = loadSound('sound/gameover.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    textAlign(CENTER);

    score = 0;

    bubble = new Bubble(bubbleImg);
    obstacles.push(new Obstacle(bmoImg));

    bgSound.play();
}

function draw() {
    background('#CAA3FF');
    drawScore();

    var vol = mic.getLevel();

    for (var i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].draw();
        obstacles[i].update();

        if (obstacles[i].hits(bubble)) {
            endGame();
        } else {
            score++;
        }

        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);
        }
    }

    bubble.update();
    bubble.draw();
    //obstacles.draw();

    //var r = random(100, 200);

    if (frameCount % 100 == 0) {
        obstacles.push(new Obstacle(bmoImg));
    }

    if (vol > 0.2) {
        bubble.up();
    }

    //Volume bar
    fill(0, 255, 0);
    var y = map(vol, 0, 1, height, 0);
    rect(width - 50, y, 50, height - y);
}

function keyPressed() {
    if (keyIsDown(UP_ARROW)) {
        bubble.up();
    }
}

function drawScore() {
    textSize(30);
    noStroke();
    fill(255);
    text("Distance : " + score, width / 2, 50);
}

function endGame() {

    noLoop();

    fill(255);
    noStroke();

    textSize(70);
    //text("Game Over", width / 2, height / 2);

    bgSound.stop();
    gameOverSound.play();

    if (score <= 300) {
        button = createImg('img/button.png');
        //button.position(input.x + input.width, 65);
        button.mousePressed(refreshPage);
        button.position(width / 2, height / 2);
        text("Play Again", width / 2, height / 2.5);
        //  document.getElementById("playAgain").style.display = "block";
    } else {
        button = createImg('img/button.png');
        //button.position(input.x + input.width, 65);
        button.mousePressed(move);
        button.position(width / 1.5, height / 2);
        text("Continue", width / 2, height / 2.5);
    }
}


function refreshPage() {
    window.location.reload();
}

function move() {
    window.location.href = 'https://quynhhgoogoo.github.io/Bubble-Lemon/Bubble/Pop It Out'
}