var canvas = document.getElementById("game");
var canvaContext = canvas.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeNorth.png";
pipeBottom.src = "images/pipeSouth.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "music/fly.mp3";
score_audio.src = "music/score.mp3";

// Растояние между верхней трубой и нижней 
var gap = 90;

// Создание блоков
var pipe = [];
pipe[0] = {
    x : canvas.width,
    y : 0
};

//При нажатии на кнопку 
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

var score = 0;

//позиция птицы
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function render () {
    canvaContext.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        canvaContext.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        canvaContext.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // Отслеживание прикосновений
        if(xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + 
                gap) || yPos + bird.height >= canvas.height - fg.height) {
                    location.reload(); // Перезагрузка страницы
                }
        if(pipe[i].x == 6) {
            score++;
            score_audio.play();
        }        
    }
   
    canvaContext.drawImage(fg, 0 , canvas.height - fg.height);

    canvaContext.drawImage(bird, xPos, yPos);

    yPos += grav;

    canvaContext.fillStyle = "#000";
    canvaContext.font = "24px Verdana";
    canvaContext.fillText("Счет: " + score, 10, canvas.height - 20);
    requestAnimationFrame(render);
}

pipeBottom.onload = render;