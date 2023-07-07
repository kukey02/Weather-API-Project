const express = require("express");
const https = require("https");
const bodyParse = require("body-parser");
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/bootstrap.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=ecd79d089f19b5b370ee3b70f2ac6312&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        `<h1>The temperature in ` + query + ` is ` + temp + ` celcius.</h1>`
      );
      res.write(
        `<h1 style="color:blue;">The weather is currently ` +
          description +
          `</h1>`
      );
      res.write(`<img src=` + imageurl + `>`);
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
