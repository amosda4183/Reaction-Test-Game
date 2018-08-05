/*

  This application is a simple reaction game. Within the window, shapes of a random size and color will appear
  once the start button is pressed. The user must move the mouse pointer and click on each shape as it appears,
  as fast as possible.
  
  Statistics will be kept, tracking how quickly the last attempt took and showing it on the screen.The app will also be
  counting the total number of attempts. The fastest and slowest time will be tracked, as well as the average time. Once the user 
  presses the stop button, these statistics will be shown at the top of the screen. 

  After finishing the game, the user has the option to start the game again.

*/

//Global variables
let averageReaction = 0;
let counter = 0;
let start = 0;
let end = 0;
let timeTaken = 0;
let fastestTime = 10000;
let slowestTime = 0;

// function definitions *****************************************************************************

//Generate random dimensions for the shape to appear
  function createShape(){

      //Generate random relative position for the shape
    let top = Math.random() * 500;
    let left = Math.random() * 750;

    //Generate random height and width
    let width = (Math.random() * 300) + 10;

    let radius = Math.random()* 70;

    document.getElementById('shape').style.width = width + "px";
    document.getElementById('shape').style.height = width + "px";

    document.getElementById('shape').style.top = top + "px";
    document.getElementById('shape').style.left = left + "px";

    document.getElementById('shape').style.backgroundColor = getRandomColor();

    document.getElementById('shape').style.borderRadius = radius + "%";


    //Display the shape
    document.getElementById("shape").style.display = "block";
      start = new Date().getTime();
  }

  //Generate random color for the shape
  function getRandomColor(){

  let letters = '0123456789ABCDEF'.split('');
  let color = '#';

  for(let i = 0; i < 6; i++){
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
  }

  function appearAfterDelay(){

  //create shape after a random interval betweeen 0 and 2 seconds
    setTimeout(createShape, Math.random()* 2000);
  }
// end function definitions**************************************************************************

//Begin game on start button click
document.getElementById("start").onclick = function()
{

document.getElementById("averageTime").style.display = "none";
document.getElementById("numAttempts").style.display = "none";
document.getElementById("fastestTime").style.display = "none";
document.getElementById("slowestTime").style.display = "none";
//Begin initial timer
appearAfterDelay();

//Change style properties of the shape upon clicking the shape
document.getElementById("shape").onclick = function(){

  document.getElementById("time").style.display = "block";

//Count number of times a shape is clicked
counter++;

//Calculate time it takes to click the shape, and update the p element showing the time taken.
   end = new Date().getTime();
   timeTaken = (end - start) / 1000;
document.getElementById("time").innerHTML = "Your time: " + timeTaken + "s";

//Check for fastet time and update p tag with fastest time
if(timeTaken < fastestTime){
  fastestTime = timeTaken;
}
if(timeTaken > slowestTime){
  slowestTime = timeTaken;
}

//Add to average time variable and reset the variable
averageReaction += timeTaken;
appearAfterDelay();

//Make the shape disappear when clicked to prepare for the next shape
document.getElementById("shape").style.display = "none";

}
}

//End game using stop button and display the average reaction time along with number of clicks

document.getElementById('stop').onclick = function(){

document.getElementById("shape").style.display = "none";
document.getElementById("time").style.display = "none";
document.getElementById("fastestTime").style.display = "block";
document.getElementById("slowestTime").style.display = "block";

document.getElementById("averageTime").style.display = "block";
document.getElementById("numAttempts").style.display = "block";

//Calculate statistics
averageReaction = (averageReaction / counter).toFixed(3);
document.getElementById("averageTime").innerHTML = "Average Reaction Time: " + averageReaction + "s";
document.getElementById("numAttempts").innerHTML = "Number of Attempts: " + counter;
document.getElementById('fastestTime').innerHTML = "Fastest time: " + fastestTime + "s";
document.getElementById('slowestTime').innerHTML = "Slowest time: " + slowestTime + "s";

//Reset statistics for next game
counter = 0;
averageReaction = 0;

}
