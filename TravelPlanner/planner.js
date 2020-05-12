onload = function(){

    const container = document.getElementById('graphContainer');
    const button = document.getElementById('generate-graph');

    var options = {
        edges:{
          labelHighlightBold: true,
          shadow: true,
          smooth: true,

          font :{
              size:20
          }
        },

        nodes: {
            
            font: '12px arial red',
            scaling: {
              label: true
            },
            
            
            shape : 'icon',

            icon:{
                
                face: 'FontAwesome',
                code: '\uf54f',
                size : 40,
                color: '#991133' 

            }

          }
    };



    const network = new vis.Network(container);
    network.setOptions(options);


    function createData(){

        const places = ['ChaiDukan','Juice','Dhaaba','ThandiBeer','DosaShop','LassiPalace','ChickenRoll','ShopRixMall','PulseGym','School','Hospital','LootBank'];

        const V = Math.floor(Math.random()* places.length);
        if(V==0){
            V = 3;
        }

        let vertices = [];
        let edges = [];
        
        // Initialising Vertices:
        for(let i = 0 ; i < V ;i++){
            vertices.push({id:i, label:places[i]});
        }

        // Initializing Edges: 

        for(let i = 1; i <V;i++){
            let neigh = Math.floor(Math.random()*i);
            edges.push({from: i, to: neigh, color: 'orange',label: String(Math.floor(Math.random()*70)+20)});

        }


        const data = {
            nodes : vertices,
            edges : edges
        };

        return data;
        
    }


    button.onclick = function(){

        let data = createData();
        network.setData(data);
    }

    button.click();


}