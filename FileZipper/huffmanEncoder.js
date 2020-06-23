import { Heap } from "./BinaryHeap";

class HuffmanEncoder{
    
    constructor(){
        this.mappings ={};
    }

    getMapping(node,path){

        if(typeof(node[1]) ===  "string"){
            this.mappings[node[1]] = path;
        }

        this.getMapping(node[1][0], path+"0");
        this.getMapping(node[1][1], path+"1");

    }

    displayTree(){

        
    }
    encodeData(data){

        const m = new Map();
        const heap = new Heap();
        
        // Setting the frequency of the characters in the text;
        for(let i= 0 ; i < data.length(); i++ ){
            if(m.has[data[i]]){
                m[data[i]] = m[data[i]] + 1;
            }
            else{
                m.set(data[i],1);
            }

        }


        // Add them to a Heap;
        for(const i in m){
            heap.insert([-m[i],i]);
        }

        // Now create a HuffMan tree out of it;
        while(heap.size > 1){
            
            let node1 = heap.extractMax();
            let node2 = heap.extractMax();

            let node = [node1[0]+ node2[0], [node1,node2]];
            heap.insert(node);

        }

        
        const huffmanTree =  heap.extractMax(); 
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
}