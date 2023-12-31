var searchInputEl = $("#search-input");
var listGroupEl = $("#history"); 
var tempEl = $(".temp span");
var windEl = $(".wind span");
var humidityEl = $(".humid span");
var citiesEl = $(".location")
var cloudElement = $(".img-cloud")



$("#search-button").on("click", function (event) {
  event.preventDefault();
  var city = $(searchInputEl).val().trim();

  // Make API call for the selected city
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",&appid=31b8eceab3ceb4bbb4396db8c8a750f8";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      //saving data to local storage
      var cities = [];

      if (localStorage.getItem("cities")) {
        cities = JSON.parse(localStorage.getItem("cities"));
      }
      cities.push(city)
      localStorage.setItem("cities", JSON.stringify(cities));


       // Remove duplicate cities
    const uniqueCities = [...new Set([...cities, city])];

    // Save the updated array back to local storage
    localStorage.setItem('cities', JSON.stringify(uniqueCities));
      

      //prepending to the button
      listGroupEl.prepend('<button type="button"  class="btn btn-secondary" >' + city + '</button>');

      $("#history").on("click",function(event){
        event.preventDefault();
        listGroupEl(city)
      });

      $(searchInputEl).val("");

      // current weather  card  information
      var currentDate = dayjs().format("DD/MM/YYYY");
      var icon = data.list[0].weather[0].icon
      var cloudUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
      console.log(cloudUrl);

      var wind = data.list[0].wind.speed
      var temp = data.list[0].main.temp
      var humidity = data.list[0].main.humidity
      var cities = data.city.name
      var day = data.list[0].dt_txt

      // console.log(cloud,wind,temp,humidity,cities,day);

      cloudElement.attr("src", cloudUrl);
      tempEl.text((temp - 273.15).toFixed(2) + " °C");
      windEl.text(wind + " KPH");
      humidityEl.text(humidity + " %");
      citiesEl.text(cities + " " + currentDate);

      //   5 days weather forecast
      $("#forecast .row").empty();
      var currentDate = new Date(day);
      console.log(currentDate);
      var index = 0
      for (let i = 0; i < data.list.length; i++) {
        var nextDay = new Date(data.list[i].dt_txt);
        if (currentDate.getDate() === nextDay.getDate()) {
          currentDate.setDate(currentDate.getDate() + 1)
          console.log(nextDay.getDate(), data)
          

          var icon = data.list[i].weather[0].icon
          var cloudUrl = "https://openweathermap.org/img/wn/" + icon + ".png"
          var iconCloud = data.list[i].weather[0].icon
          console.log(iconCloud)
          var wind = data.list[i].wind.speed
          var temp = data.list[i].main.temp
          var humidity = data.list[i].main.humidity
          var day = data.list[i].dt_txt
          
          // creating new element
          var colElement = $("<div>");
          var cardElement = $("<div>");
          var cardBodyElement = $("<div>");
          var headerElement = $("<h5>");
          var iconElement = $("<img>");
          var windElement = $("<p>");
          var tempElement = $("<p>");
          var humidityElement = $("<p>");
          colElement.addClass("col");
          cardElement.addClass("card");
          cardBodyElement.addClass("card-body");
          cardBodyElement.css({ 'background-color': '#2D3E50', color: '#ffff' });
          headerElement.addClass("card-title");
          iconElement.attr("src", cloudUrl);
          windElement.addClass("card-text");
          tempElement.addClass("card-text");
          humidityElement.addClass("card-text");
          headerElement.text(nextDay.getDate() + "/" + nextDay.getMonth() + "/" + nextDay.getFullYear());
          windElement.text("Wind : " + wind);
          tempElement.text("Temp : " + temp);
          humidityElement.text("Humidity:" + humidity);
          cardBodyElement.append(headerElement, iconElement, windElement, tempElement, humidityElement)
          cardElement.append(cardBodyElement);
          colElement.append(cardElement);
          $("#forecast .row").append(colElement);
          if (index === 4) { break; }
          index++;
          console.log(index)
        }
      }
    })
});

// function addTask(text){
//   // console.log(listgroupEl);
//   listgroupEl.append("<div>");

// }
