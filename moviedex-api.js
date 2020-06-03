require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movies = require('./movies-data');


const app = express();



app.use(cors());
app.use(helmet());
app.use(morgan('common'));



app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  
  next();
})


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