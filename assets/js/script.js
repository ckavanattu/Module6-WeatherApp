var searchFormEl = document.getElementById("searchForm")
var cityNameEl = document.getElementById("searchName")
var currentDate = moment().format('dddd, MMMM Do YYYY')
var forecast = document.getElementById("forecast")
var lastCity = document.getElementById('pastSearch')
var cityList = document.getElementById('city-list')
var cities = JSON.parse(localStorage.getItem('cities') || '[]')



var weatherAPI = function(event) {
    event.preventDefault();
    city = cityNameEl.value.trim();

     var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

    fetch(queryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
            
            cities.push(city)
            localStorage.setItem("cities", JSON.stringify(cities));
            var lat = data.coord.lat
            var lon = data.coord.lon
            
            citySearch(lat, lon, city)
            pastSearch();
            
            
    })
    .catch(function(){
        alert("please enter a valid city!")
    })    
    


}

var weatherAPI2 = function(city) {
    
     var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

    fetch(queryUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
            
            cities.push(city)
            localStorage.setItem("cities", JSON.stringify(cities));
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
        // console.dir(data)
        var temp = data.current.temp
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var uv = data.current.uvi
        var img = data.current.weather[0].icon

        currentWeather(temp, wind, humidity, uv, img, c)
        futureWeather(data.daily, c)
                     

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
     } else if (UvInt >=3 && UvInt <= 6) {
        UvEl.classList.add("bg-warning")
     } else {
        UvEl.classList.add("bg-danger")
     }

    //  console.dir(pastSearch)

    
}

var futureWeather = function (data, city) {
    $(".card-deck").empty();

    // console.dir(data)

    for (i=1; i<6; i++) {
         var temp = data[i].temp.day
         var humidity = data[i].humidity
         var wind = data[i].wind_speed
         var currentDate = moment.unix(data[i].dt).format("ddd MMM Do")
         var weatherImage = data[i].weather[0].icon

         var cards = document.getElementById("cards")

         var forcastContainer = document.createElement("div")
         forcastContainer.classList = ('card text-white bg-primary p-2')
         var tempEl = document.createElement('p')
         var humEl = document.createElement('p')
         var windEl = document.createElement('p')
         var img = document.createElement('img')
         var dateEl = document.createElement('h6')

         img.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherImage + "@2x.png")
         tempEl.innerText = ("Temp: " + temp + " F")
         humEl.innerText = ('Humidity: ' + humidity + " %")
         dateEl.innerText = (currentDate)
         windEl.innerText = ("Wind: " + wind + " MPH")

         forcastContainer.append(dateEl)
         forcastContainer.append(img)
         forcastContainer.append(tempEl)
         forcastContainer.append(humEl)
         forcastContainer.append(windEl)
         
         cards.append(forcastContainer)

         
    }

   


}

var pastSearch = function() {    

      

    var citiesShortened= cities.slice(-1)
    // console.log(citiesShortened)

    for (var i=citiesShortened.length-1; i>=0; i--) {
        
        var historicSearch = document.createElement('button')
        historicSearch.classList = "btn btn-primary col-12 mt-2"
        historicSearch.setAttribute("type", "submit")
        historicSearch.innerText=(citiesShortened[i])

        cityList.prepend(historicSearch)


    }
    
}

var searchAgain = function(event) {
    
    var cityNameHistoric = event.target.innerText
    console.log(cityNameHistoric)

    weatherAPI2(cityNameHistoric)
    
    

}


searchFormEl.addEventListener("submit", weatherAPI)
lastCity.addEventListener("click", searchAgain)
