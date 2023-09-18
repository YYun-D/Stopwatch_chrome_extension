document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById('timeonoff');

  // 초기 on/off 상태 확인
  chrome.runtime.sendMessage({action: 'getTimeDisplayStatus'}, function(response) {
    var isTimeDisplayEnabled = response.isEnabled;
    toggleButton.checked = isTimeDisplayEnabled ? true : false;
    if (isTimeDisplayEnabled) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: enableTimeDisplay
        });
      });
    } else {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: disableTimeDisplay
        });
      });
    }
  });

  // on/off 상태 변경
  toggleButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({action: 'toggleTimeDisplay'}, function(response) {
      var isTimeDisplayEnabled = response.isEnabled;
      toggleButton.checked = isTimeDisplayEnabled ? true : false;
      if (isTimeDisplayEnabled) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: enableTimeDisplay
          });
        });
      } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: disableTimeDisplay
          });
        });
      }
    });
  });

  // TimeDisplay 활성화
  function enableTimeDisplay() {
    var currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
      currentTimeElement.style.display = 'block';
    }
  }

  // TimeDisplay 비활성화
  function disableTimeDisplay() {
    var currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
      currentTimeElement.style.display = 'none';
    }
  }

});