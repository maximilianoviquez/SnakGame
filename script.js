const playBoard = document.querySelector(".playboard");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highscore");


let gameover = false;
let foodX, foodY;
let snakeX = 5, snakeY =10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highscore = localStorage.getItem("highscore") || 0;
highScoreElement.innerHTML = `High Score: ${highscore}`;

const changFoodPosition = () => {
    foodX = Math.floor(Math.random()* 30)+1;
    foodY = Math.floor(Math.random()* 30)+1;

}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;

    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;

    }else if(e.key === "ArrowLeft"&& velocityX != 1){
        velocityX = -1;
        velocityY = 0;

    }else if(e.key === "ArrowRight"&& velocityX != -1){
        velocityX = 1;
        velocityY = 0;

    }
    //initGame();

}

const initGame = () => {
    if(gameover) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highscore = score >= highscore ? score: highscore;
        localStorage.setItem("highscore",highscore);
        scoreElement.innerHTML = `Score ${score}`;

        highScoreElement.innerHTML = `High Score: ${highscore}`;
        
    }

    for(let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]

    }

    snakeBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY; // y = a coordenada actual -1.

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameover = true;
    }


    for(let i=0; i< snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && i !== 0 && snakeBody[0][0] === snakeBody[i][0] )
        gameover = true;
    }
    playBoard.innerHTML = htmlMarkup;

}


changFoodPosition();
setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);

