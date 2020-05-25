
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


var transactions = [];

addButton.onclick = function(){

    if(person1.value!==null && person1.value!=="" 
        && person2.value!==null && person2.value!=="" 
        && amount.value!==null && amount.value>0){
        console.log("indis");
        transactions.push(
            {
                from : person1.value,
                to : person2.value,
                amount: amount.value
            });
    }
    console.log(transactions);    

    form.reset();

}



function createProblemOptions(){


    var options={
        edges:{
            labelHighlightBold: true,
            shadow: true,
            smooth: true,
  
            font :{
                size:20
            },
            arrows: 'to                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         '
          },
  
          nodes: {
              
              font: '12px arial red',
              scaling: {
                label: true
              },
              
              
              shape : 'icon',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
              icon:{
                  
                  face: 'FontAwesome',
                  code: '\uf007',
                  size : 36,
                  color: '#991133' 
  
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
    console.log("called");

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
            from:id1,
            to : id2,
            color: 'red',
            label: transactions[i].amount

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
    
    console.log(data);


    problemNetwork.setOptions(options);
    problemNetwork.setData(data);




}


};


