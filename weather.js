
var searchButton = $("#search-button");
var searchInput = $("#search-input");
var listGroupEl = $("#history");
var locationEl = $('.location');

$("#search-button").on("click",function(event){
    event.preventDefault();
    var citiesEl = $(searchInput).val().trim();
     
    // construct URL
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citiesEl + ",&appid=61dea168986fc4a4cb5cbf3fda0ff042";
    
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        // $("#history").text(JSON.stringify(data));
        
        localStorage.setItem("cities", citiesEl);
    listGroupEl.prepend("<div>" + citiesEl +"<div>");
    $(searchInput).val("");
    locationEl.text('location');

     var cloud = data.list[0].clouds.all;
     var wind = data.list[0].wind.speed;
     var temp = data.list[0].main.temp;
     var humidity =data.list[0].main.humidity;
     var cities = data.city.name;
     console.log(cloud,wind,temp,humidity,cities);

     
        
    })
    
});