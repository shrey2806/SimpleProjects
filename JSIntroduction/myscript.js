var fruit = "Apple"; // Function Scope
let car = "Mercedes"; // Block Scope
phone = "Mi"; // Global Scope

isTrue = true;
 if(isTrue){
    let car = "BMW";
    console.log(phone);
    console.log(car);
    console.log(fruit);
}
console.log(car);

// This function is not hoisted
var myName = function(){
    console.log("My name is shrey");
} 
myName();   

printMyName();
//This function is hoisted
function printMyName(){
    console.log("You already know my name!");
}


var dog_types = ["Golden-Retriever","German Shephard","Bull-Dog"];


//Objects in JavaScript : 
//Two ways to construct objects;
const obj1 = {};

const obj2 = new Object();

var house={
    doors : 4,
    rooms : 4,
    name : "Shanti Villa",

    getName : function(){
        console.log("Name is " + this.name);
    }
}

// Class in JS

class Hero{
    constructor(name,level){
        this.name = name;
        this.level= level;
    }

    greet(){
        console.log(this.name + "Says Hello!");
    }
}

var spiderman = new Hero("Spidy","24");

