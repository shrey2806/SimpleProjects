


function init(){
    
    canvas = document.getElementById("SnakeCanvas");
    
    W = canvas.width = 730;
    H = canvas.height = 730;
    
    pen = canvas.getContext('2d');

    cellSize = 67;
    
    food = generateFood();
    
    snake = {

       color : "red",
       currentSize : 5,
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
        
        //WHenever the coordintes of food and snake head meet we increase the length of snake
        // and 
        

        
        this.cells.pop();

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
    pen.fillRect(food.x * cellSize ,food.y * cellSize , cellSize-2 , cellSize-2 )



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
    draw();
    update();

}
init();
draw();
var l = setInterval(gameloop,200);

