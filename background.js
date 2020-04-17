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
    chrome.browserAction.setBadgeText({ text: '' });
    currentValue = 25;
    clearTimeout(timer);
}

function tick() {
    if (currentValue == 0) {
        stop();
        notify();
    } else {
        chrome.browserAction.setBadgeText({ text: currentValue.toString() + "'" });
        currentValue--;
        timer = setTimeout(tick, 50);
    }
}

function notify() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'gfx/icon-128.png',
        title: '25 minutes have passed',
        message: 'One pomodoro complete, take a short break away from the computer.',
        requireInteraction: true,
    })
}

function toggleTimer() {
    if (isTicking) {
        stop();
    } else {
        start();
    }
}

chrome.browserAction.onClicked.addListener(toggleTimer);

chrome.browserAction.setIcon({ path: 'gfx/icon-32.png' });

chrome.browserAction.setBadgeText({ text: '' });
