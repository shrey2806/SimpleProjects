let button_generate = document.getElementById("GetPuzzle");
let button_submit = document.getElementById("Submit");
let button_check = document.getElementById("CheckResult");

var arr = [[],[],[],[],[],[],[],[],[]];
var board = [[],[],[],[],[],[],[],[],[]];
var initial_board = [[],[],[],[],[],[],[],[],[]];

for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){
        arr[i][j] = document.getElementById(i*9+j);
    }
}



function resetColor(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            arr[i][j].style.color = "green";
        }
    }
}


button_generate.onclick = function(){
    var request = new XMLHttpRequest();


    request.onload = function(){
        var response = JSON.parse(request.response)
        console.log(response);
        
        //Populate board;
        board = response.board;
        resetColor();
        fillInitialBoard(board);
        setColor();
        populateBoard(board);

    }
    request.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy');
    request.send();

};

function fillInitialBoard(board){

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]!=0){
                initial_board[i][j]=true;
            }else{
                initial_board[i][j]=false;
            }
        }
    }


}

function setColor(){

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(initial_board[i][j]==true){
                arr[i][j].style.color ="red";
            }
        }
    }
}

function populateBoard(board){

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]!=0){
                arr[i][j].innerText = board[i][j]; 
            }else{
                arr[i][j].innerText = "";
            }
        }
    }

    for(let i=0;i<9;i++){

        for(let j=0;j<9;j++){
            
            arr[i][j].onclick = function(){

                arr[i][j].setAttribute("contenteditable","true");


            }
        }
    }

}

