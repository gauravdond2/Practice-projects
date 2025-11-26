const gamearea = document.querySelector('#gamearea');
const scoredisplay = document.querySelector('#score');
const highscoredisplay = document.querySelector('#high-score');

const rows = 15;
const cols = 15;
const blocks = [];
let direction = "null";
let intervalid;
let eatfood = false;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;

// listen for key presses to change direction
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});

//generate game area blocks
for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
        const block = document.createElement('div');
        block.classList.add("block");
        // block.innerText = `${i}${j}`;
        gamearea.appendChild(block);

        blocks[`${i}-${j}`] = block;
    }
}

const snake = [
    { x: 2, y: 4 }
];
let food = { x: 5, y: 5 };
//check collision with self
function checkCollision(object) {
    snake.forEach((segment) => {
        if (segment.x === object.x && segment.y === object.y) {
            alert("Game Over!");
            direction = "null";
            clearInterval(intervalid);
            return;
        }   
    });
}

//calculate snake movement
function moveSnake() {
    if (direction === "right") {
        checkCollision({x:snake[0].x,y:snake[0].y + 1});
        snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
        if (!eatfood) {
            const tail = snake.pop();
            blocks[`${tail.x}-${tail.y}`].classList.remove('snake');
        }
    } else if (direction === "left") {
        checkCollision({x: snake[0].x, y: snake[0].y - 1});
        snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
        if (!eatfood) {
            const tail = snake.pop();
            blocks[`${tail.x}-${tail.y}`].classList.remove('snake');
        }
    } else if (direction === "up") {
        checkCollision({ x: snake[0].x - 1, y: snake[0].y });
        snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
        if (!eatfood) {
            const tail = snake.pop();
            blocks[`${tail.x}-${tail.y}`].classList.remove('snake');
        }
    } else if (direction === "down") {
        checkCollision({x: snake[0].x + 1, y: snake[0].y});
        snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
        if (!eatfood) {
            const tail = snake.pop();
            blocks[`${tail.x}-${tail.y}`].classList.remove('snake');
        }
    }
}

// render snake
function rendersnake() {
    eatfood = false;
    if (snake[0].x == food.x && snake[0].y == food.y) {
        score++;
        scoredisplay.innerText = score;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore);
        }
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food.x = Math.floor(Math.random() * rows);
        food.y = Math.floor(Math.random() * cols);
        eatfood = true;

    }
    moveSnake();
    //check wall collision
    if (snake[0].x < 0 || snake[0].x >= rows || snake[0].y < 0 || snake[0].y >= cols) {
        alert("Game Over!");
        direction = "null";
        clearInterval(intervalid);
        return;
    }
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add('snake');
    })
}
// render food
function renderfood() {
    blocks[`${food.x}-${food.y}`].classList.add('food');
}




function render() {
    highscoredisplay.innerText = localStorage.getItem("highscore") || 0;
    intervalid = setInterval(() => {
        rendersnake();
        renderfood();
    }, 300)

}
render();


