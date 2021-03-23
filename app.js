// dependencies
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require("path");
const { auth } = require("express-openid-connect");

// express init
const app = express();

// allows for json body posts, api
app.use(express.json());

// uncomment below to allow for form-urlencoded body posts, form submission
// app.use(express.urlencoded({ extended: true }));

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    secret: process.env.SESSION_SECRET
};

// routes and auth implementation
app.use('/', require('./routes/index'));
app.use(auth(config));
app.use('/pet', require('./routes/pet'));
app.use('/adoption', require('./routes/adoption'));

// mongodb atlas connection
mongoose.connect(
    process.env.MONGO_URI,
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

// opening server & export listener if needed
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});

module.exports = listener;