var stopwatchElement = document.createElement('div');

stopwatchElement.style.backgroundColor = 'lightgray';
stopwatchElement.style.width = '300px';
stopwatchElement.style.position = 'fixed';
stopwatchElement.style.top = '50px';  // 상단으로 조정
stopwatchElement.style.right = '50px';  // 오른쪽으로 조정
stopwatchElement.style.padding = '20px';
stopwatchElement.style.zIndex = '9999';
stopwatchElement.style.borderRadius = '10px';
stopwatchElement.style.userSelect = 'none'; // 드래그 막기
stopwatchElement.style.textAlign = 'center';

var TimeElement = document.createElement('div');
TimeElement.id = 'stopwatch';
TimeElement.style.fontSize = '50px';
TimeElement.style.fontWeight = 'bold';
TimeElement.textContent = '0:00:00.00';

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
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startstop.textContent = "시작";
    } else {
      timer = setInterval(updateTime, 10);
        startstop.textContent = "중지";
    }
    isRunning = !isRunning;
}

function updateTime() {
    milliseconds += 1;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    TimeElement.textContent = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    TimeElement.textContent = `0:00:00.00`;
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