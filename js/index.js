let searchLocation = document.querySelector("#searchLocation");
let subscribe = document.querySelector("#subscribe");
let findBtn = document.querySelector("#findBtn");
let subBtn = document.querySelector(".subBtn");
let myLocation = "cairo";
let navLink = Array.from(document.querySelectorAll(".nav-link"));
let navLink1 = document.querySelector(".nav-link-1");
let navLink2 = document.querySelector(".nav-link-2");
let navLink3 = document.querySelector(".nav-link-3");
let navLink4 = document.querySelector(".nav-link-4");
let navLink5 = document.querySelector(".nav-link-5");
let todayName = document.querySelector('#todayName')
let todayDate = document.querySelector('#todayDate')
let city = document.querySelector('#city')
let todayIcon = document.querySelector('#todayIcon')
let todayTemp = document.querySelector('#todayTemp')
let weatherStatus = document.querySelector('#weatherStatus')
let humidity = document.querySelector('#humidity')
let windSpeed = document.querySelector('#windSpeed')
let windDirection = document.querySelector('#windDirection')
let nextDayName = document.querySelector('#nextDayName')
let nextDayMaxTemp = document.querySelector('#nextDayMaxTemp')
let nextDayIcon = document.querySelector('#nextDayIcon')
let nextDayMinTemp = document.querySelector('#nextDayMinTemp')
let nextDayStatus = document.querySelector('#nextDayStatus')
let nextNextDayName = document.querySelector('#nextNextDayName')
let nextNextDayMaxTemp = document.querySelector('#nextNextDayMaxTemp')
let nextNextDayIcon = document.querySelector('#nextNextDayIcon')
let nextNextDayMinTemp = document.querySelector('#nextNextDayMinTemp')
let nextNextDayStatus = document.querySelector('#nextNextDayStatus')

searchLocation.addEventListener("keyup", function (e) {
  displayAll(e.target.value)
});
findBtn.addEventListener("click", function () {
  searchLocation.value = null;
});
subBtn.addEventListener("click", function () {
  subscribe.value = null;
});

/* active nav-itrm */
navLink1.addEventListener("click", function () {
  for (let i = 0; i < navLink.length; i++) {
    navLink[i].classList.remove("activess");
  }
  navLink1.classList.add("activess");
});
navLink2.addEventListener("click", function () {
  for (let i = 0; i < navLink.length; i++) {
    navLink[i].classList.remove("activess");
  }
  navLink2.classList.add("activess");
});
navLink3.addEventListener("click", function () {
  for (let i = 0; i < navLink.length; i++) {
    navLink[i].classList.remove("activess");
  }
  navLink3.classList.add("activess");
});
navLink4.addEventListener("click", function () {
  for (let i = 0; i < navLink.length; i++) {
    navLink[i].classList.remove("activess");
  }
  navLink4.classList.add("activess");
});
navLink5.addEventListener("click", function () {
  for (let i = 0; i < navLink.length; i++) {
    navLink[i].classList.remove("activess");
  }
  navLink5.classList.add("activess");
});
// API

let allData = [];
async function getData(myLocation) {
  let data  = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4af176380eb14ae0b8d22248241806&q=${myLocation}&q=07112&days=3`)
  let myData = await data.json()
  return myData; 
}
let date = new Date()
function displayToday() {
  let date = new Date()
  todayName.innerHTML = date.toLocaleDateString("em-us",{weekday:"long"})
  todayDate.innerHTML = date.toLocaleDateString("en-us",{day:"numeric"})+' '+date.toLocaleDateString("en-us",{month:"short"})
  city.innerHTML = allData.location.name;
  todayTemp.innerHTML = allData.current.temp_c + '°C';
  todayIcon.setAttribute("src", allData.current.condition.icon);
  weatherStatus.innerHTML = allData.current.condition.text;
  humidity.innerHTML = allData.current.humidity+'%';
  windSpeed.innerHTML = allData.current.wind_kph+' Km/h';
  windDirection.innerHTML = allData.current.wind_dir;
}
function displayNextDay() {
  let date = new Date(allData.forecast.forecastday[1].date)
  nextDayName.innerHTML = date.toLocaleDateString("em-us",{weekday:"long"})
  nextDayIcon.setAttribute("src",allData.forecast.forecastday[1].day.condition.icon);
  nextDayMaxTemp.innerHTML = allData.forecast.forecastday[1].day.maxtemp_c + '°C';
  nextDayMinTemp.innerHTML = allData.forecast.forecastday[1].day.mintemp_c + '°C';
  nextDayStatus.innerHTML = allData.forecast.forecastday[1].day.condition.text;
} 
function displayNextNextDay() {
  let date = new Date(allData.forecast.forecastday[2].date)
  nextNextDayName.innerHTML = date.toLocaleDateString("em-us",{weekday:"long"})
  nextNextDayIcon.setAttribute("src",allData.forecast.forecastday[2].day.condition.icon);
  nextNextDayMaxTemp.innerHTML = allData.forecast.forecastday[2].day.maxtemp_c + '°C';
  nextNextDayMinTemp.innerHTML = allData.forecast.forecastday[2].day.mintemp_c + '°C';
  nextNextDayStatus.innerHTML = allData.forecast.forecastday[2].day.condition.text;
} 
async function displayAll(myLocation="cairo") {
  allData = await getData(myLocation)
  displayToday()
  displayNextDay()
  displayNextNextDay()
}
displayAll(myLocation)