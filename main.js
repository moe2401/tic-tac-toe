"use strict";

//Bind Esc key to closing the modal dialog//
document.onkeypress = function(evt){
    evt = evt || window.event;
    var modal = document.getElementsByClassName("modal")[0];
    if(evt.keyCode === 27){
        modal.style.display = "none";
    }
};


//When the user clicks somewhere outside the modal dialog, close it
window.onclick = function (evt){
    var modal = document.getElementsByClassName("modal")[0];
    if(evt.target === modal){
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

