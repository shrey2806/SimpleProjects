let src = 0;
let V = 9;
let E = [[0,1,4], [0,7,8], [1,7,11], [1,2,8], [7,8,7], [6,7,1], [2,8,2],
    [6,8,6], [5,6,2], [2,5,4], [2,3,7], [3,5,14], [3,4,9], [4,5,10]];

function createGraph(V,E){

    adj_list = [];

    for(let i = 0 ; i < V ; i++)
    adj_list.push([]);

    for(let i = 0; i < E.length ; i++){
        //graph is undirected so pushing in both the edges
        adj_list[E[i][0]].push([ E[i][1], E[i][2]]);
        adj_list[E[i][1]].push([E[i][0],E[i][2]]);
    }
    console.log(adj_list);  
    return adj_list;
}


function dijkstra(graph,V, src){
    var dist = [];

    for(let i= 0 ;i < V ; i ++){
        dist.push([1000,-1]);
    }

    dist[src][0] = 0;

    var vis = Array(V).fill(0);    

    // This loop should run V-1 times because resultant tree formed will add 1 edge at every step and
    // there are V-1 edges in MST formed from the algo.
    for(let i = 0 ; i < V-1 ; i++ ){

        let min_idx;
        let mini = 10000;
        for(let  j = 0 ; j < V; j ++){
            if(vis[j]===0 && dist[j][0] < mini ){
                mini = dist[j][1];
                min_idx = j;
            }
        }
       
        vis[min_idx] = 1;

        for(let j = 0 ; j < graph[min_idx].length ; j++){
            let edge = graph[min_idx][j];
        
            if(vis[edge[0]]===0 && dist[edge[0]][0] > ( dist[min_idx][0]  + edge[1])){
                dist[edge[0]][0] = dist[min_idx][0] + edge[1];
                dist[edge[0]][1] = min_idx;
            }
        }
        
        
    }

    return dist;

 }

let graph = createGraph(V,E);
let distances = dijkstra(graph,V,0);
console.log(distances);