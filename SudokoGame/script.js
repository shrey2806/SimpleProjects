let button_generate = document.getElementById("GetPuzzle");
let button_submit = document.getElementById("Submit");
let button_check = document.getElementById("CheckResult");



button_generate.onclick = function(){
    var request = new XMLHttpRequest();


    request.onload = function(){
        var response = JSON.parse(request.response)
        console.log(response);
    }
    request.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy');
    request.send();

};