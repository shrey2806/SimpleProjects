export { Heap }

class Heap{


    constructor(){
        this.heap = [];
    }

    size(){
        return this.heap.length;
    }

    empty(){
        return (this.size()===0);
    }

    insert(value){
        
        this.heap.push(value);

        let idx = this.size()-1;
        // 2*idx+1
        // 2*idx+2;
        while(idx>0){

            let element = this.heap[idx];
            let parentidx = Math.floor((idx-1)/2);
            let parent = this.heap[parentidx];

            if(parent[0] > element[0])break;

            this.heap[idx] = parent;
            this.heap[parentidx] = element;
            idx = parentidx;

        }


    }

    heapify(i){

        let left = 2*i+1;
        let right = 2*i +2;
        let largest = i ;

        let length = this.size();

        if(left < length && this.heap[left][0] > this.heap[largest][0]){
            largest = left;
        }
        if(right < length && this.heap[right][0] < this.heap[largest][0]){
            largest = right;
        }

        if(largest!=i){
            
            let temp = this.heap[largest];
            this.heap[largest] = this.heap[i];
            this.heap[i] = temp;
            
            this.heapify(largest);


        }
        

    }

    extractMax(){

        if(this.empty()){
            return undefined;
        }
       
        let val = this.heap[0];
        let last = this.heap.pop();

        if(!this.empty()){
            this.heap[0] = last;
            this.heapify(0);

        }

        return val;
    }


};