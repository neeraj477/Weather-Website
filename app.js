let latitude;
let longitude;
let url1;
let url2;
let intCurrentTemp;
let intApparentTemp;
let unixTime;
let dayName;

const inputElement = document.querySelector("#cityInput");
inputElement.addEventListener('keydown', function(event) {
    if(event.key === 'Enter' ) {
        console.log('Enter Key was pressed');
        getInputValue();
    }
});


const getInputValue = async() => {
    const inputValue = await document.getElementById('cityInput').value;
    console.log(inputValue);
    url1 = `https://api.geoapify.com/v1/geocode/search?city=${inputValue}&country=India&apiKey=e75583aee77a407d8507b6c92336a9e3`;
    await getLocation();
};


const getLocation = async() => {
    let response1 = await fetch(url1);
    let data1 = await response1.json();
    latitude = await data1.features[0].geometry.coordinates[0];
    longitude = await data1.features[0].geometry.coordinates[1];
    setTimeout (() => {
        console.log(latitude);
        console.log(longitude);
        },5000);
    url2 = `https://api.open-meteo.com/v1/forecast?latitude=${longitude}&longitude=${latitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,precipitation_probability_max,wind_speed_10m_max&timeformat=unixtime&timezone=Asia%2FTokyo`;
    await getWeather();
};


const getWeather = async() => {
    let response2 = await fetch(url2);
    console.log(response2)
    let data2 = await response2.json();
    console.log(data2);
    currentTemp = await data2.current.temperature_2m;
    apparentTemp = await data2.current.apparent_temperature;
    unixTime = await data2.current.time;
    intCurrentTemp = Math.floor(currentTemp);
    intApparentTemp = Math.floor(apparentTemp);
    console.log(unixTime);
    await getDay();
    await changeText();
};

function getDay() {
    const date = new Date(unixTime * 1000);
    const dayNumber = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayName = days[dayNumber];
    console.log(`Today is ${dayName}`); 
    }

function changeText() {
    const temp = document.querySelector("#tempBar");
    temp.innerText = `+${intCurrentTemp}°C`;
    const feelTemp = document.querySelector("#tempFeel");
    feelTemp.innerText = `Feels like ${intApparentTemp}°C`;
    const day = document.querySelector("#day");
    console.log(dayName);
    day.innerText = `${dayName}`;
}

