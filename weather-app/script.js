const apikey = '3265874a2c77ae4a04bb96236a642d2f';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) => 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {origin: "cors"});
    const respData = await resp.json();

    addWeatherToPage(respData);
    console.log(respData);
};

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <div class="top1">
            <h2>Search: ${data.name}</h2>
            <h2>Country: ${data.sys.country}</h2>
        </div>
        <div class="top2">
            <h1 class="deg"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h1>
            <h3>${data.weather[0].main}</h3>
        </div>
        <div class="top3">
            <h4>Wind Deg: ${data.wind.deg}</h4>
            <h4>Wind Speed: ${data.wind.speed}</h4>
        </div>
        <div class="top4">
            <h3>Lat: ${data.coord.lat}</h3>
            <h3>Lon: ${data.coord.lon}</h3>
        </div>
        <div class="top5">
            <p><bold>Humidity: ${data.main.humidity}</bold></p>
        </div>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}


function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
})