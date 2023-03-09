const ApiCallTimer = require('./js/ApiCallTimer.js');

const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require('path')
const app = express();

let testThreadList = [
  {
    displayName: "cats",
    accountsActive: null,
    subscribers: null,
    activeScore: null,
    scoreThreshold:30,
    isHot: false,
    id: 1
  },
  {
    displayName: "dogs",
    accountsActive: null,
    subscribers: null,
    activeScore: null,
    scoreThreshold:30,
    isHot: false,
    id: 2
  },
  {
    displayName: "cringe",
    accountsActive: null,
    subscribers: null,
    activeScore: null,
    scoreThreshold:30,
    isHot: false,
    id: 3
  }
]

const Timer = new ApiCallTimer(testThreadList,10000);
Timer.run();
setTimeout(() => {Timer.loopApiCall()}, 500)
setTimeout(() => {console.log(Timer.mainThreadList)}, 1000)
// Timer.getAuthToken()
// Timer.apiCall(testThread)

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