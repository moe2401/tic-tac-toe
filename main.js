"use strict";

//Bind Esc key to closing the modal dialog//
document.onkeypress = function(evt){
    evt = evt || window.event;
    var modal = document.getElementsByClassName("modal")[0];
    if (evt.keyCode === 27){
        modal.style.display = "none";
    }
};


//When the user clicks somewhere outside the modal dialog, close it
window.onclick = function (evt){
    var modal = document.getElementsByClassName("modal")[0];
    if (evt.target === modal){
        modal.style.display = "none";
    }
};


//Helper functions
function sumArray(array){
    var sum = 0, i = 0;
    for(i=0; i<array.length; i++){
        sum += array[i];
    }
    return sum;
}

function isInArray(element, array){
    if (array.indexOf(element)>-1){
        return true;
    }
    return false;
}

function shuffleArray(array){
    var counter = array.length,
    temp,
    index;
    while(counter>0){
        index=math.floor(math.random()*counter);
        counter--;
        temp = array[counter];
        array[counter]=array[index];
        array[index]=temp;
    }
    return array;
}

function intRandom(min, max){
    var rand = min + math.random()*(max+1- min);
    return math.floor(rand);
}


//global variable
var moves = 0,
winner = 0,
x = 1,
o = 3,
player = x,
computer = o,
whoseTurn = x,
gameOver = false,
score = {
    ties: 0,
    player: 0,
    computer: 0
},

xText = "<span class=\"x\">&times;</class>",
oText = "<span class=\"o\">o</class>",
playerText = xText,
computerText = oText,
difficulty = 1,
myGrid = null;


//grid object

//grid constructor
function Grid(){
    this.cells = new Array(9);
}

//grid method
//get free cells in an array.
//returns an array of indices in the original Grid.cells array, not the values of the array elements.
//their values can be accessed as Grid.cells[index].

Grid.prototype.getFreeCellIndices = function(){
    var i = 0,
    resultArray = [];
    for(i = 0; i < this.cells.length; i++){
        if (this.cells[i] === 0){
            resultArray.push(i);
        }
    }
//code below from p159 may be wrong, double check if app doesn't work     
// console.log("resultArray:" + resultArray.toString()); 
// debugger; 
return resultArray;

};

//get a row (accepts 0, 1, or 2 as argument)
//returns the values of the elements
Grid.prototype.getRowValues = function (index){
    if(index !== 0 && index !== 1 && index !==2){
        console.error("Wrong arg for getRowValues!");
        return undefined;
    }
    var i = index * 3;
    return this.cells.slice(i, i+3);
};

//get a row(accepts 0, 1 or 2 as argument)
//returns an array with the indices, not their values
Grid.prototype.getRowIndices = function(index){
    if(index !== 0 && index !== 1 && index !==2){
        console.error("Wrong arg for getRowIndices!");
        return undefined;
    }
    var row = [];
    index = index * 3;
    row.push(index);
    row.push(index + 1);
    row.push(index + 2);
    return row
};

//get a column (values)
Grid.prototype.getColumnValues = function(index){
    if(index !== 0 && index !== 1 && index !==2){
        console.error("Wrong arg for getColumnIndices!");
        return undefined;
    }
    var i, column = [];
    for(i = index; 1<this.cells.length; i +=3){
        column.push(i);
    }
    return column;
};

//get diagonal cells
//arg 0: from top-left
//arg 1: from top-right
Grid.prototype.getDiagValues = function(arg){
    var cells = [];
    if(arg !== 1 && arg !==0){
        console.error("Wrong arg for getDiagValues!");
        return undefined;
    }
    else if(arg === 0){
        cells.push(this.cells[0]);
        cells.push(this.cells[4]);
        cells.push(this.cells[8]);
    }else{
        cells.push(this.cells[2]);
        cells.push(this.cells[4]);
        cells.push(this.cells[6]);
        
    }
    return cells;
};

//get diagonal cells
//arg 0: from top-left
//arg 1: from top-right
Grid.prototype.getDiagIndices = function(arg){
    var cells = [];
    if(arg !== 1 && arg !==0){
        console.error("Wrong arg for getDiagIndices!");
        return undefined;
    }else if(arg === 0){
        return [0, 4, 8];
    }else{
        return [2, 4, 6];
    }
};

//get first index with two in a row (accepts computer or player as argument)
Grid.prototype.getFirstWithTwoInARow = function(agent){
    if(agent !== computer && agent !== player){
        console.error("Function getFirstWithTwoInARow accepts only player or computer as argument");
        return undefined;
    }
    var sum = agent * 2,
    freeCells = shuffleArray(this.getFreeCellIndices());
    for (var i = 0; i<freeCells.length; i++){
        for(var j = 0; j<3; j++){
            var rowV = this.getRowValues(j);
            var rowI = this.getRowIndices(j);
            var colV = this.getColumnValues(j);
            var colI = this.getColumnIndices(j);
            if(sumArray(rowV) == sum && isInArray(freeCells[i], rowI)){
                return freeCells[i];
            }
            else if(sumArray(colV) == sum && isInArray(freeCells[i],colI)){
                return freeCells[i];
            }
        }
        for(j = 0; j<2; j++){
            var diagV = this.getDiagValues(j);
            var diagI = this.getDiagIndices(j);
            if(sumArray(diagV) == sum && isInArray(freeCells[i],diag[i])){
                return freeCells[i];
            } 
        }
    }
    return false;

};

Grid.prototype.reset = function(){
    for(var i = 0; i<this.cells.length; i++){
        this.cells[i] = 0;
    }
    return true
};


//MAIN FUNCTION

//executed when the page loads
function initialize(){
    myGrid = new Grid();
    moves = 0;
    winner = 0;
    gameOver = false;
    whoseTurn = player; //default, this may change
    for(var i = 0; i <= myGrid.cells.length -1; i++){
        myGrid.cells[i] = 0;
    }
    //p165 this code might not be a comment
    //setTimeout(assignRoles, 500);

    setTimeout(showOption, 500);
    //debugger;
}


//ask player if they want to play as X or O. X goes first

function assignRoles(){
    askUser("Do you want to go first?");

    document.getElementById("yesBtn").addEventListener("click", makePlayerX);
    document.getElementById("noBtn").addEventListener("click", makePlayerO);

}



