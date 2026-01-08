import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState("");
  const [datetime, setDatetime] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        {
          temperature: Number(temperature),
          datetime: datetime,
        }
      );

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(error);
      alert("Error predicting temperature");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🌡 Next-Hour Temperature Prediction</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Current Temperature (°C)</label>
          <input
            type="number"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="predict-btn">
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {prediction !== null && (
        <div className="result">
          <h2>Predicted Temperature: {prediction} °C</h2>
        </div>
      )}
    </div>
  );
}

export default App;
