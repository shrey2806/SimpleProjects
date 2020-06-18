//import Stack from './stack.js';
class Stack{

    constructor(){
        this.stack = [];
        this.size = 0;
        this.bufferSize = 3;

    }

    isEmpty(){
        
        return (this.size===0);
    
    }

    top(){

        if( this.isEmpty() === false ) {
           return this.stack[this.size-1];
        }

    }
    push( type , index , val ){
        
        if( this.size === 0 ){

            if( type===0 ){
                this.stack.push([type,index,val]);
              //  console.log(this.stack);
              
            }

        }
        else{

            
            
            if(this.top()[0]!== type || this.top()[2].length >= this.bufferSize){
            
                this.stack.push([type,index,val]);
            
            }else{

                let ele = this.pop();
                let newval = val + ele[2];
                this.stack.push([type,index,newval])

            }
        }

        this.size++;
        console.log('stack top is '+ this.top());
        
    }

    pop(){
        
        if( this.isEmpty() === false ){
            
            let ele =  this.stack[this.size-1];
            this.stack.pop();
            this.size--;
            return ele;
        }
        else{
            return [-1,-1,''];
        }
        

    }

}

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
    
    text = "";
    var stack = new Stack();

    textArea.oninput  =function(event){

        switch(event.inputType){
            case "insertText":
                let index = textArea.selectionStart;     
            //  console.log();   
                text = text + event.data;
                stack.push(0,index-1,event.data);
            //  console.log(text);
            //  console.log(textArea.selectionStart);
                break;

            case "deleteContentBackward":
                //console.log(textArea.selectionStart);
                let val =  text.substring(textArea.selectionStart,textArea.selectionStart+1);
                text = text.substring(0,textArea.selectionStart) + text.substring(textArea.selectionStart+1);
             //   console.log(text);
               // console.log(val);
                
                stack.push(1,textArea.selectionStart,val);
                break;


        }

        opDisplay.innerHTML = stack.top() + "<br>" + opDisplay.innerHTML;

    };

    undo.onclick = function(){
        
        // steps of UNDO ???? 
        let ele = stack.pop();

        if(ele[0]!==-1){

            opDisplay.innerHTML = "Performing undo Operation<br>" + opDisplay.innerHTML;
            
            var index = ele[1];
            
            if(ele[0]===0){
        
                var len = ele[2].length;
               
                // if(index+len-1 === text.length  -1)
                //     text = text.substring(0,index);
                
                // else{
                //    }
                
                //text = text.substring(0,index) + text.substring(index+len-1);
                text = text.substring(0,index - len +1) +  text.substring(index+1);
                textArea.value = text;
            
            }else{

                text = text.substring(0,index) + ele[2] + text.substring(index);  
                textArea.value = text;
            } 
        
        
        }




    };
}





