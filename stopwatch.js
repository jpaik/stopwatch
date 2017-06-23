var time = {'minutes': 0, 'seconds': 0, 'centiseconds': 0};
var timer, running = false;
var timeDiv = document.getElementById('time'); //Span that hold time string

document.addEventListener('keydown', handleTimer); //On pressing space

//Absolutely position at center
timeDiv.style.top = window.innerHeight / 2 - timeDiv.offsetHeight - 20 + 'px';
timeDiv.style.left = window.innerWidth / 2 - timeDiv.offsetWidth / 2 + 'px';

function handleTimer(e){ //Sends it to correct function based on running
  var keyCode = e.keyCode;  
  if(keyCode !== 32) return false;
  console.log("Init stopwatch");
  if(running){ //Stop time
    stopTime();
  } else { //Run Time    
    Object.keys(time).forEach(x => time[x] = 0); //Reset
    timeDiv.innerHTML = getTimeString();
    running = true;
    timer = setInterval(runTime, 10); //Runs every 10 millisecond
  }
}

function stopTime(){
  if(running) clearInterval(timer);
  running = false;
}

function runTime(){
  time['centiseconds']++;
  if(time['centiseconds'] >= 100){
    time['centiseconds'] = 0;
    time['seconds']++;
  }
  if(time['seconds'] >= 60){
    time['seconds'] = 0;
    time['minutes']++;
  }  
  timeDiv.innerHTML = getTimeString();
}

function getTimeString(){ //Add leading 0 to make it string and slice by -2 to remove leading 0 if > 10
  return Object.keys(time).map(x => ('0' + time[x]).slice(-2)).join(':');
}
