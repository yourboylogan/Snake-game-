function init(){
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    gameOver = false;
    
    food = getRandomFood();
    score = 0;
    
    snake = {
        init_length: 2,
        color: "light",
        cells: [],
        direction: "right",
        
        createSnake: function(){
            for (var i = this.init_length - 1; i >= 0; i--) {
                this.cells.push({x: i, y: 0});
            }
        },
        drawSnake: function(){
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.strokeStyle = "black";
                pen.lineWidth = 5;
                pen.strokeRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
                pen.fillRect(this.cells[i].x * 10, this.cells[i].y * 10, 10, 10);
            }
        },
        updateSnake: function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            for (var i = 1; i < snake.cells.length; i++) {
                if (snake.cells[i].x == headX && snake.cells[i].y == headY) {
                    gameOver = true;
                    return;
                }
            }
            
            if (headX == food.x && headY == food.y) {
                score++;
                food = getRandomFood();
            } else {
                this.cells.pop();
            }
            
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            } else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            } else if (this.direction == "up") {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({x: nextX, y: nextY});
            var last_x = Math.round(W / 10);
            var last_y = Math.round(H / 10);
            
            if (this.cells[0].y < 0 || this.cells[0].x > last_x || this.cells[0].x < 0 || this.cells[0].y > last_y) {
                gameOver = true;
                return;
            }
        }
    };
    snake.createSnake();
    
    function KeyPressed(e){
        if (e.key == 'ArrowRight') {
            snake.direction = "right";
        } else if (e.key == 'ArrowLeft') {
            snake.direction = "left";
        } else if (e.key == 'ArrowUp') {
            snake.direction = "up";
        } else if (e.key == 'ArrowDown') {
            snake.direction = "down";
        }
    }
    document.addEventListener('keydown', KeyPressed);
}

function draw(){
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.fillRect(food.x * 10, food.y * 10, 10, 10);
    
    pen.fillStyle = "white";
    pen.font = "14px montserrat";
    pen.fillText("Score: " + score, 10, 10);
}

function update(){
    snake.updateSnake();
}

function gameloop(){
    if (gameOver) {
        clearInterval(z);
        if (confirm("Game Over! Do you want to restart?")) {
            init();
            z = setInterval(gameloop, 130);
        }
        return;
    }
    draw();
    update();
}

function getRandomFood(){
    var foodX = Math.round(Math.random() * (W - 10) / 20);
    var foodY = Math.round(Math.random() * (H - 10) / 20);
    
    foodColors = ["red", "green", "aqua", "coral", "orchid"];
    var i = Math.round(Math.random() * foodColors.length);
    
    var food = {
        x: foodX,
        y: foodY,
        color: foodColors[i],
    }
    return food;
}

init();
var z = setInterval(gameloop, 130);
