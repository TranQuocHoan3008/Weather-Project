const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  const apiKey = "d769365e5af671cb3b07462e277ce8a6";
  const query = "London";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const description = `the temperature in ${req.body.cityName} is  ${weatherData.main.temp}`;
      const icon = weatherData.weather[0].icon;
      const urlImg = "openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(`<h1>${description}</h1>`);
      res.write(`<p>${description}</p>`);
      res.write(`<img src="https://${urlImg}">`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
