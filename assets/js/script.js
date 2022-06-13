//Declare elements
var buttonEl = document.querySelector(".btn");
var inputCityName = document.querySelector(".inputName");
var displayCityName = document.querySelector("#cityName");
var cityTempEl = document.querySelector("#temp");
var cityWindEl =document.querySelector("#wind");
var cityHumidityEl = document.querySelector("#humidity");
var cityUvEl = document.querySelector("#uv_index");
 var dailyForecastEl = document.querySelector(".forecast_cards");

var getWeather = function(){

    cityName = inputCityName.value;
    console.log(cityName);

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&APPID=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){
        response.json().then(function(data){
            console.log(data);
        //capture data from fetch
            var cityName = data['name'];
            var cityTemp = data['main']['temp'];
            var cityWind = data['wind']['speed'];
            var cityHumidity = data['main']['humidity'];
            var lat = data['coord']['lat'];
            var lon = data['coord']['lon'];
            console.log(cityName, cityTemp, cityWind, cityHumidity, lat, lon);   
            getUvIndex(lat,lon); 
            //forecast(cityName); 

         // display data
           displayCityName.innerHTML = cityName;
           cityTempEl.innerHTML = "Temp: " + cityTemp + " F";
           cityWindEl.innerHTML = "Wind: " + cityWind + " MPH";
           cityHumidityEl.innerHTML = "Humidity: " + cityHumidity + " %";
       
        }) // end of function(data)
    })
    

}; // end of getWeather

// fetch to get uvindex data
var getUvIndex = function(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" +lon +"&exclude=minutely,hourly&appid=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){
        response.json().then(function(data){
            var uvIndex = data['current']['uvi'];
            cityUvEl.innerHTML = `UV Index: ${uvIndex}`;

            // loop through days
            for (var i = 0; i<5; i++){

                //capture data
                var dailyWeather = {
                    temp: data['daily'][i]['temp']['day'],
                    humidity: data['daily'][i]['humidity'],
                    windSpeed: data['daily'][i]['wind_speed']
                };

                //create elements
                var dateCard = document.createElement('div');
                var displayDate = document.createElement('h4');
                var displayTemp = document.createElement('p');
                var displayWind = document.createElement('p');
                var displayHumidity = document.createElement('p')

                 //add content to elements
                displayDate.innerHTML = `test`
                displayTemp.innerHTML = `Temp: ${dailyWeather.temp} F`;
                displayWind.innerHTML = `Wind: ${dailyWeather.windSpeed} MPH`;
                displayHumidity.innerHTML = `Humidity: ${dailyWeather.humidity} %`;

                //append content to dateCard
                 dateCard.append(displayDate);
                 dateCard.append(displayTemp);
                 dateCard.append(displayWind);
                 dateCard.append(displayHumidity);

                  //append dateCard to dailyForecast 
                dailyForecastEl.appendChild(dateCard);


            
                console.log(dailyWeather);
            
            }
        })
    })
}; // end of uvindex



buttonEl.addEventListener('click', function(){

 getWeather();
 inputCityName.value = "";
 dailyForecastEl.innerHTML = "";

});


 