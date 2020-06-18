export {Stack}


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
              
              
            }

        }
        else{

            
            
            if(this.top()[0]!== type || this.top()[2].length >= this.bufferSize ||
                this.top()[1] > index){
            
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
    clear(){
        this.stack = [];
        this.size = 0;
    }

}