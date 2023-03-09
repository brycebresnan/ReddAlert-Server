const ApiCallTimer = require('./js/ApiCallTimer.js');

const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require('path')
const app = express();

const Timer = new ApiCallTimer([],10000);
Timer.getAuthToken()

app.use(express.static(path.join(__dirname, '../../reddalert/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../reddalert/build', 'index.html'));
});

app.get("/api", (req, res) => {
  res.json({message: "Hello from server!"});
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`)
});