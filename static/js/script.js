const apiKey = "7c521d75cf8b488ca1f82836251404"; // Replace this with your actual WeatherAPI key

// Handle form submission and send data to backend
document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fields = [
    "MinTemp", "MaxTemp", "Humidity9am", "Humidity3pm",
    "Temp9am", "Temp3pm", "Pressure9am", "Pressure3pm"
  ];

  const data = {};
  fields.forEach(id => {
    const value = parseFloat(document.getElementById(id).value);
    if (isNaN(value)) {
      alert(`Please enter a valid number for ${id}`);
      return;
    }
    data[id] = value;
  });

  try {
    const res = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById("output").innerText =
      result.predicted_rainfall !== undefined
        ? `🌧️ Predicted Rainfall: ${result.predicted_rainfall.toFixed(2)} mm`
        : `❌ Error: ${result.error}`;
  } catch (err) {
    console.error("Prediction failed:", err);
    document.getElementById("output").innerText = "❌ Failed to get prediction.";
  }
});

// Fetch real-time weather data from WeatherAPI
async function fetchWeatherData() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
    );

    const data = await response.json();
    const current = data.current;

    // Fill all fields using WeatherAPI response
    document.getElementById("MinTemp").value = current.temp_c;
    document.getElementById("MaxTemp").value = current.temp_c;
    document.getElementById("Temp9am").value = current.temp_c;
    document.getElementById("Temp3pm").value = current.temp_c;

    document.getElementById("Humidity9am").value = current.humidity;
    document.getElementById("Humidity3pm").value = current.humidity;

    document.getElementById("Pressure9am").value = current.pressure_mb;
    document.getElementById("Pressure3pm").value = current.pressure_mb;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("❌ Failed to fetch weather data. Check your API key or city name.");
  }
}
