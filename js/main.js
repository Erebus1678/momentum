
const time = document.querySelector('.time');
const dataTime = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.querySelector('body')
const timeOfDay = getTimeOfDay();
let randomNum;
const prevBtn = document.querySelector('.slide-prev')
const nextBtn = document.querySelector('.slide-next')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote')
// ==================================

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
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

function getSlideNext() {
    randomNum = (+randomNum) + 1;
    if (randomNum === 21) {
        randomNum = 1
    }
    setBg()
}

function getSlidePrev() {
    randomNum = (+randomNum) - 1;
    if (randomNum === 0) {
        randomNum = 20
    }
    console.log(randomNum);
    setBg()
}

nextBtn.addEventListener('click', getSlideNext)
prevBtn.addEventListener('click', getSlidePrev)


function setBg() {
    let bgNum = (+randomNum).toFixed().padStart(2, '0');
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}
setBg()

// weather
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eng&appid=368708a88709681503b2359b93906325&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = `Feels like: ${data.main.feels_like}°C ${data.weather[0].description} `;
    wind.textContent = `Wind speed - ${data.wind.speed} m/s`
    humidity.textContent = `Humidity : ${data.main.humidity}%`
}
function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
    }
}
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

async function getQuotes() {
    const quotes = './assets/quotes/data.json'
    const res = await fetch(quotes);
    const data = await res.json();
    randomNum = getRandomNum(0, 4).toFixed()
    quote.textContent = data[randomNum].text
    quoteAuthor.textContent = data[randomNum].author
}
getQuotes();
changeQuoteBtn.addEventListener('click', getQuotes);
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
    localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorage)