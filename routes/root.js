'use strict'

const puppeteer = require("puppeteer");

module.exports = async function (fastify, opts) {
  fastify.get('/cinema/:cinema', async function (request, reply) {
    const url = `https://www.adorocinema.com/_/showtimes/theater-${request.params.cinema}/`;

    const data = await scrapeData(url);
    const response = data ? JSON.parse(data) : { error: "Error scraping data" };

    console.log(response)

    const allMovies = response.results;

    const movies = allMovies.map((item) => {
      const movie = item.movie;

      if (!movie) {
        return null;
      }

      const showtimes = item.showtimes;

      const showtimesDubbed = showtimes.dubbed.map((showtime) => showtime.startsAt);
      const showtimesMultiple = showtimes.multiple.map((showtime) => showtime.startsAt);
      const showtimesOriginal = showtimes.original.map((showtime) => showtime.startsAt);
      const showtimesLocal = showtimes.local.map((showtime) => showtime.startsAt);
      const allShowtimes = showtimesDubbed.concat(showtimesMultiple, showtimesOriginal, showtimesLocal);

      return {
        title: movie.title,
        originalTitle: movie.originalTitle,
        genres: movie.genres,
        duration: movie.runtime,
        showtimes: allShowtimes,
      };
    });
    
    return movies;
  })
}

async function scrapeData(url) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" }); // Wait until there are no more than 2 network connections for at least 500 ms
    const data = await page.evaluate(() => {
      // Here you can write your scraping logic
      // This example extracts all the text content from the page
      const textContent = document.body.innerText;
      return textContent;
    });
    await browser.close();
    return data;
  } catch (error) {
    console.error("Error scraping data:", error);
    return null;
  }
}