let latitude;
let longitude;
let url1;
let url2;
let intCurrentTemp;
let intApparentTemp;
let humidity;
let unixTime;
let dayName;
let intWindSpeed;
let intPressuremSl;
let upcomingDays;
let nextDays;
let maxdailyTemp=[];
let intMaxDailyTemp=[];
let mindailyTemp=[];
let intMinDailyTemp=[];
let windSpeed=[];
let intDailyWindSpeed=[];

const inputElement = document.querySelector("#cityInput");
inputElement.addEventListener('keydown', function(event) {
    if(event.key === 'Enter' ) {
        console.log('Enter Key was pressed');
        const loader = document.getElementById('loader');
        loader.style.display = 'block';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 1300);
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
        console.log(nextDays);
        },5000);
    url2 = `https://api.open-meteo.com/v1/forecast?latitude=${longitude}&longitude=${latitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,pressure_msl,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timeformat=unixtime&timezone=Asia%2FTokyo`;
    await getWeather();
};


const getWeather = async() => {
    let response2 = await fetch(url2);
    console.log(response2)
    let data2 = await response2.json();
    console.log(data2);
    let currentTemp = await data2.current.temperature_2m;
    let apparentTemp = await data2.current.apparent_temperature;
    humidity = await data2.current.relative_humidity_2m;
    let currentWindSpeed = await data2.current.wind_speed_10m;
    let pressure = await data2.current.pressure_msl;
    maxdailyTemp = await data2.daily.temperature_2m_max;
    mindailyTemp = await data2.daily.temperature_2m_min;
    windSpeed = await data2.daily.wind_speed_10m_max;
    unixTime = await data2.current.time;
    intCurrentTemp = Math.floor(currentTemp);
    intApparentTemp = Math.floor(apparentTemp);
    intWindSpeed = Math.floor(currentWindSpeed);
    intPressuremSl = Math.floor(pressure);
    for(let i=0; i<6; i++){
        intMaxDailyTemp[i] = Math.floor(maxdailyTemp[i]);
        intMinDailyTemp[i] = Math.floor(mindailyTemp[i]);
        intDailyWindSpeed[i] = Math.floor(windSpeed[i]);}
    console.log(windSpeed);
    getDay();
    changeText();
};

function getDay() {
    const date = new Date(unixTime * 1000);
    const dayNumber = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    upcomingDays = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    dayName = days[dayNumber];
    nextDays = [] ;
    for (let i = 1; i <= 6; i++){
    const nextIndex = (dayNumber + i) % 7;
    nextDays.push(upcomingDays[nextIndex]);
    }
    console.log(`Today is ${dayName}`);
    }

    

function changeText() {
    const temp = document.querySelector("#tempBar");
    temp.innerText = `+${intCurrentTemp}°C`;
    const feelTemp = document.querySelector("#tempFeel");
    feelTemp.innerText = `Feels like ${intApparentTemp}°C`;
    const day = document.querySelector("#day");
    day.innerText = `${dayName}`;
    const humidPer = document.querySelector("#humidPercent");
    humidPer.innerText = `${humidity}%`;
    const windSpeed = document.querySelector("#windSpeed");
    windSpeed.innerText = `${intWindSpeed}km/h`; 
    const seaPressure = document.querySelector("#pressureSealvl");
    seaPressure.innerText = `${intPressuremSl}hPa`;
    const day1 = document.querySelector("#day1");
    day1.innerText=`${nextDays[0]}`;
    const day2 = document.querySelector("#day2");
    day2.innerText=`${nextDays[1]}`;
    const day3 = document.querySelector("#day3");
    day3.innerText=`${nextDays[2]}`;
    const day4 = document.querySelector("#day4");
    day4.innerText=`${nextDays[3]}`;
    const day5 = document.querySelector("#day5");
    day5.innerText=`${nextDays[4]}`;
    const day6 = document.querySelector("#day6");
    day6.innerText=`${nextDays[5]}`;
    const tempDay1 = document.querySelector("#temp1");
    tempDay1.innerText=`${intMinDailyTemp[0]}-${intMaxDailyTemp[0]}°C`;
    const tempDay2 = document.querySelector("#temp2");
    tempDay2.innerText=`${intMinDailyTemp[1]}-${intMaxDailyTemp[1]}°C`;
    const tempDay3 = document.querySelector("#temp3");
    tempDay3.innerText=`${intMinDailyTemp[2]}-${intMaxDailyTemp[2]}°C`;
    const tempDay4 = document.querySelector("#temp4");
    tempDay4.innerText=`${intMinDailyTemp[3]}-${intMaxDailyTemp[3]}°C`;
    const tempDay5 = document.querySelector("#temp5");
    tempDay5.innerText=`${intMinDailyTemp[4]}-${intMaxDailyTemp[4]}°C`;
    const tempDay6 = document.querySelector("#temp6");
    tempDay6.innerText=`${intMinDailyTemp[5]}-${intMaxDailyTemp[5]}°C`;
    const windSpeed1 = document.querySelector("#windSpeed1");
    windSpeed1.innerText=`${intDailyWindSpeed[0]}km/h`;
    const windSpeed2 = document.querySelector("#windSpeed2");
    windSpeed2.innerText=`${intDailyWindSpeed[1]}km/h`;
    const windSpeed3 = document.querySelector("#windSpeed3");
    windSpeed3.innerText=`${intDailyWindSpeed[2]}km/h`;
    const windSpeed4 = document.querySelector("#windSpeed4");
    windSpeed4.innerText=`${intDailyWindSpeed[3]}km/h`;
    const windSpeed5 = document.querySelector("#windSpeed5");
    windSpeed5.innerText=`${intDailyWindSpeed[4]}km/h`;
    const windSpeed6 = document.querySelector("#windSpeed6");
    windSpeed6.innerText=`${intDailyWindSpeed[5]}km/h`;
}

