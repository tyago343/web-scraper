const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");

const PORT = 8000;
const app = express();

const url = "https://www.theguardian.com/uk";

app.get("/", function (req, res) {
  res.json("this is my web scraper");
});
app.get("/results", function (req, res) {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];
      $(".fc-item__title", html).each(function () {
        const title = $(this).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url,
        });
      });
      res.json(articles)
    })
    .catch((err) => console.log(err));

})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
