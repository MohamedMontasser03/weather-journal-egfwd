// Global Variables
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const submit = document.getElementById("generate");
const dateOutput = document.getElementById("date");
const tempOutput = document.getElementById("temp");
const feelingsOutput = document.getElementById("content");

// Helpers
function getDate() {
  const d = new Date();
  return d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
}

function validateInput(zipCode, feelings) {
  return zipCode !== "" && feelings !== "";
}

// Personal API Key for OpenWeatherMap API
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ""; //I Removed the key for github

// Event listener to add function to existing HTML DOM element
submit.addEventListener("click", onSubmit);

/* Function called by event listener */
async function onSubmit(ev) {
  const zipCode = zipInput.value;
  const feelings = feelingsInput.value;

  //Validating Input
  if (!validateInput(zipCode, feelings)) {
    alert("can't leave inputs empty");
    return;
  }

  //Fetching weather
  const weather = await getWeather(zipCode);
  if (!weather) {
    return;
  }

  updateUI(weather, feelings);
}

/* Function to GET Web API Data*/
async function getWeather(zipCode) {
  try {
    const url = `${apiURL}${zipCode}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    return data.main.temp;
  } catch (err) {
    alert("invalid zip code");
  }
}

/* Function to POST data */

/* Function to GET Project Data */

/* Function to update UI */
function updateUI(weather, feelings) {
  //Removed
  dateOutput.textContent = `Date 📅: ${getDate()}`;
  tempOutput.textContent = `Temperature 🌡️: ${weather}°C`;
  feelingsOutput.textContent = `Your Feelings 💗: ${feelings}`;
}
