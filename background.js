var timer;
var currentValue = 25;
var isTicking = false;

function start() {
    isTicking = true;
    tick();
}

function stop() {
    isTicking = false;
    reset();
}

function reset() {
    clearTimeout(timer);
    currentValue = 25;
    chrome.browserAction.setBadgeText({ text: '' });
}

function tick() {
    if (currentValue <= 0) {
        stop();
        notify();
    } else {
        chrome.browserAction.setBadgeText({ text: currentValue.toString() + "'" });
        currentValue--;
        timer = setTimeout(tick, 60000);
    }
}

function notify() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'gfx/icon-128.png',
        title: '25 minutes have passed',
        message: 'One pomodoro completed, take a short break.',
        requireInteraction: true,
        buttons: [{ title: 'Restart timer' }]
    })
}

function toggleTimer() {
    if (isTicking) {
        stop();
    } else {
        start();
    }
}

chrome.notifications.onButtonClicked.addListener(function (_, __) {
    start();
});

chrome.browserAction.onClicked.addListener(toggleTimer);
