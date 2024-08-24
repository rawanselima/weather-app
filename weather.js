let input = document.querySelector(".search-div input");
let search_btn = document.querySelector(".search-div .search-icon");
let img_weater = document.querySelector(".weather img");
let temp = document.querySelector(".weather .temp");
let state = document.querySelector(".weather .state");
let wind = document.querySelector(".info .wind p");
let humidity = document.querySelector(".info .humidity p");
let wind_div = document.querySelector(".info .wind");
let humidity_div = document.querySelector(".info .humidity");
let weather = document.querySelector(".weather");
let not_found = document.querySelector(".not-found");
let current_weather = document.querySelector(".current-weather");
let key_api = "5c6c7c67b4349f6dbc999f8fbfbf70e6";

search_btn.addEventListener("click", function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key_api}&units=metric`
  )
    .then((response) => response.json())
    .then((result) => {
      let data = result;
      if (data.cod === "404") {
        current_weather.style.height = "400px";
        weather.classList.remove("transform");
        wind_div.classList.remove("transform");
        humidity_div.classList.remove("transform");

        current_weather.classList.remove("active");

        not_found.classList.add("transform");
      } else {
        if (current_weather.classList.contains("active")) {
          weather.classList.remove("transform");
          wind_div.classList.remove("transform");
          humidity_div.classList.remove("transform");
          not_found.classList.remove("transform");

          current_weather.classList.remove("active");
        }

        let timer = setTimeout(() => {
          current_weather.style.height = "500px";
          current_weather.classList.add("active");
          weather.classList.add("transform");
          wind_div.classList.add("transform");
          humidity_div.classList.add("transform");
          not_found.classList.remove("transform");

          if (data.weather[0].main.toLowerCase() === "clear")
            img_weater.src = "./clear.png";
          else if (data.weather[0].main.toLowerCase() === "rain")
            img_weater.src = "./rain.png";
          else if (data.weather[0].main.toLowerCase() === "clouds")
            img_weater.src = "./cloud.png";
          else if (data.weather[0].main.toLowerCase() === "mist")
            img_weater.src = "./mist.png";
          else if (data.weather[0].main.toLowerCase() === "snow")
            img_weater.src = "./snow.png";
          else img_weater.src = "./clear.png";

          temp.innerHTML = `${data.main.temp} °C`;
          state.innerHTML = `${data.weather[0].description}`;
          humidity.innerHTML = `${data.main.pressure} Pascal <br /> Pressure`;
          wind.innerHTML = `${data.wind.speed} Km/h <br /> Wind Speed`;

          console.log(data.cod);
        }, 500);
      }
    });
});
