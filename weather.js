var searchButton = $("#search-button");
// var listGroupEl = $("#history");
var searchInput = $("#search-input");
var location = $(".location");
var temperature = $(".temp span");
var windEl =$(".wind span");
var humid =$(".humid span");

$("#search-button").on("click",function(event){
    event.preventDefault();
    var cities = $(searchInput).val().trim();
     
    // construct URL
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cities + ",&appid=61dea168986fc4a4cb5cbf3fda0ff042";
    
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        // $("#history").text(JSON.stringify(data));
        
        localStorage.setItem("cities", cities);
    listGroupEl.prepend("<div>" + cities +"<div>");
    $(searchInput).val("");

     var cloud = data.list[0].clouds.all;
     var wind = data.list[0].wind.speed;
     var temp = data.list[0].main.temp;
     var humidity =data.list[0].main.humidity;
     var cities = data.city.name;
     console.log(cloud,wind,temp,humidity,cities);
    //  location.text(location);
        
    })
    
});
    // var currentDate = day()
    var currentDate = dayjs();
$("#currentDay").text(currentDate.format("dddd, MMMM D YYYY"));


