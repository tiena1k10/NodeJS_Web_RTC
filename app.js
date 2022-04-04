const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')





const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');
const PORT = 3000 || process.env.PORT;







// database connection
const dbURI = 'mongodb://localhost:27017/ChatApp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(PORT)
    console.log("app is running on http://localhost:3000/")
    })
  .catch((err) => console.log(err));

// routes

app.use(authRoutes)