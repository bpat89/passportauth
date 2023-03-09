require('dotenv').config();
const express = require('express');

const router = require("express").Router();
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profiles-routes");
const passportSetup = require("./config/passport-strat");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const dbkey = process.env.DB_URI
const session = require("express-session");
// set view engine
app.set('view engine', 'ejs');
//cookies section
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//connecting to DB.
mongoose.set('strictQuery', false)
mongoose.connect(dbkey,()=>{
  console.log("connected to mongodb");
})

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
