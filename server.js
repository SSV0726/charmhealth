require("dotenv").config();

const cors = require('cors');
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.engine("hbs", hbs());
app.set("view engine", "hbs");

// make all the files in 'public' available
app.use(express.static("public"));
app.get("/", (request, response) => {
  console.log(new Date(), "/");
  response.render("index", { number: process.env.TWILIO_NUMBER, layout: false  });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.trace(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});

const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, () => {
  console.log("Your app is listening on port http://localhost:" + listener.address().port);
});
