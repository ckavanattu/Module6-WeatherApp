var searchFormEl = document.getElementById("searchForm")
var cityNameEl = document.getElementById("searchName")
var currentDate = moment().format('dddd, MMMM Do YYYY')
var forcast = document.getElementById("forcast")



var weatherAPI = function(event) {
    event.preventDefault();
    city = cityNameEl.value.trim();

     var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

    fetch(queryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {

                var lat = data.coord.lat
            var lon = data.coord.lon

            citySearch(lat, lon, city)
    })
    .catch(function(){
        alert("please enter a valid city!")
    })    
    


}

var citySearch = function(a, b, c) {

    var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&appid=aec299195260a001b09706b5bfe740f7&units=imperial"

    fetch(queryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.dir(data)
        var temp = data.current.temp
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var uv = data.current.uvi
        var img = data.current.weather[0].icon

        currentWeather(temp, wind, humidity, uv, img, c)
        // futureWeather(data.daily, c)

    })
}

var currentWeather = function(temp, wind, humidity, uv, img, city) {
    var citySearchEl = document.getElementById("cityName")
    var windEl = document.getElementById("wind")
    var tempEl = document.getElementById("temp")
    var humidityEl = document.getElementById("humidity")
    var UvEl = document.getElementById("UV")
    var iconImg = document.createElement("img")
    iconImg.classList = ("img-fluid");
    iconImg.setAttribute ("src", "https://openweathermap.org/img/wn/" + img + "@2x.png")

    

    citySearchEl.innerText=(city + " " + currentDate)
    citySearchEl.append(iconImg);
    windEl.innerText=("Wind Speed is " + wind + " MPH")
    tempEl.innerText=("Current Temperature is " + temp + " F")
    humidityEl.innerText=("Humidity is " + humidity + " %")
    UvEl.innerText=("UV Index of " + uv)

    UvInt = parseInt(uv)
     if(UvInt <= 2) {
        UvEl.classList.add("bg-success")
     } else if (UvInt >=3 && UvInt <= 5) {
        UvEl.classList.add("bg-warning")
     } else {
        UvEl.classList.add("bg-danger")
     }

    console.log(windEl)
}

var futureWeather = function (data, city) {
    $(".card-deck").empty();

    console.dir(data)

    for (i=1; i<6; i++) {
         var temp = data[i].temp.day
         var humidity = data[i].humidity
         var wind = data[i].wind_speed
         var Uv = data[i].uvi
         var currentDate = moment.unix(data[i].dt).format("ddd MMM Do")
         var weatherImage = data[i].weather[0].icon


         var weatherForcastContainer = document.createElement("div")
         var weatherForcastDate = document.createElement("h1")
         weatherForcastDate.innerText = ("forcast for " + currentDate)
         var weatherForcastList = document.createElement("ul")
         var tempEl = document.createElement('li')
         tempEl.innerText = ("temp: " + temp + " F")
         var humidityEl = document.createElement('li')
         humidityEl.innerText= ("humidity: " + humidity + "%")
         var windEl = document.createElement('li')
         windEl.innerText=("Wind Speed: " + wind + "MPH")
         var UvEl = document.createElement('li')
         UvEl.innerText=("UV index: " + Uv )
         weatherForcastList.append(tempEl, humidityEl, windEl, UvEl)
         weatherForcastContainer.append(weatherForcastDate, weatherForcastList)
         forcast.append(weatherForcastContainer)

         
    }

   


}


searchFormEl.addEventListener("submit", weatherAPI)