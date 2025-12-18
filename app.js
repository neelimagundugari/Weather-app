const apiKey = process.env.NEXT_PUBLIC_API_KEY;

let searchbutton=document.querySelector(".searchbutton");
let searchbar=document.querySelector(".searchbar");


const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(city) {
    const response = await fetch(apiUrl + `&appid=${apiKey}`+`&q=${city}`);
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".hum").innerHTML = data.main.humidity + "%";

    const windKmph = (data.wind.speed * 3.6).toFixed(1);
    document.querySelector(".windSpeed").innerHTML = windKmph + " km/h";
}

searchbutton.addEventListener("click", ()=>{
   const city=searchbar.value.trim();
   if(city!==""){
    checkWeather(city);
   }
});

searchbar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = searchbar.value.trim();
        if (city) checkWeather(city);
    }
});

checkWeather("Bangalore");
