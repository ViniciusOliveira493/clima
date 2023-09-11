window.onload = function () {
    iniciar();
}

function iniciar(){
    getLocationAndWeather();

}

async function getLocationAndWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (pos) {
            buscarClima(pos.coords.latitude,pos.coords.longitude);
            buscarClimaDias(pos.coords.latitude,pos.coords.longitude);
        });
    }else{
        alert("Browser sem suporte a localização");
    }

}

function buscarClima(latitude, longitude){
    let div = document.getElementById('info');
    let url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=0f99fb452e1f092b08e2a0c5e4e0b115";  
   
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            loadFields1(data);
        });
}

function buscarClimaDias(latitude, longitude){
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=0f99fb452e1f092b08e2a0c5e4e0b115";

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(JSON.stringify(data))
    });    
}

function loadFields1(data){
    let cidade = document.getElementById('lblCidade');
    let cond = document.getElementById('lblCondition');
    let temp = document.getElementById('lblTempNumber');
    let maxTemp = document.getElementById('lblMaxTemp');
    let minTemp = document.getElementById('lblMinTemp');
    let fellTemp = document.getElementById('lblFellTemp');

    let humidity = document.getElementById('lblHumidity');
    let atm = document.getElementById('lblAtmPress');
    let visibility = document.getElementById('lblVisibility');
    let wind = document.getElementById('lblWind');
    let cloud = document.getElementById('lblCloud');

    let weather = document.getElementById('wheaterIcon');

    cidade.innerHTML = data.name;
    cond.innerHTML = data.weather[0].description;
    temp.innerHTML = parseInt((data.main.temp)-273.15);
    maxTemp.innerHTML = parseInt((data.main.temp_max)-273.15);
    minTemp.innerHTML = parseInt((data.main.temp_min)-273.15);
    fellTemp.innerHTML = parseInt((data.main.feels_like)-273.15);

    humidity.innerHTML = data.main.humidity;
    atm.innerHTML = data.main.pressure;
    visibility.innerHTML = data.visibility/1000;
    wind.innerHTML = data.wind.speed;
    cloud.innerHTML = data.clouds.all;

    weather.setAttribute("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");

}