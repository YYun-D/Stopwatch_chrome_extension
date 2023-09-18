let isTimeDisplayEnabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleTimeDisplay') {
    isTimeDisplayEnabled = !isTimeDisplayEnabled;
    sendResponse({isEnabled: isTimeDisplayEnabled});
  } else if (request.action === 'getTimeDisplayStatus') {
    sendResponse({isEnabled: isTimeDisplayEnabled});
  }
});
