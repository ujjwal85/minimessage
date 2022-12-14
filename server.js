const { PORT } = require("./config")
var model = require("./model")
const hbs = require('hbs');
const cookieParser = require('cookie-parser')
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
const path = require('path')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, '/templates/views'));
app.set('view engine', 'hbs');
/*---------------------------Connection DataBase-------------------------- */
mongoose.connect('mongodb://localhost:27017/messages', { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on('connected', function () {
  console.log('database is connected successfully');
});
conn.on('disconnected', function () {
  console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;

/*--------------------------Get Data--------------------------*/

app.get('/', async (req, res) => {
  const data = await model.find()
  res.render("index", { data })

});

/*---------------------------------Post Data--------------------*/

app.post('/messages', async (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const date = req.body.date;
  model({ name: name, message: message, date: date }).save()
  res.redirect("/")

})

/*-------------------------Listenning port------------------- */

var server = http.listen(PORT, () => {
  console.log('server is running on port', PORT);
});