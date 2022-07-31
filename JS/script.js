
const time = document.querySelector('.time');
const dataTime = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)

function showDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString('uk-Ua', options);
    dataTime.textContent = currentDate
}


function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 17 && 21 > hours) {
        return 'evening'
    } else if (hours > 2 && 12 > hours) {
        return 'morning'
    } else if (12 > hours && 14 > hours) {
        return 'noon'
    }
    else if (hours > 14 && hours < 17) {
        return 'afternoon'
    }
    else {
        return ' night'
    }
}
const timeOfDay = getTimeOfDay();
function showGreeting() {
    greeting.textContent = `Good ${timeOfDay},`;
}




function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    showGreeting()
    setTimeout(showTime, 1000);
};
showTime();

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)