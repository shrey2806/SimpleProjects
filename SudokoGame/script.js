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
        console.log("dfwffw");
        //Populate board;
        board = response.board;
        resetColor();
        fillInitialBoard(board);
        setColor();
        populateBoard(board);

        solveSudoko(board);
        
        console.log(board);

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

// Filling the board with numbers  and making other blocks Editable;
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



button_submit.onclick = function (){

    for(var i=0; i<9;i++){
        for(var j=0 ;j<9;j++){
            if(arr[i][j].innerText==""){
                console.log("Sudokoo is Empty");
                alert("Sudoko is Empty");
                return;
            }
        }
    }

    //TODO :

}
function isSafe(board,number,sr,sc){

    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == number) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == number) {
            return false;
        }
    }

    var r = sr - sr % 3;
    var c = sc - sc % 3;

    for (var cr = r; cr < r + 3; cr++) {
        for (var cc = c; cc < c + 3; cc++) {
            if (board[cr][cc] == number) {
                return false;
            }
        }
    }
    return true;




}
function solveSudokoHelper(board, sr, sc){

    if(sr==9){
        return true;
    }

    if(sc == 9){
       return solveSudokoHelper(board,sr+1,0);
        
    }

    if(board[sr][sc]!=0){
        return solveSudokoHelper(board,sr,sc+1);
        
    }

    for(let number = 1; number <= 9 ; number++ ){

        if(isSafe(board,number,sr,sc)){
            
            board[sr][sc]=number;
            var isSolved = solveSudokoHelper(board,sr,sc+1);
            if(isSolved==true){
                return true;
            }
            board[sr][sc]=0;
        }

    }

    return false;

}



function solveSudoko(board){
    solveSudokoHelper(board,0,0);

}

