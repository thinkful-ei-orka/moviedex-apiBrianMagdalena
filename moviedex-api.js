const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like

const movies = require('./movies-data');

app.get('/movie', (req, res) => {
  const { genre, contry, avg_vote } = req.query;
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

res.json(newMovies);

});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});