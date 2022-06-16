//Declare elements
var buttonEl = document.querySelector(".btn");
var inputCityName = document.querySelector(".inputName");
var displayCityName = document.querySelector("#cityName");
var cityTempEl = document.querySelector("#temp");
var cityWindEl =document.querySelector("#wind");
var cityHumidityEl = document.querySelector("#humidity");
var cityUvEl = document.querySelector("#uv_index");
 var dailyForecastEl = document.querySelector(".forecast_cards");
 var historyButtonsEl = document.querySelector(".history-buttons");
 var iconEl = document.querySelector("#icon");
 
 //setting current and forecast dates
 var date = moment().format("M/D/YYYY");
 var day1 =moment().add(1,"days");
 var day2 =moment().add(2,"days");
 var day3 =moment().add(3,"days");
 var day4 =moment().add(4,"days");
 var day5 =moment().add(5,"days");

 // save cities in local storage
 var cityArr = [];
 
 

 var weeklyForecastDays = [day1.format("M/D/YYYY"), day2.format("M/D/YYYY"), day3.format("M/D/YYYY"), day4.format("M/D/YYYY"), day5.format("M/D/YYYY")];


var getWeather = function(){
     var  cityName = inputCityName.value;

    //console.log(cityName);

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&APPID=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){

        if(response.ok){

            response.json().then(function(data){
      
        //capture data from fetch
            var cityName = data['name'];
            var cityIcon = data['weather'][0]['icon'];
            var cityTemp = data['main']['temp'];
            var cityWind = data['wind']['speed'];
            var cityHumidity = data['main']['humidity'];
            var lat = data['coord']['lat'];
            var lon = data['coord']['lon'];
           // console.log(cityName, cityTemp, cityWind, cityHumidity, lat, lon);   
            getUvIndex(lat,lon); 
           
           // display data
           displayCityName.innerHTML = `${cityName} ${date}`;
              iconEl.innerHTML = `<img src="/assets/icons/${cityIcon}.png">`;
           cityTempEl.innerHTML = "Temp: " + cityTemp + " F";
           cityWindEl.innerHTML = "Wind: " + cityWind + " MPH";
           cityHumidityEl.innerHTML = "Humidity: " + cityHumidity + " %";

           cityArr.push(cityName);
            localStorage.setItem('cityHistory', JSON.stringify(cityArr));
            console.log(cityArr);
       
        }) // end of function(data)

        } else {
            alert('Enter valid city');
        }
 
    })

}; // end of getWeather

// fetch to get uvindex data and 5 day forecast
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
                    windSpeed: data['daily'][i]['wind_speed'],
                    dailyIcon: data['daily'][i]['weather'][0]['icon']
                  };

                //create elements
                var dateCard = document.createElement('div');
                var iconImage = document.createElement('img');
            
                var displayDate = document.createElement('h4');
                var displayTemp = document.createElement('p');
                var displayWind = document.createElement('p');
                var displayHumidity = document.createElement('p')

                                 //add content to elements
                displayDate.innerHTML = weeklyForecastDays[i];
                iconImage.src = `/assets/icons/${dailyWeather.dailyIcon}.png`;
                displayTemp.innerHTML = `Temp: ${dailyWeather.temp} F`;
                displayWind.innerHTML = `Wind: ${dailyWeather.windSpeed} MPH`;
                displayHumidity.innerHTML = `Humidity: ${dailyWeather.humidity} %`;

                //append content to dateCard
                 dateCard.append(displayDate);
                 dateCard.append(iconImage);
                 dateCard.append(displayTemp);
                 dateCard.append(displayWind);
                 dateCard.append(displayHumidity);
              

                  //append dateCard to dailyForecast 
                dailyForecastEl.appendChild(dateCard);


            
                //console.log(dailyWeather);
            
            }
        })
    })
}; // end of uvindex

// get data from local storage

    var cities = localStorage.getItem('cityHistory');
    var parsedCities = JSON.parse(cities);
    console.log(parsedCities);

// add buttons from localStorage

    //var addHistory = function(){
        for (var i=0; i<parsedCities.length; i++){
        var searchButton = document.createElement('button');
        searchButton.classList.add("history-buttons");
        searchButton.innerHTML = parsedCities[i];
        historyButtonsEl.appendChild(searchButton); 
    }

    //};
 
// fetch with saved city

    var savedCity = function(searchTerm){
      
        
          fetch("https://api.openweathermap.org/data/2.5/weather?q="+ searchTerm +"&APPID=d564b912988e6af5b9f3c1b180526f25")
    .then(function(response){

         response.json().then(function(data){
      
        //capture data from fetch
            var cityIcon = data['weather'][0]['icon'];
            var cityName = data['name'];
            var cityTemp = data['main']['temp'];
            var cityWind = data['wind']['speed'];
            var cityHumidity = data['main']['humidity'];
            var lat = data['coord']['lat'];
            var lon = data['coord']['lon'];
            console.log(cityName, cityTemp, cityWind, cityHumidity, lat, lon);   
         
           
           // display data
           displayCityName.innerHTML = `${cityName} ${date}`;
           iconEl.innerHTML = `<img src="/assets/icons/${cityIcon}.png">`;
           cityTempEl.innerHTML = "Temp: " + cityTemp + " F";
           cityWindEl.innerHTML = "Wind: " + cityWind + " MPH";
           cityHumidityEl.innerHTML = "Humidity: " + cityHumidity + " %";

            getUvIndex(lat,lon); 
       
        }) // end of function(data)

        

    })


    }; // end of saved city
    
    
// click on search history button to run getWeather with cityname
    historyButtonsEl.addEventListener("click", function(event){
        if (event.target.className === "history-buttons"){
            var searchTerm = event.target.innerHTML;
            savedCity(searchTerm);
            dailyForecastEl.innerHTML = "";
        }
      
    });








buttonEl.addEventListener('click', function(){

 getWeather();
 inputCityName.value = "";
 dailyForecastEl.innerHTML = "";

});


 