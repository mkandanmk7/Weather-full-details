let displayOuter = document.querySelector("#displayOuter");
let displayInner = document.querySelector(".displayInner");
let size1 = document.querySelector("#size1");
let innerCard1 = document.querySelector(".innerCard1");

let city = "coimbatore";
getWeather();
async function getWeather() {
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=367261ea67167733e6e17d88b7110e22`;
  // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=367261ea67167733e6e17d88b7110e22`;
  // try {}
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  postWeather(data);

  //
  //  catch (err) {
  //   console.log(err);
  // }
}

function weather(data) {
  city = data;
  getWeather();
}

function search() {
  city = document.querySelector("#city").value;
  document.querySelector("#city").value = "";
  getWeather();
}
function postWeather(data) {
  console.log(data.cod);

  if (data.cod !== "200") {
    displayInner.innerHTML = `<h2 class="d-flex justify-content-center">The City You have entered is not fount, Please Try again</h2>`;
  } else {
    let lat = data.city.coord.lat;
    let lon = data.city.coord.lon;
    let d = new Date();
    let H = d.getHours();
    let M = d.getMinutes();
    console.log(H, M);
    // console.log(lat);
    displayInner.innerHTML = `<h2 class="text-center text-dark mb-4">weather Report for ${city} city</h2>
    <div class="text-center nowTime"><h2>Time ${H} : ${M}</h2></div>
    <div class="d-flex justify-content-center mb-3">
    <div><h4 class="text-dark">Latitude:${lat}</h4></div>
    <div><h4 class="text-dark ms-4">Longtitue : ${lon}</h4></div>
    </div>
    `;
    for (let i = 1; i <= 10; i++) {
      dateTime = new Date(data.list[i].dt_txt);

      let hour = dateTime.getHours();
      let date = new Date();
      // let hours = date.getHours();

      // console.log(hour);
      date = dateTime.toDateString();
      console.log(date);
      let temp = Math.round(data.list[i].main.temp - 273);
      let feels = Math.round(data.list[i].main.feels_like - 273);
      let humidity = data.list[i].main.humidity;
      let main_weather = data.list[i].weather[0].main;
      let min_temp = Math.round(data.list[i].main.temp_min - 273);
      let max_temp = Math.round(data.list[i].main.temp_max - 273);
      let pressure = data.list[i].main.pressure;
      let sea = data.list[i].main.sea_level;
      let weather_desc = data.list[i].weather[0].description;
      let wind_speed = data.list[i].wind.speed;
      let wind_rotation = data.list[i].wind.deg;
      let pop = data.list[i].pop;
      let country = data.city.country;

      console.log(wind_speed, country, min_temp);
      if (main_weather === "Clouds") {
        src = "/assets/clouds.png";
      } else if (main_weather === "Rain") src = "/assets/rainy.png";
      else src = "/assets/sunny.png";

      displayInner.innerHTML += `

      <div class="hourlyCards">
      <div class="hourlyCard">
      <div class="mainCard d-flex justify-content-between" >
      
      <div class="d-flex flex-column">
      <div class="time"><p><b>${hour} hour</b></p></div>
      <div><p>${date}</p></div>
      </div> 
      <div><h1>${temp} <sup class="degree">o</sup>C</h1></div>
      <div><img class="WIcons" src=${src}></div>
      <div><p class="text-mured">Feels like ${feels}<sup class="degree">o</sup>C</p></div>
      <div class="d-flex">
      <div><img class="WIcons" src="/assets/water-drop.png"></div>
      <h4 class="text-muted" >${humidity}%</h4>
      </div>

      <div><i class="fas fa-arrows-alt-v fIcons size1" onclick="resize(${i})"></i></div>
      </div>

      <div class="innerCard${i} innerCards">
      <div class="d-flex justify-content-between">
      <div class="w-50">
      <div class="itemBorder">${main_weather}</div>

      <div class="d-flex justify-content-between itemBorder">
      <div><p>min-temp</p></div>
      <div><p><b>${min_temp}  </b></p></div>

      </div>
      <div class="d-flex justify-content-between itemBorder">
      <div><p>max-temp</p></div> 
      <div><p><b>${max_temp}  </b></p></div>
      </div>

      <div class="d-flex justify-content-between itemBorder">
      <div><p>pressure</p></div> 
      <div class="d-flex"><p><b>${pressure}  <p>mb</p></b></p></div>
      </div>

      <div class="d-flex justify-content-between itemBorder">
      <div><p>humidity</p></div> 
      <div class="d-flex"><p><b>  ${humidity}<p>%</p></b></p></div>
      </div>

      </div>

      <div class="w-50 ms-4">
      <div class="itemBorder">${weather_desc}</div>

      <div class="d-flex justify-content-between itemBorder">
      <div><p>sea-level</p></div> 
      <div><p><b>${sea}</b></p></div>
      </div>

      <div class="d-flex justify-content-between itemBorder">
      <div><p>wind-speed</p></div> 
      <div class="d-flex"><p><b>${wind_speed} <p>km/hr</p></b></p>
      </div>
    

      <div class="d-flex justify-content-between itemBorder">
      <div><p>wind-deg</p></div> 
      <div class="d-flex"><p><b>${wind_rotation} <p>deg</p></b></p></div>
      </div>

      <div class="d-flex justify-content-between itemBorder">
      
      <div ><p>Pop  <b>${pop} </b></p></div>
      </div>

      </div>
      </div>
      </div>
      </div>
      </div>
      `;
    }
    for (let i = 2; i <= 10; i++) {
      data = "innerCard" + i;
      console.log(data);
      document.getElementsByClassName(data)[0].style.display = "none";
    }
    // document.getElementsByClassName("innerCard2")[0].style.display = "none";
  }
}
function resize(i) {
  console.log("hy");
  data = "innerCard" + i;
  innerCard = document.getElementsByClassName(data)[0];
  console.log(data, innerCard.style.display);
  if (innerCard.style.display === "none") {
    innerCard.style.display = "block";
    innerCard.classList.add("animate");
  } else {
    innerCard.style.display = "none";
  }
}
