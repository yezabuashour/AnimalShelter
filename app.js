require('dotenv').config();

const express = require('express');
const routes = require('./routes/login');

const path = require("path");
const { auth } = require("express-openid-connect");

const app = express();

// allows for json body posts
app.use(express.json());

// uncomment below to allow for form-urlencoded body posts
// app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.get('/test', (req, res) => {
    res.send("testing");
})

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

module.exports = listener;