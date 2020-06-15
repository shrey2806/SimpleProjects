import Stack from './stack.js';


// Written to prevent default undo behaviour:
document.onkeydown = function(event){
    if(event.ctrlKey || event.metaKey){
        event.preventDefault();
    }
}

onload = function{
    const textArea = this.document.getElementById('textArea');
    const opDisplay = this.document.getElementById('operationDisplay');
    const undo = this.document.getElementById('undoButton');



    undo.onclick = function(){
        // Perform Undo Operation : 


    }
}





