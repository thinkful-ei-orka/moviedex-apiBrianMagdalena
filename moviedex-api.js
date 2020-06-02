require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

console.log(process.env.API_TOKEN)

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const movies = require('./movies-data');

app.get('/movie', (req, res) => {
  const { genre, country, avg_vote } = req.query;
  let newMovies = [...movies];

  if (genre) {
    newMovies = newMovies.filter(movie => {
      return movie
        .genre.toLowerCase()
        .includes(
          genre.toLowerCase()
        );
    });
  }

  if (country) {
    newMovies = newMovies.filter(movie => {
      return movie
        .country.toLowerCase()
        .includes(
          country.toLowerCase()
        );
    });
  }

  if (avg_vote) {
    newMovies = newMovies.filter(movie => Number(movie.avg_vote) >= Number(avg_vote));
  }

res.json(newMovies);

});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});