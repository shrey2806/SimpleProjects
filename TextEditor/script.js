import {Stack} from './stack.js';


// Written to prevent default undo behaviour:
document.onkeydown = function(event){
    if(event.ctrlKey || event.metaKey){
        event.preventDefault();
    }
};

onload = function(){

    const textArea = this.document.getElementById('textArea');
    const opDisplay = this.document.getElementById('operationDisplay');
    const undo = this.document.getElementById('undoButton');
    const clear = this.document.getElementById('clearButton');


    
    var text = "";
    var stack = new Stack();

    textArea.oninput  =function(event){

        switch(event.inputType){
            case "insertText":
                let index = textArea.selectionStart;     
                stack.push(0,index-1,event.data);
                text = textArea.value;
                break;

            case "deleteContentBackward":
                
                let val =  text.substring(textArea.selectionStart,textArea.selectionStart+1);
                text = text.substring(0,textArea.selectionStart) + text.substring(textArea.selectionStart+1);
                
                stack.push(1,textArea.selectionStart,val);
                break;


        }

        opDisplay.innerHTML = stack.top() + "<br>" + opDisplay.innerHTML;

    };

    undo.onclick = function(){
        
        
        let ele = stack.pop();

        if(ele[0]!==-1){
            let operationName = "Insert";
            if(ele[0]===0){
                operationName = "Delete";
            }
            
            opDisplay.innerHTML = "Performing undo Operation: "+ operationName+ " <br>" + opDisplay.innerHTML;
            
            var index = ele[1];
            
            if(ele[0]===0){
        
                var len = ele[2].length;
                text = text.substring(0,index - len +1) +  text.substring(index+1);
                textArea.value = text;
            
            }else{

                text = text.substring(0,index) + ele[2] + text.substring(index);  
                textArea.value = text;
            } 
        
        
        }




    };

    clear.onclick = function(){
        text = "";
        textArea.value = "";
        stack.clear();
        opDisplay.innerHTML = "";
    }
}





