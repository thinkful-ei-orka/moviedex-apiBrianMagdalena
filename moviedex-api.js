require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))

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

// 4 parameters in middleware, express knows to treat this as error handler
app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

const PORT = process.env.PORT || 8000

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
  })