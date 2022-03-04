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

  postData("/add", { weather, date: getDate(), feelings });

  if (!weather) {
    return;
  }

  updateUI();
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
async function postData(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const newData = await res.json();

    return newData;
  } catch (err) {
    console.log("An Internal Error has Occured", err);
  }
}

/* Function to GET Project Data */
async function getData(url) {
  try {
    const res = await fetch(url);

    const data = await res.json();

    return data;
  } catch (err) {
    console.log("An Internal Error has Occured", err);
  }
}

/* Function to update UI */
async function updateUI() {
  const { weather, date, feelings } = await getData("/all");

  dateOutput.textContent = `Date 📅: ${date}`;
  tempOutput.textContent = `Temperature 🌡️: ${weather}°C`;
  feelingsOutput.textContent = `Your Feelings 💗: ${feelings}`;
}
