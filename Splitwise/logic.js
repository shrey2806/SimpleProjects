


onload = function(){    


    const person1 = document.getElementById('person1');
    const person2 = document.getElementById('person2');
    const amount = document.getElementById('amount');
    const form = document.forms['myform'];
    const addButton = document.getElementById('addButton');

    const generateButton = document.getElementById('problemGraphButton');
    const simplifyButton = document.getElementById('SimplifyButton');

    const problemGraphContainer = document.getElementById('problemGraph');

    const solutionGraphContainer = document.getElementById('solutionGraph');

    const problemNetwork = new vis.Network(problemGraphContainer);
    const solutionNetwork = new vis.Network(solutionGraphContainer);


var problemData;
var transactions = [];

var netBalance = [];

function searchNetBalance(arr,k){

    for(let i = 0 ; i < arr.length ;i++){
        
        if(arr[i][1] === k ){
            return arr[i];
        }
    }

    return undefined;

}

addButton.onclick = function(){

    
    if(person1.value!==null && person1.value!=="" 
        && person2.value!==null && person2.value!=="" 
        && amount.value!==null && parseInt(amount.value)>0){
        console.log('fr');
        console.log(typeof(amount.value));
        transactions.push(
            {
                from : person1.value,
                to : person2.value,
                amount: parseInt(amount.value)
            });
        
        var obj = searchNetBalance(netBalance,person1.value);
        
        if(obj!==undefined){
        
            obj[0] -= parseInt(amount.value);
        
        }
        else{
            netBalance.push([(parseInt(amount.value)*(-1)),person1.value]);
        }
        
        var obj2 = searchNetBalance(netBalance,person2.value);
        
        if(obj2!==undefined){
            console.log('Inside');
            console.log(typeof(obj2[0]));
            obj2[0] += parseInt(amount.value);
        
        }else{
        
            netBalance.push([parseInt(amount.value),person2.value]);
        
        }


        

    }
    console.log(transactions); 
    form.reset();

}



function createProblemOptions(){


    var options={
        edges:{
            labelHighlightBold: true,
            // shadow: true,
            smooth: true,
            arrows: 'to',
            
            font :{
                size:20
            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        },
  
        nodes: {
              
              font: '16px Roboto-Bold #80696d',
              scaling: {
                label: true
              },
              
              
              shape : 'icon',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
              icon:{
                  
                  face: 'FontAwesome',
                  code: '\uf406',
                  size : 32,
                  color: '#403c3b' 
  
              }
            }
        }

    return options;


}

function search(arr,ele){

    var found = arr.find(function(element){
        return element.label === ele ;
    });
    return found;

}

function createProblemData(){
    

    let vertices = [];
    let edges = [];
    let count = 0;
    let id1,id2;

    for(let i = 0 ; i < transactions.length ; i++){

        console.log(transactions.length);
        
        let found1 = search(vertices,transactions[i].from);

        if(found1 === undefined){
            vertices.push({id:count, label : transactions[i].from});
            id1 = count;
            count++;
        }
        else{
            id1 = found1.id;
        }
        let found2 = search(vertices,transactions[i].to);
        if(found2 === undefined){
            vertices.push({id:count, label : transactions[i].to});
            id2 = count;
            count++;
        }else{
            id2 = found2.id;
        }
        
        edges.push({
            from: id1,
            to : id2,
            color: '#c2715d',
            label: transactions[i].amount.toString()

        });

        
    
    }


    var data = {
        nodes: vertices,
        edges : edges
    };

    return data;



}


generateButton.onclick = function(){

    let options = createProblemOptions();
    let data = createProblemData();
    problemData = data;
    
    problemNetwork.setOptions(options);
    problemNetwork.setData(data);
    console.log(netBalance);
}

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


}

function findId(arr,name){

    for(let i = 0 ; i < arr.length ; i++ ){

        if(arr[i].label === name){
            return arr[i].id;
        }
    }

    return undefined;

}

function createSolutionData(){

        const posh = new Heap();
        const negh = new Heap();
        
        // Problem Data : nodes --- { id: ___  label:  _____}
        // solution data : nodes ---{ id: }
        // create Edges of new type;
        // edges have id;
        // Egde Data have : {
        //  to , from  , label :  
            //}
        // create function( give name ) --> return the id ;
        
        let currVertices = problemData['nodes'];
       // console.log(netBalance);
        for(let i =  0 ; i < netBalance.length; i ++ ){

            if(netBalance[i][0] > 0 ){
                posh.insert(netBalance[i]);
            
            }else{
                
                netBalance[i][0] *= -1;
                negh.insert(netBalance[i]);
            
            }

        }
        var Nedges = [];
        while(!posh.empty() && !negh.empty()){

            let credit = posh.extractMax();
            let debit = negh.extractMax();

            let payableAmt = Math.min(credit[0],debit[0]);

            let from = findId(currVertices,debit[1]);
            let to = findId(currVertices,credit[1]);

           // console.log(payableAmt);
            
            Nedges.push({
                from: from,
                to: to,
                color: 'blue',
                label: payableAmt.toString()
            
            });
            
            
            if( credit[0]- payableAmt > 0){
                
                //console.log('condition 1');
                
            
                posh.insert( [ credit[0]-payableAmt, credit[1] ]);
                //console.log(posh)
            
            }

            if( debit[0]- payableAmt > 0){
            
                negh.insert( [debit[0]-payableAmt, debit[1]] );
               // console.log('contidion 2');
               //// console.log(negh);
            }

        }

        var data = {
            nodes : currVertices,
            edges : Nedges
        };

        return data;

}       


simplifyButton.onclick = function(){

    let options = createProblemOptions();
    let data = createSolutionData();
    console.log(data['edges']);
    solutionNetwork.setOptions(options);
    solutionNetwork.setData(data);

}



};


