import { Heap } from './BinaryHeap.js';

export { HuffmanEncoder }


class HuffmanEncoder{
    
    constructor(){
        this.mappings ={};
    }

    getMapping(node,path){

        console.log("node is," , node);

        if(typeof(node[1]) ===  "string"){
            this.mappings[node[1]] = path;
            return;
        }

        this.getMapping(node[1][0], path+"0");  
        this.getMapping(node[1][1], path+"1");

    }

    displayTree(node, index = 1){
        
        
        if(typeof(node[1])==="string"){

            return String(index) + " = " + node[1];
        }    
        let left = this.displayTree(node[1][0], index*2);
        let right = this.displayTree(node[1][1],  index*2+1);
        let res = String(index*2)+" <= "+index+" => "+String(index*2+1);
        return res + '\n' + left + '\n' + right;
        
    

        
    }
    encodeData(data){

        let  m = new Map();
        this.heap = new Heap();
        
        // Setting the frequency of the characters in the text;
        for(let i= 0 ; i < data.length; i++ ){
            if(m.has(data[i])){
                m[data[i]] = m[data[i]] +1;
            }
            else{
                m.set(data[i],1);
            }

        }

        console.log(m);
        // Add them to a Heap;
        for(var i in m){
            
            this.heap.insert([-m[i],i]);
        }

        // Now create a HuffMan tree out of it;
        while(this.heap.size() > 1){
            
            let node1 = this.heap.extractMax();
            let node2 = this.heap.extractMax();

            let node = [node1[0]+ node2[0], [node1,node2] ];
            this.heap.insert(node);

        }

        
        const huffmanTree =  this.heap.extractMax(); 
        
        console.log(huffmanTree);

        this.getMapping(huffmanTree,"");

        let binaryString = "";

        for(let i = 0 ; i < data.length ; i++){
            binaryString = binaryString + this.mappings[data[i]];
        }


        let remaining = (8 - binaryString.length%8 )%8;
        let padding ="";

        for(let i = 0 ; i < remaining ; i++){
            padding = padding +"0";
        }

        binaryString = binaryString + padding;

        let encodedText = "";

        for(let i = 0;i< binaryString.length; i+=8){
            let num = 0;
            for(let j = 0 ; j < 8 ; j++){
                
                num = num*2 + (binaryString[i+j]-"0");

            }
            encodedText = encodedText + String.fromCharCode(num);
        }

        const result = {
            encodedText : encodedText,
            paddinglen : padding.length,
            huffmanTree : huffmanTree,
            
        };

        return result;
    }


    decodeData(result){

        let encodedText = result.encodedText;
        let huffmanTree = result.huffmanTree;
        let paddinglength = result.paddinglen;

        let binaryString ="";

        for(let i = 0; i< encodedText.length ; i++){

            let num = encodedText.charCodeAt(i);

            let bin="";

            for(let j = 0 ; j < 8 ; j ++){

                bin = num%2 + bin;
                num = Math.floor(num/2);
            }
            binaryString = binaryString + bin;

        }

        binaryString = binaryString.substring(0,binaryString.length - paddinglength);


        let decodedText = "";
        let node = huffmanTree;
        for(let i = 0; i < binaryString.length ; i++){

            if(binaryString[i]=="0"){
                node = node[1][0];
                
            }else{
                node = node[1][1];
            }

            if(typeof(node[1])==="string"){
                decodedText+=node[1];
                node = huffmanTree; 
            }
            
        }

        return decodedText;

    }
};