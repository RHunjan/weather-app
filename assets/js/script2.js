 var buttonEl = document.querySelector(".btn");
 var inputCityName = document.querySelector(".inputName");
 var displayCityName = document.querySelector("#cityName");
 var cityTempEl = document.querySelector("#temp");
 var cityWindEl =document.querySelector("#wind");
 var cityHumidityEl = document.querySelector("#humidity");
 var cityUvEl = document.querySelector("#uv_index");
 var dailyForecastEl = document.querySelector(".forecast_cards");

 var dailyWeather = [];

 
//function to get values from data returned

var getWeather = function(){
       fetch("https://https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly&appid=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){
        response.json().then(function(data){
            // capture data
            var cityName = data['name'];
            var cityTemp = data['main']['temp'];
            var cityWind = data['wind']['speed'];
            var cityHumidity = data['main']['humidity'];
            var lat = data['coord']['lat'];
            var lon = data['coord']['lon'];
            console.log(cityName, cityTemp, cityWind, cityHumidity, lat, lon);   
            getUvIndex(lat,lon); 
           // forecast(lat,lon); 
            
            // display data
           displayCityName.innerHTML = cityName;
           cityTempEl.innerHTML = "Temp: " + cityTemp + " F";
           cityWindEl.innerHTML = "Wind: " + cityWind + " MPH";
           cityHumidityEl.innerHTML = "Humidity: " + cityHumidity + " %";
        })
        
        .catch(function(error){
            alert("Please enter valid city");
        })
    })
};

// fetch to get uvindex data
var getUvIndex = function(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" +lon +"&exclude=minutely,hourly&appid=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){
        response.json().then(function(data){
            var uvIndex = data['current']['uvi'];
            cityUvEl.innerHTML = `UV Index: ${uvIndex}`;
        })
    })
};

//var forecast = function(lat,lon){
   // fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ lon +"&appid=d564b912988e6af5b9f3c1b180526f25")
//};
    
buttonEl.addEventListener('click', function(){
 getWeather();

});


