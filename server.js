const express = require('express');
const app = express()
require('dotenv').config();
const port = process.env.DEV_PORT || 3000;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodypaser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodypaser.urlencoded({extended:true}));
app.use(bodypaser.json());
// cookie parser middleware
app.use(cookieParser());
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));





app.get('/', (req, res,next) => {
  res.send('Hello World!');
  next();
});

console.log("Loading Database...");
require('./config/dbConnection')(mongoose);

//Model need to be loaded before routers.
require('./models/index')(mongoose);

const userRoutes = require('./routes/userRoute');

app.use('/user',userRoutes)

mongoose.connection.once('open',async function () {
  app.listen(port, (error) => {
      if (error) {
        console.log("Something Went Wrong",error);
      } else {
        console.log(`server listening on port ${port}`)
      }
  });
})

process.on("SIGINT",async function(){
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });

})
