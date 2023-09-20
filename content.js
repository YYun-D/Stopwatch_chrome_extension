var stopwatchElement = document.createElement('div');

stopwatchElement.style.backgroundColor = 'lightgray';
stopwatchElement.style.width = '250px';
stopwatchElement.style.position = 'fixed';
stopwatchElement.style.top = '50px';  // 상단으로 조정
stopwatchElement.style.right = '50px';  // 오른쪽으로 조정
stopwatchElement.style.zIndex = '9999';
stopwatchElement.style.borderRadius = '10px';
stopwatchElement.style.userSelect = 'none'; // 드래그 막기
stopwatchElement.style.textAlign = 'center';
stopwatchElement.style.display = 'none';
stopwatchElement.style.fontWeight = 'bold';
stopwatchElement.style.color = 'black';
stopwatchElement.id = 'stopwatch';

var TimeElement = document.createElement('div');
TimeElement.textContent = '00:00.00';
TimeElement.style.padding = '20px';
TimeElement.style.fontSize = '40px';

var startstop = document.createElement('button');
var resetbutton = document.createElement('button');
var settingbutton = document.createElement('button');

startstop.style.padding = '7px';
startstop.style.backgroundColor = 'white';
startstop.style.margin = '10px';
startstop.style.borderRadius = '10px';
startstop.style.fontWeight = 'bold';
startstop.style.fontSize = '20px';
startstop.style.border = 'none';
resetbutton.style.padding = '7px';
resetbutton.style.backgroundColor = 'white';
resetbutton.style.margin = '10px';
resetbutton.style.borderRadius = '10px';
resetbutton.style.fontWeight = 'bold';
resetbutton.style.fontSize = '20px';
resetbutton.style.border = 'none';
settingbutton.style.padding = '7px';
settingbutton.style.backgroundColor = 'white';
settingbutton.style.margin = '10px';
settingbutton.style.borderRadius = '10px';
settingbutton.style.fontWeight = 'bold';
settingbutton.style.fontSize = '20px';
settingbutton.style.border = 'none';

startstop.textContent = '시작';
resetbutton.textContent = '리셋';
settingbutton.textContent = '설정';

startstop.addEventListener('click', startStop);
resetbutton.addEventListener('click', reset);
settingbutton.addEventListener('click', setting);

var settingmenu = document.createElement('div');
var settingminute = document.createElement('input');
var settingsecond = document.createElement('input');
var setbutton = document.createElement('button');

setbutton.addEventListener('click', updateset);

settingminute.type = 'number';
settingminute.placeholder = '분';
settingminute.min = '0';
settingsecond.type = 'number';
settingsecond.placeholder = '초';
settingsecond.min = '0';
settingsecond.max = '59';

settingmenu.style.display = 'none';
settingmenu.style.justifyContent = 'center';
settingminute.style.width = '60px';
settingminute.style.height = '40px';
settingminute.style.margin = '10px';
settingminute.style.fontSize = '30px';
settingminute.style.borderRadius = '10px';
settingminute.style.border = 'none';
settingminute.style.textAlign = 'center';
settingsecond.style.width = '60px';
settingsecond.style.height = '40px';
settingsecond.style.margin = '10px';
settingsecond.style.fontSize = '30px';
settingsecond.style.borderRadius = '10px';
settingsecond.style.border = 'none';
settingsecond.style.textAlign = 'center';
setbutton.style.padding = '7px';
setbutton.style.backgroundColor = 'white';
setbutton.style.margin = '10px';
setbutton.style.borderRadius = '10px';
setbutton.style.fontWeight = 'bold';
setbutton.style.fontSize = '20px';
setbutton.style.border = 'none';

setbutton.textContent = '설정';

settingmenu.appendChild(settingminute);
settingmenu.appendChild(settingsecond);
settingmenu.appendChild(setbutton);
stopwatchElement.appendChild(TimeElement);
stopwatchElement.appendChild(startstop);
stopwatchElement.appendChild(resetbutton);
stopwatchElement.appendChild(settingbutton);
stopwatchElement.appendChild(settingmenu);
document.body.appendChild(stopwatchElement);

let timer;
let isRunning = false;
let startTime;
let stopTime;
let isSetting = false;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startstop.textContent = "시작";
        stopTime = Date.now()-startTime;
    } else {
        startTime = Date.now();
        if (stopTime) startTime -= stopTime;
        stopTime = null;
        timer = setInterval(updateTime, 10);
        startstop.textContent = "중지";
    }
    isRunning = !isRunning;
}

function updateTime() {
    let currentTime = Date.now() - startTime;
    let minutes = Math.floor(currentTime / 60000);
    let seconds = Math.floor((currentTime % 60000) / 1000);
    let milliseconds = Math.floor(currentTime % 1000 / 10);

    TimeElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    TimeElement.textContent = `00:00.00`;
    startstop.textContent = "시작";
    stopTime=null;
}

function setting() {
  if (isSetting) {
    settingmenu.style.display = 'none';
    settingminute.value = null;
    settingsecond.value = null;
    settingbutton.textContent = '설정';
  }
  else {
    settingmenu.style.display = 'flex';
    settingbutton.textContent = '취소';
  }
  isSetting = !isSetting;
}

function updateset() {
  if (!settingminute.value && !settingsecond.value)
    return;
  else if ((settingminute.value && !settingsecond.value) && String(settingminute.value)>0)
    TimeElement.textContent = `${String(settingminute.value).padStart(2, '0')}:${String(settingsecond.value).padStart(2, '0')}.00`;
  else if ((!settingminute.value && settingsecond.value) && (String(settingsecond.value).padStart(2, '0')>0 && String(settingsecond.value).padStart(2, '0')<60))
    TimeElement.textContent = `${String(settingminute.value).padStart(2, '0')}:${String(settingsecond.value).padStart(2, '0')}.00`;
  else if (String(settingminute.value)>0 && String(settingsecond.value).padStart(2, '0')>0 && String(settingsecond.value).padStart(2, '0')<60)
    TimeElement.textContent = `${String(settingminute.value).padStart(2, '0')}:${String(settingsecond.value).padStart(2, '0')}.00`;
}

chrome.runtime.sendMessage({action: 'getTimeDisplayStatus'}, function(response) {
    var isTimeDisplayEnabled = response.isEnabled;
    if (isTimeDisplayEnabled) enableTimeDisplay();
    else disableTimeDisplay();
});

// TimeDisplay 활성화
function enableTimeDisplay() {
    stopwatchElement.style.display = 'block';
}
// TimeDisplay 비활성화
function disableTimeDisplay() {
    stopwatchElement.style.display = 'none';
}

// 스톱워치를 클릭하여 자유롭게 이동
var isDragging = false;
var offsetX, offsetY;

stopwatchElement.addEventListener('mousedown', function(event) {
  isDragging = true;
  offsetX = event.clientX - stopwatchElement.offsetLeft;
  offsetY = event.clientY - stopwatchElement.offsetTop;
});

document.addEventListener('mousemove', function(event) {
  if (isDragging) {
    var newLeft = event.clientX - offsetX;
    var newTop = event.clientY - offsetY;
    stopwatchElement.style.left = newLeft + 'px';
    stopwatchElement.style.top = newTop + 'px';
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});