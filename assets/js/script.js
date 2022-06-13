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
       fetch("https://api.openweathermap.org/data/2.5/weather?q="+ inputCityName.value + "&appid=d564b912988e6af5b9f3c1b180526f25")
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
            forecast(cityName); 
            
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
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" +lon +"&exclude=hourly,daily&appid=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){
        response.json().then(function(data){
            var uvIndex = data['current']['uvi'];
            cityUvEl.innerHTML = `UV Index: ${uvIndex}`;
        })
    })
};

// fetch to get forecast data
var forecast = function(cityName){
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&appid=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){
        response.json().then(function(data){
            //capture data 
             dailyWeather = {
                date: data["list"][0]['dt_txt'],
                temp: data["list"][0]['main']['temp'],
                wind: data["list"][0]["wind"]["speed"],
                humidity: data["list"][0]['main']['humidity']
             }
             //display data
            console.log(dailyWeather);

            var dateCard = document.createElement('div');
            var displayDate = document.createElement('h4');
            var displayTemp = document.createElement('p');
            var displayWind = document.createElement('p');
            var displayHumidity = document.createElement('p');
            
            //get the date
            var dailyDateTime = dailyWeather.date;
            var dailyDate = dailyDateTime.slice(0,10);

            //add content to elements

            displayDate.innerHTML = dailyDate;
            displayTemp.innerHTML = `Temp: ${dailyWeather.temp} F`;
            displayWind.innerHTML = `Wind: ${dailyWeather.wind} MPH`;
            displayHumidity.innerHTML = `Humidity: ${dailyWeather.humidity} %`;

            //append content to dateCard
            dateCard.append(displayDate);
            dateCard.append(displayTemp);
            dateCard.append(displayWind);
            dateCard.append(displayHumidity);
          
            console.log(dailyDate);

          

            dailyForecastEl.appendChild(dateCard);



            //create card element
            //create lists elements
            //add text to list elements
            //append list elements to card element
            //append card element to div
        
        })
    })
};





buttonEl.addEventListener('click', function(){
 getWeather();

});