
const time = document.querySelector('.time');
const dataTime = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.querySelector('body')
const timeOfDay = getTimeOfDay();
let randomNum = getRandomNum().toFixed();
const prevBtn = document.querySelector('.slide-prev')
const nextBtn = document.querySelector('.slide-next')
// ==================================

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)
// ===================================
function getRandomNum() {
    let result = Math.random() * (20 - 1) + 1;
    return result
}


function showDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString('uk-Ua', options);
    dataTime.textContent = currentDate
}


function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && 12 > hours) {
        return 'morning'
    } else if (hours >= 12 && 18 > hours) {
        return 'afternoon'
    } else if (hours >= 18 && 21 > hours) {
        return 'evening'
    } else {
        return 'night'
    }
}


function showGreeting() {
    greeting.textContent = `Good ${timeOfDay},`;
}



function setBg() {
    let bgNum = randomNum.padStart(2, '0')
    const timeOfDay = getTimeOfDay();
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}

setBg()

// clock 
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    showGreeting()
    setTimeout(showTime, 1000);
};
showTime();

// before close window set 'name' to local storage
function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)