var stopwatchElement = document.createElement('div');

stopwatchElement.style.backgroundColor = 'lightgray';
stopwatchElement.style.width = '250px';
stopwatchElement.style.position = 'fixed';
stopwatchElement.style.top = '50px';  // 상단으로 조정
stopwatchElement.style.right = '50px';  // 오른쪽으로 조정
stopwatchElement.style.padding = '20px';
stopwatchElement.style.zIndex = '9999';
stopwatchElement.style.borderRadius = '10px';
stopwatchElement.style.userSelect = 'none'; // 드래그 막기
stopwatchElement.style.textAlign = 'center';
stopwatchElement.style.display = 'none';

var TimeElement = document.createElement('div');
TimeElement.id = 'stopwatch';
TimeElement.style.fontSize = '50px';
TimeElement.style.fontWeight = 'bold';
TimeElement.textContent = '00:00.00';
TimeElement.style.paddingBottom = '16px';

var startstop = document.createElement('button');
var resetbutton = document.createElement('button');

startstop.style.margin = '16px';
resetbutton.style.margin = '16px';

startstop.textContent = '시작';
resetbutton.textContent = '리셋';

startstop.addEventListener('click', startStop);
resetbutton.addEventListener('click', reset);

stopwatchElement.appendChild(TimeElement);
stopwatchElement.appendChild(startstop);
stopwatchElement.appendChild(resetbutton);
document.body.appendChild(stopwatchElement);

let timer;
let isRunning = false;
let startTime;
let stopTime;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startstop.textContent = "시작";
        stopTime = Date.now();
    } else {
        startTime = Date.now();
        if (stopTime) startTime = stopTime;
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