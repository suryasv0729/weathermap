// const apikey = "QCFUE4KPA9CJM76VW6KHEB3Z7";
// const btn = document.querySelector(".btn");
// let place;
// const placebox = document.querySelector(".place");
// const addr = document.querySelector(".addr");
// const temp = document.querySelector(".temp");
// const descri = document.querySelector(".descri");
// const windsp = document.querySelector(".wind-sp");
// const feels = document.querySelector(".feels");
// const humi = document.querySelector(".humi");
// const weatimg = document.querySelector(".wimg");
// const mapp = document.querySelector(".section-map");
// let lat;
// let long;
// let locate;
// navigator.geolocation.getCurrentPosition(function (pos) {
//   console.log(pos);
//   lat = pos.coords.latitude;
//   long = pos.coords.longitude;
//   console.log(lat, long);
//   console.log(
//     `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=8ffdeb8d883442c2b914649c99abfed0`
//   );
//   var map = L.map("map").setView([lat, long], 12);

//   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   L.marker([lat, long])
//     .addTo(map)
//     .bindPopup("your current location")
//     .openPopup();

//   const onMapClick = function (e) {
//     lat = e.latlng.lat;
//     long = e.latlng.lng;
//     console.log(e);
//     testoo();
//     fetch(
//       `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=8ffdeb8d883442c2b914649c99abfed0`
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         addr.textContent = `${
//           result.features[0].properties.city ||
//           result.features[0].properties.country
//         }`;
//         testoo();
//       })
//       .catch((error) => console.log("error", error));
//   };
//   map.on("click", onMapClick);
//   const locate = fetch(
//     `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=8ffdeb8d883442c2b914649c99abfed0`
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       addr.textContent = `${result.features[0].properties.city}`;
//       testoo();
//     })
//     .catch((error) => console.log("error", error));
// });

// //  console.log(place);
// // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=YOUR_API_KEY

// const testoo = function () {
//   //place=placebox.value;
//   fetch(
//     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?unitGroup=metric&key=QCFUE4KPA9CJM76VW6KHEB3Z7&contentType=json`
//   )
//     .then((res) => res.json())
//     .then((res) => {
//       summa(res);
//     });

//   function summa(res) {
//     placebox.value = "";
//     if (res.currentConditions.icon == "partly-cloudy-day") {
//       weatimg.src = "./img/cloudy-day-1.svg";
//     }
//     if (res.currentConditions.icon == "snow") {
//       weatimg.src = "./img/snowy-4.svg";
//     }
//     if (res.currentConditions.icon == "rain") {
//       weatimg.src = "./img/rainy-6.svg";
//     }
//     if (res.currentConditions.icon == "cloudy") {
//       weatimg.src = "./img/cloudy.svg";
//     }
//     if (res.currentConditions.icon == "clear-day") {
//       weatimg.src = "./img/day.svg";
//     }
//     if (res.currentConditions.icon == "clear-night") {
//       weatimg.src = "./img/night.svg";
//     }
//     if (res.currentConditions.icon == "partly-cloudy-night") {
//       weatimg.src = "./img/cloudy-night-1.svg";
//     }

//     temp.textContent = `${res.currentConditions.temp}`;
//     descri.textContent = `${res.currentConditions.conditions}`;
//     humi.textContent = `${res.currentConditions.humidity}`;
//     feels.textContent = `${res.currentConditions.feelslike}`;
//     windsp.textContent = `${res.currentConditions.windspeed}`;

//     console.log(res);
//     let a = Object.entries(res);
//     for (const [key, value] of Object.entries(res)) {
//       console.log(key, value);
//     }
//   }
// };

///// refactored code

const apikey = "QCFUE4KPA9CJM76VW6KHEB3Z7";
const addr = document.querySelector(".addr");
const temp = document.querySelector(".temp");
const descri = document.querySelector(".descri");
const windsp = document.querySelector(".wind-sp");
const feels = document.querySelector(".feels");
const humi = document.querySelector(".humi");
const weatimg = document.querySelector(".wimg");
const mapp = document.querySelector(".section-map");
let lat;
let long;
let map;
//getting current position by lat and long

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        console.log(lat, long);
        resolve({ lat, long });
      },
      function () {
        reject(alert("cant able to fetch location.give acces to location"));
      }
    );
  });
}

//getting weather details  from api and render it

function getWeatherDetails(lat, long) {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?unitGroup=metric&key=QCFUE4KPA9CJM76VW6KHEB3Z7&contentType=json`
  )
    .then((res) => res.json())
    .catch((err) => console.log("weather api error"));
}

function renderWeatherDetails(res) {
  if (!res) return;
  console.log(res);
  weatimg.src = `./img/${res.currentConditions.icon}.svg`;

  temp.textContent = `${res.currentConditions.temp}`;
  descri.textContent = `${res.currentConditions.conditions}`;
  humi.textContent = `${res.currentConditions.humidity}`;
  feels.textContent = `${res.currentConditions.feelslike}`;
  windsp.textContent = `${res.currentConditions.windspeed}`;
}

// reverse geocoding api to get address
function getAddress(lat, long) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=8ffdeb8d883442c2b914649c99abfed0`
  )
    .then((response) => response.json())
    .then((result) => {
      addr.textContent = `${result.features[0].properties.city}`;
    })
    .catch((error) => console.log(error));
}

// render a map with current location using coords

function CurrentviewOnMap(lat, long) {
  map = L.map("map").setView([lat, long], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, long]).addTo(map).bindPopup(`current location`).openPopup();

  map.on("click", (e) => {
    lat = e.latlng.lat;
    long = e.latlng.lng;
    getAddress(lat, long);
    getWeatherDetails(lat, long).then((res) => renderWeatherDetails(res));
  });
}

// mapobj = CurrentviewOnMap();

getCurrentPosition()
  .then(({ lat, long }) => {
    getAddress(lat, long);
    CurrentviewOnMap(lat, long);
    return getWeatherDetails(lat, long);
  })
  .then((res) => renderWeatherDetails(res))
  .catch((err) => console.log(err));

//render weather details when clicking on map coords and get address from rever geocode and render it also
