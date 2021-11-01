let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let icon;
const searchInp = document.getElementById("search-input");
const btn = document.getElementById("btn");



window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            long = pos.coords.longitude
            lat = pos.coords.latitude;
         
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a2137a65c78effa2e7cfab84b6788a92`;
            fetch(api).then((response) => {
                return response.json();
            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);

                    if (id < 300 && id > 200) {
                        tempicon.src = "./icons/thunderstorm.png";
                    }
                    else if (id < 400 && id > 300) {
                        tempicon.src = "./icons/cloud.png";
                    }
                    else if (id < 600 && id > 500) {
                        tempicon.src = "./icons/rain.png";
                    }
                    else if (id < 700 && id > 600) {
                        tempicon.src = "./icons/snow.png";
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "./icons/cloud.png";
                    }
                    if (id == 800) {
                        tempicon.src = "./icons/cloudy.png";
                    }
                })
        }

        )
    }
})
btn.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchInp.value);
    searchInp = '';
});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2137a65c78effa2e7cfab84b6788a92`,
            { mode: 'cors' }
        );
        const weatherdata = await response.json();
        const { name } = weatherdata;
        const { feels_like } = weatherdata.main;
        const { id, main } = weatherdata.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        if (id < 300 && id > 200) {
            tempicon.src = "./icons/thunderstorm.png";
        }
        else if (id < 400 && id > 300) {
            tempicon.src = "./icons/cloud.png";
        }
        else if (id < 600 && id > 500) {
            tempicon.src = "./icons/rain.png";
        }
        else if (id < 700 && id > 600) {
            tempicon.src = "./icons/snow.png";
        }
        else if (id < 800 && id > 700) {
            tempicon.src = "./icons/cloud.png";
        }
        if (id == 800) {
            tempicon.src = "./icons/cloudy.png";
        }
    }
    catch (error) {
        alert('city not found');
    }
}

