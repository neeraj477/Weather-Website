let latitude;
let longitude;
let url1;
let url2;


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
    url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,precipitation_probability_max,wind_speed_10m_max&timeformat=unixtime&timezone=Asia%2FTokyo`;
    await getWeather();
};


const getWeather = async() => {
    let response2 = await fetch(url2);
    console.log(response2)
    let data2 = await response2.json();
    console.log(data2);
};