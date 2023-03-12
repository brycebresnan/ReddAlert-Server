const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require('path')
const app = express();
const cors = require('cors');

const ApiCallTimer = require('./js/ApiCallTimer.js');

app.use(cors());
app.use(express.json())

const Timer = new ApiCallTimer();
Timer.getAuthToken();

app.use(express.static(path.join(__dirname, '../../reddalert/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../reddalert/build', 'index.html'));
});

app.get("/api", (req, res) => {
  res.json({message: "Connected to server."});
});

app.post('/timer', (req, res, next) => {
    Timer.mainThreadList = req.body.threadList;
    console.log(Timer.mainThreadList);
    setTimeout(() => {Timer.loopApiCall()}, 500)
    setTimeout(() => {console.log(Timer.mainThreadList)}, 1000)
    res.json({message: "Thread List Updated."});
})

app.get("/timer", (req, res) => {
  let statusMessage = null;
  let timerStatus = null;
  if (Timer.intId == null) {
    statusMessage = Timer.startTimer();
    timerStatus = true
  } else {
    statusMessage = Timer.stopTimer();
    timerStatus = false
  }

  res.json({message: `${statusMessage}`, timerStatus: `${timerStatus}`});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`)
});