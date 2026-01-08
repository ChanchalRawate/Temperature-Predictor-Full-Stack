const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* 👇👇👇 YAHI /predict HAI */
app.post("/predict", (req, res) => {
  const { temperature, datetime } = req.body;

  if (!temperature || !datetime) {
    return res.status(400).json({ error: "Missing inputs" });
  }

  const predictedTemp = Number(temperature) + 0.5;

  res.json({
    prediction: predictedTemp.toFixed(2)
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:5000");
});
