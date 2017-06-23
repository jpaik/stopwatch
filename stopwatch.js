var time = {'minutes': 0, 'seconds': 0, 'centiseconds': 0};
var timer, running = false, mode = "normal", tournamentStop = false;
var timeDiv = document.getElementById('time'); //Span that hold time string
var modeButton = document.getElementById('mode'); //Clicking mode

document.addEventListener('keydown', handleTimer); //On pressing space
document.addEventListener('keyup', handleTournamentTimer); //On letting go of space

modeButton.addEventListener('click', changeMode); //Change mode on button click

//Absolutely position at center
window.onload = centerTimer;
window.addEventListener('resize', centerTimer);
function centerTimer(){
  timeDiv.style.top = window.innerHeight / 2 - timeDiv.offsetHeight - 20 + 'px';
  timeDiv.style.left = window.innerWidth / 2 - timeDiv.offsetWidth / 2 + 'px';
}

function handleTimer(e){ //Sends it to correct function based on running
  var keyCode = e.keyCode;
  if(keyCode !== 32) return;

  if(mode === "tournament"){
    if(running){
      tournamentStop = true;
      stopTime();
    }
    return;
  }

  if(running){ //Stop time
    stopTime();
  } else { //Run Time
    Object.keys(time).forEach(x => time[x] = 0); //Reset
    timeDiv.innerHTML = getTimeString();
    running = true;
    timer = setInterval(runTime, 10); //Runs every 10 millisecond
  }
}

function handleTournamentTimer(e){
  if(mode === "normal") return;
  var keyCode = e.keyCode;
  if(keyCode !== 32) return;
  if(tournamentStop){ //Hard stop on tournament because of my logic.
    tournamentStop = false;
    return;
  }

  if(!running){
    Object.keys(time).forEach(x => time[x] = 0); //Reset
    timeDiv.innerHTML = getTimeString();
    running = true;
    timer = setInterval(runTime, 10); //Runs every 10 millisecond
  }
}

function changeMode(e){
  e.preventDefault();
  modeButton.blur();
  if(running){
    stopTime();
    Object.keys(time).forEach(x => time[x] = 0); //Reset
    timeDiv.innerHTML = getTimeString();
  }
  if(modeButton.dataset.mode === "normal"){ //Switch to tournament
    document.querySelector('.normal').style.display = "none";
    document.querySelector('.tournament').style.display = "inline-block";
    modeButton.dataset.mode = "tournament";
     mode = "tournament";
  } else {
    document.querySelector('.normal').style.display = "inline-block";
    document.querySelector('.tournament').style.display = "none";
    modeButton.dataset.mode = "normal";
    mode = "normal";
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
