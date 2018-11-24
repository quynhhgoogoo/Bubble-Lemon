const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

//Load images
const bg = new Image();
bg.src = "img/bg.png";

const jake = new Image();
jake.src = "img/jake.jpg";

const finn = new Image();
finn.src = "img/lemon.png";

//Resize canvas
// Start listening to resize events and draw canvas.
initialize();

function initialize() {
    // Register an event listener to call the resizeCanvas() function 
    // each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
}

// Display custom canvas. In this case it's a blue, 5 pixel 
// border that resizes along with the browser window.
function redraw() {
    ctx.drawImage(bg, 0, 0, window.innerWidth, window.innerHeight);
    //ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
}

//Create new unit
const box = 32;



//Load audio file
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "sound/dead.mp3";
eat.src = "sound/eat.mp3";
up.src = "sound/up.mp3";
right.src = "sound/right.mp3";
down.src = "sound/down.mp3";


//Create snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//Create food
let food = {
    x: Math.floor(Math.random() * 10 + 1) * box,
    y: Math.floor(Math.random() * 10 + 1) * box
}

//Create score
let score = 0;

//Binding keyboard
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "RIGHT";
        left.play();
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "DOWN";
        up.play();
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "LEFT";
        right.play();
    } else if (event.keyCode == 40 && d != "UP") {
        d = "UP";
        down.play();
    }
}

//Check collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//Old head position
let snakeX = snake[0].x;
let snakeY = snake[0].y;

//Draw function on canvas
function draw() {
    ctx.drawImage(bg, 0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < snake.length; i++) {
        //ctx.fillStyle = (i == 0) ? "white" : "green";
        if (i == 0) {
            //ctx.drawImage(finn, snakeX, snakeY, box, box);
        } else {
            ctx.fillStyle = "white";
        }
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(jake, food.x, food.y, box, box);
    ctx.drawImage(finn, snakeX, snakeY, box, box);




    //Moving Snake
    if (d == "LEFT") snakeX -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "UP") snakeY -= box;
    if (d == "DOWN") snakeY += box;

    //if snake eats jake
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 20 + 1) * box,
            y: Math.floor(Math.random() * 10 + 1) * box
        }
    } else {
        //remove the tail
        snake.pop();
    }

    //Add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Game Over
    if (snakeX < box || snakeX > window.innerWidth - box || snakeY < box || snakeY > window.innerHeight - box || collision(newHead, snake)) {
        document.getElementById("playAgain").style.display = "block";
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    //Draw Score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

//Refresh page
function refreshPage() {
    window.location.reload();
}

//Call draw function every 100ms
let game = setInterval(draw, 100);