const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./controllers/weather-routes'));

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});
