//Define var to hold time values

let seconds = 0;
let minutes = 0;
let hours = 0;
let milsec = 0;
let barCount = 0;

//bool value if timer is running

let isRunning = false;

//var for color/clock status

let i = 0;
var green = '#00A868'
var white = '#C8C8C8'

//Variable to hold average/mean
var averageSolveTime = 0;
var averageMeanTime = 0;


//Define Vars to hold "display"

let displaySec = 0;
let displayMilSec = 0;
let displayMin = 0;
let displayHours = 0;

//Var to save most recent time
let recentTime = 0;

//Define var to hold setInterval() function
let interval = null;

//Define var to hold stopwatch status
let status = "stopped";

//Array to store the solves
var solves = [];



//Stopwatch function (logic to determine increments)


function scrambleGen(){
    var scramble_button = document.getElementById("sb")
    
		
		var scrambleOne = function () {
			var options = ["F", "F2", "F'", "R", "R2", "R'", "U", "U2", "U'", "B", "B2", "B'", "L", "L2", "L'", "D", "D2", "D'"]
            var numOptions = [0, 1, 2, 3, 4, 5] // 0 = F, 1 = R, 2 = U, 3 = B, 4 = L, 5 = D
            var scramble = []
            var scrambleMoves = []
            var bad = true
			var FRU = document.getElementById("FRU")
			
			
			while (bad) {
                scramble = []
                for (var i = 0; i < 20; i++) {
                    scramble.push(numOptions[getRandomInt(6)])
                }
                
                // check if moves directly next to each other involve the same letter
                for (var i = 0; i < 20 - 1; i++) {
                    if (scramble[i] == scramble[i + 1]) {
                        bad = true
                        break
                    } else {
                        bad = false
                    }
                }
            }
            console.log(scramble);

            for (var i = 0; i < 20; i++) {
                switch (scramble[i]) {
                    case 0:
                        move = options[getRandomInt(3)] // 0,1,2
                        scrambleMoves.push(move)
                        break
                    case 1:
                        move = options[getRandomIntBetween(3, 6)] // 3,4,5
                        scrambleMoves.push(move)
                        break
                    case 2:
                        move = options[getRandomIntBetween(6, 9)] // 6,7,8
                        scrambleMoves.push(move)
                        break
                    case 3:
                        move = options[getRandomIntBetween(9, 12)] // 9,10,11
                        scrambleMoves.push(move)
                        break
                    case 4:
                        move = options[getRandomIntBetween(12, 15)] // 12,13,14
                        scrambleMoves.push(move)
                        break
                    case 5:
                        move = options[getRandomIntBetween(15, 18)] // 15,16,17
                        scrambleMoves.push(move)
                        break
                }
            }

            
			document.getElementById("scramble").textContent = scrambleMoves.join(" ")
		}
		
		scramble_button.addEventListener("click",scrambleOne());

}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) // returns up to max - 1
}

function getRandomIntBetween(min, max) { // return a number from min to max - 1. Ex. 3, 9 returns 3 - 8
    return Math.floor(Math.random() * (max - min) + min)
}

function stopWatch(){
    milsec++;

    //logic to determine increment
    if(milsec/100 == 1){
        milsec = 0;
        seconds++;

    if (seconds/60 ==1){
        seconds = 0;
        minutes++;

         if(minutes/60 == 1){
            minutes = 0;
            hours ++;
            }


     }
}

     if(milsec<10){
         displayMilSec = "0"+milsec.toString();
     }
     else{
         displayMilSec = milsec;
     }

     if(seconds<10){
        displaySec = "0"+seconds.toString();
    }
    else{
        displaySec = seconds;
    }

    if(minutes<10){
        displayMin = "0"+minutes.toString();
    }
    else{
        displayMin = minutes;
    }
        
    if(hours<10){
        displayHours = "0"+hours.toString();
    }
    else{
        displayMin = minutes;
    }

    

    //Display update time value to user
    document.getElementById("display").innerHTML = displayMin + ":" + displaySec + "." + displayMilSec;
    
    
}
function start(){

        //Start StopWatch by calling set Interval

        interval = window.setInterval(stopWatch, 10);
        //document.getElementById("startStop").innerHTML = "Stop";
        isRunning = true;
}
function stop(){
    
       isRunning = false;
        window.clearInterval(interval);
        
       
        //document.getElementById("startStop").innerHTML = "Start";
        
        //document.getElementById("average").innerHTML = recentTime;


}
function saveRecent(){
    //adds to solves array
    solves.push(recentTime);

}

//Returns Recent Average of 5 from Solves
function getAverage(){
    if(solves.length >=5){
        var total = 0;
        for(var i = 0; i<5; i++){
           total += solves[solves.length-i-1] 
        }

        averageSolveTime =Math.round((total/5 + Number.EPSILON) * 100) / 100 //two decimal places

        document.getElementById('Ao5').innerHTML = "Current Average of 5: " + averageSolveTime;
    }
    else{
        document.getElementById('Ao5').innerHTML = "Current Average of 5: ";
    }

    


    


}


//Changes Color of timer when called
function colorChange(color){
    var elem = document.querySelector('#display');
    elem.style.color = color     
}

//Saves Time and Displays At bottom
function displaySolve(){

    var ul = document.getElementById("theList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(solves[solves.length-1])); //current solve
    var button = document.createElement("button");
    button.innerHTML = "X";
    li.appendChild(button);

    button.addEventListener ("click", function() {
        button.remove()
        li.remove();
        for(var j = solves.length -1 ; j>=0; j--){
            if(solves[j]== li.innerText){
                solves.splice(j,1);  //shorten array, remove deleted value
                getAverage();  // new average must be computed
                break;  //no need to stay in loop
            }
        }

        ;
      });
   
    ul.appendChild(li);
    
    
}

//function to reset timer
function reset(){
    recentTime =  Math.round(((minutes*60) + seconds + (milsec/100) + Number.EPSILON) * 100) / 100


    seconds = 0;
    minutes = 0;
    hours = 0;
    milsec = 0;
    //document.getElementById("startStop").innerHTML = "Start";
    //document.getElementById("display").innerHTML = "00:00.00";
} 

// event = keyup or keydown

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {    
        if (isRunning){ 
            stop();       //Stops timer and clears values i to signify timer is off
            reset();
            i++;    
        }

        else{
            colorChange(green);   //When stopped, press to start
        }
    }
})


document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if(i>0){
            i = 0;                   //Methods are called when timer is stopped and spacebar is released
            saveRecent();       
            getAverage();
            displaySolve();
            scrambleGen();
        }

        else{
            start();                 //Methods called when spacebar is released to start timer
            colorChange(white);
        }
        
    }
    
   

    

  })
