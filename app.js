const apiKey = process.env.NEXT_PUBLIC_API_KEY;

let searchbutton = document.querySelector(".searchbutton");
let searchbar = document.querySelector(".searchbar");

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found"); // handle invalid city
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".hum").innerHTML = data.main.humidity + "%";

        const windKmph = (data.wind.speed * 3.6).toFixed(1);
        document.querySelector(".windSpeed").innerHTML = windKmph + " km/h";

    } catch (err) {
        console.error(err);
        alert(err.message); // optional: show error to user
    }
}

searchbutton.addEventListener("click", () => {
    const city = searchbar.value.trim();
    if (city !== "") checkWeather(city);
});

searchbar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = searchbar.value.trim();
        if (city) checkWeather(city);
    }
});

// Initial city
checkWeather("Bangalore");
