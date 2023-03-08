

class ApiCallTimer {

constructor(threadList, interval, token) {
  this.threadList = threadList;
  this.interval = interval;
  this.token = token;
  this.intId = null;
}

startTimer(interval=600000) {
  intId = setInterval(this.apiCall, interval);
}

stopTimer() {
  if (intId != null) 
}

ApiCall(token,)
}