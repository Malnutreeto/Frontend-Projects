console.log("correttamente eseguito");

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const controls = document.querySelector(".controls") // c'era uno spazio ed una i, modificato da querySeectoAll a querySelector per prendere il solo container e sfruttare l'effetti bubbling degli event listener

let gameOver = false;
let foodX, foodY; 
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;


//random fruit positioning
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random()* 30) + 1;
    foodY = Math.floor(Math.random()* 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game over! Press OK to restart");
    location.reload();
}

//keyboard use
//Errori di battitura, in coda ai nomi sui quali fare il confronto ho trovato uno spazio
//Per comodità data la semplicità del HTML ho deciso di sfruttare l'id invece del data-key
// Ho implementato per ogni condizione e.key per richiamare i tasti, a seguire * il relativo event listener
const changeDirection = e => {
    if(e.id === "ArrowLeft" && velocityX != 1 || e.key === "ArrowLeft" && velocityX != 1 ){
        velocityX = -1;
        velocityY = 0;
        console.log("tasto sinistro");
    }else if (e.id === "ArrowUp" && velocityY != 1 || e.key === "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
        console.log("tasto su");
    }else if (e.id === "ArrowRight" && velocityX != -1 || e.key === "ArrowRight" &&  velocityX != -1){
        velocityX = 1;
        velocityY = 0;
        console.log("tasto destro");
    }else if (e.id === "ArrowDown" && velocityY != -1 || e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
        console.log("tasto giù");
    }
}

//change direction
//Per snellire il codice aggiungo un event listener solo al container dei controlli e sfrutto il bubbling
controls.addEventListener("click", (event) =>
{   
    //Dopo aver verificato che l'evento sia assegnato all'elemento giusto passo l'event target come parametro della funzione nella quale in seguito verrà pescato l'id del target e confrontato.
    changeDirection(event.target)
});

//*
document.addEventListener("keydown", changeDirection);

const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    
    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push([foodX, foodY]); //Fixato bug, i valori X e Y erano inveriti e quindi quando si mangiava la posizione del nuovo pezzetto di serpente non era corretta

        updateFoodPosition(); //Ho spostato la posizione di questa funzione in via precauzionale in quanto se viene eseguita prima dello snakeBody.push() i valori del nuovo pezzo di serpente potrebbero non esere corretti
        score += 10;
        document.getElementById("score").innerHTML = score;

    }
  
    //grow-up
    snakeX += velocityX;
    snakeY += velocityY;
    

    //shifting forward values 1 by 1
    for (let i = snakeBody.length -1; i > 0; i--) { //Fixato bug, il nuovo pezzo di serpente non si muoveva perchè c'era un piccolo errore di battitura su length
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];
    
    //wall control
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }
    
    //  graphic grow-up
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        
        //controllo se la testa tocca il corpo
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    
    playBoard.innerHTML = html;
}



    

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);





