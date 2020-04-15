


function init(){
    
    canvas = document.getElementById("SnakeCanvas");
    
    W = canvas.width = 800;
    H = canvas.height = 800;
    
    pen = canvas.getContext('2d');

    cellSize = 67;
    
    score = 4;
    
    food = generateFood();

    game_over =false;

    // get image for food;
    food_img = new Image();
    food_img.src = "Assets/apple.png";

    // get image of trophy

    trophy_img = new Image();
    trophy_img.src = "Assets/trophy.png";

    
    snake = {

       color : "red",
       currentSize : 4,
       cells:  [],
       direction: "right",

       createSnake : function(){

            // Creating Snake Starting from 2nd cell in the grid
            // Pushed Content would be { (5,0) , (4,0), (3,0), (2,0) , (1,0))}
            for( var i = this.currentSize  ; i > 0 ;i--){
                this.cells.push({ x:i,y:0 });
            }
            
       },

       drawSnake : function(){
            //console.log(this.cells);
            
            for(var i = 0 ; i < this.cells.length ; i++){
                pen.fillStyle = "Brown";        
            
                pen.fillRect( this.cells[i].x*cellSize ,this.cells[i].y*cellSize,cellSize-3,cellSize-3);
                // (5*67 , 0 , 64, 64);
                
            }
            
        },

       
       updateSnake  : function(){

        
        var HeadX = this.cells[0].x;
        var HeadY = this.cells[0].y;
        
        // Whenever the coordintes of food and snake head meet we increase the length of snake
        // and 

        if( HeadX == food.x && HeadY == food.y){

            food = generateFood();

            score++;

            // //Check if food is in the cell 
            // for(var i = 0 ; i < this.cells.length ;i++){
            //     if( cells[i].x == food.x){
            //         food = generateFood();
            //     }
            // }


        }else{
        
            this.cells.pop();
        }
        var newX ,newY;
        if(this.direction == "right"){
            
            newX = HeadX +1;
            newY = HeadY;

        }else if(this.direction == "left"){
            console.log('Pressed left');
            newX = HeadX -1;
            newY = HeadY;

        }else if(this.direction == "down"){
            
            newX = HeadX;
            newY = HeadY + 1;
        }
        else{
            newX = HeadX;
            newY = HeadY -1;
        }

        this.cells.unshift({x:newX,y:newY});


        // Check logic of snake going out : 
        var last_x = Math.round(W/cellSize);
        var last_y = Math.round(W/cellSize);

        if(this.cells[0].x < 0  || this.cells[0].y <0 || this.cells[0].x  >= last_x || this.cells[0].y >=last_y){
            game_over = true;
        } 

       
      }
    }
    //pen.fillRect(0,0,50,50);
    snake.createSnake();

    // Adding key listener 

    document.addEventListener("keydown",keyPressed);

    function keyPressed(o){
        
        if(o.key == "ArrowRight"){
            snake.direction="right";

        }else if(o.key == "ArrowDown"){
            snake.direction = "down";

        }else if(o.key == "ArrowUp"){
            snake.direction ="up";
        }
        else{
            snake.direction ="left";
        }

        console.log(snake.direction);

    }
}


function update(){
    snake.updateSnake();

}


function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
   // pen.fillRect(food.x * cellSize ,food.y * cellSize , cellSize-2 , cellSize-2 )
    pen.drawImage(food_img,food.x * cellSize ,food.y * cellSize , cellSize-2 , cellSize-2);


    pen.drawImage(trophy_img,20,20,cellSize,cellSize); 
    pen.fillStyle = "black";
    pen.font = "20px Roboto";
    pen.fillText(score,50,50);

}

// Returns food at random Location :
function generateFood(){

    //Generating Food randomly excluding last row or column of widht cellSize.
    // We divide by cellSize because Drawing will multiply it by cell Size;

    var food_X = Math.round(Math.random()*(W-cellSize)/cellSize);
    var food_Y = Math.round(Math.random()*(W-cellSize)/cellSize);
    var food = {
        x : food_X,
        y : food_Y,
        color : "red",
    };

    return food;
}


function gameloop(){

    if(game_over == true){
        clearInterval(f);
       
        alert("Game Over");
    }
    draw();
    update();

}
init();
draw();
var l = setInterval(gameloop,200);

