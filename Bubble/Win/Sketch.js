var bgImg;
var mySound;

function preload() {
    bgImg = loadImage('theme/Candy.jpg');
    mySound = loadSound('sound/trumpet.mp3');
}

function setup() {
    bg = loadImage("theme/Candy.jpg");
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
}

function draw() {
    background(bg);
    noti();
}

function noti() {
    fill(255);
    noStroke();

    textSize(50);
    text("You made it", width / 2, height / 9);

    mySound.play();
}
