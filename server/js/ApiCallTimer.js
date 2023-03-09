require("dotenv").config()

module.exports = class ApiCallTimer {

  constructor(threadList, interval) {
    this.threadList = threadList;
    this.interval = interval;
    this.token = null;
    this.intId = null;
    this.authError = null;
  }

  startTimer = (interval=600000) => {
    intId = setInterval(apiCall, interval);
  }

  stopTimer = () => {
    if (intId != null) {

    }
  }

  getAuthToken = () => {
    const encodedKey = btoa(`${process.env.REDDIT_APP_ID}:${process.env.REDDIT_APP_SECRET}`)
    
    fetch(`https://www.reddit.com/api/v1/access_token`, {
      method:"POST",
      headers: {
      'Authorization': `Basic ${encodedKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials'
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      this.token = jsonifiedResponse.access_token
      })
    .catch((error) => {
      this.authError = error.message
    });

  }

  apiCall = (token) => {
    return
  }

}
