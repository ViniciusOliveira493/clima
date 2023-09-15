window.onload = function () {
    iniciar();
    traduzir();
}

document.getElementById("btnSearchLocalWeather").addEventListener("click",function () {
    carregarLocal();
});

document.getElementById("btnSearch").addEventListener("click",function () {
    let cidade = document.getElementById("txtCidade").value;
    buscarClimaAtual(0,0,cidade);
});

function iniciar(){
    buscarClimaAtual(0,0,"sao paulo");
}

function carregarLocal() {
    if(navigator.geolocation){
        let authorized = confirm('Ao clicar em "OK", a sua localização será utilizada para mostrar o clima atual na sua região.');
        if(authorized){
            navigator.geolocation.getCurrentPosition(function (pos) {
                buscarClimaAtual(pos.coords.latitude,pos.coords.longitude);
            });
        }        
    }else{
        alert("Browser sem suporte a localização");
    }
}

function buscarClimaAtual(latitude, longitude, city){
    let div = document.getElementById('info');
    let url = "";
    
    if(city==undefined){
        url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=0f99fb452e1f092b08e2a0c5e4e0b115";
    }else{
        url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=0f99fb452e1f092b08e2a0c5e4e0b115";
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if(data.cod != 404){
                loadFields1(data);
                buscarClimaDias(latitude, longitude, city);
            }else{
                alert(data.message);
            }
        });
    
    
}

function buscarClimaDias(latitude, longitude,city){
    let url = "";

    if(city==undefined){
        url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=0f99fb452e1f092b08e2a0c5e4e0b115";
    }else{
        url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=0f99fb452e1f092b08e2a0c5e4e0b115";
    }

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        let conteiner = document.getElementById("cardConteiner");
        conteiner.innerHTML = "";
        data.list.forEach(element => {            
            conteiner.appendChild(createCard(element));
        });
    });    
}

function loadFields1(data){
    let cidade = document.getElementById('lblCidade');
    let cond = document.getElementById('lblCondition');
    let temp = document.getElementById('lblTempNumber');
    let maxTemp = document.getElementById('lblMaxTemp');
    let minTemp = document.getElementById('lblMinTemp');
    let fellTemp = document.getElementById('lblFellTemp');

    let humidity = document.getElementById('lblHumidityNumber');
    let atm = document.getElementById('lblAtmPressNumber');
    let visibility = document.getElementById('lblVisibilityNumber');
    let wind = document.getElementById('lblWindNumber');
    let cloud = document.getElementById('lblCloudNumber');

    let weather = document.getElementById('wheaterIcon');

    document.title = "Clima Atual - "+data.name;
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

function createCard(data) {
    let div = document.createElement("div");
    div.setAttribute("class","card");

    let img = document.createElement("img");
    img.setAttribute("src","https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");

    img.setAttribute("alt","weather icon");

    div.appendChild(img);

    let graus = document.createElement("span");
    graus.innerHTML = parseInt((data.main.temp)-273.15)+"ºC <br>";

    div.appendChild(graus);
    let date = document.createElement("span");
    
    let dataEHora = data.dt_txt;
    dataEHora = dataEHora.split(" ");

    let dataCard = dataEHora[0].split("-");
    dataCard =  new Date(dataCard[0],dataCard[1]-1,dataCard[2]);   

    date.innerHTML = formatarData(dataCard)+" "
                    +dataEHora[1].substring(0,dataEHora[1].length-3);

    div.appendChild(date);
    return div;
}

function formatarData(dataCard){
    let diaCard = dataCard.getDate();
    if(diaCard < 10){
        diaCard = "0"+diaCard;
    }

    let mesCard = dataCard.getMonth();
    if (mesCard < 10) {
        mesCard = "0"+mesCard;
    }

    return diaCard+"/"+mesCard+"/"+dataCard.getFullYear();
}