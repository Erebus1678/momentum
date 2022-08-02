
const time = document.querySelector('.time');
const dataTime = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.querySelector('body')
const timeOfDay = getTimeOfDay();
let randomNum;
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

function getRandomNum(max, min) {
    return Math.ceil(Math.random() * (max - min) + min)
}

randomNum = getRandomNum(20, 1)
console.log(typeof (randomNum))
function getSlideNext() {
    randomNum = randomNum + 1
    if (randomNum === 21) {
        randomNum = 1
    }

    setBg()
}

function getSlidePrev() {
    randomNum = randomNum - 1
    if (randomNum === 0) {
        randomNum = 20
    }

    setBg()
}


nextBtn.addEventListener('click', getSlideNext)
prevBtn.addEventListener('click', getSlidePrev)


function setBg() {
    let bgNum = randomNum.toFixed().padStart(2, '0');
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
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