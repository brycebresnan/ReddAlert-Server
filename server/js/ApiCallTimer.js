require("dotenv").config()

module.exports = class ApiCallTimer {

  constructor() {
    this.mainThreadList = [];
    this.interval = 10000;
    this.token = null;
    this.intId = null;
    this.authError = null;
    this.apiError = null;
    this.thread = {
      displayName: null,
      accountsActive: null,
      subscribers: null,
      activeScore: null,
      scoreThreshold:30,
      isHot: false,
      id: null,
    }
  }

  startTimer = () => {
    this.intId = setInterval(this.loopApiCall, this.interval);
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

  apiCall = (threadObj) => {
    console.log("API Called!")
    let newThreadObj = threadObj;

    if (this.token == null) {
      this.apiError = "Authentication Token missing or undefined"
      return
    }
    
    fetch(`https://oauth.reddit.com/r/${newThreadObj.displayName}/about`, { headers: {Authorization: `Bearer ${this.token}`}})
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      let calcActiveScore = (jsonifiedResponse.data.accounts_active / jsonifiedResponse.data.subscribers) * 10000;
      newThreadObj.accountsActive = jsonifiedResponse.data.accounts_active;
      newThreadObj.displayName = jsonifiedResponse.data.display_name;
      newThreadObj.subscribers = jsonifiedResponse.data.subscribers;
      newThreadObj.activeScore = calcActiveScore;
      if (calcActiveScore >= threadObj.scoreThreshold){
        newThreadObj.isHot = true;
      }
      const newMainThreadList = this.mainThreadList
      .filter(thread => thread.id !== newThreadObj.id)
      .concat(newThreadObj); 
      this.mainThreadList = newMainThreadList;
    })
    .catch((error) => {
      this.apiError = error.message
      newThreadObj.error = error.message
      const newMainThreadList = this.mainThreadList
      .filter(thread => thread.id !== newThreadObj.id)
      .concat(newThreadObj);
      this.mainThreadList = newMainThreadList;
    });
  }

  loopApiCall = () => {
    if (this.mainThreadList.length == 0) {
      return
    }

    const threadListClone = this.mainThreadList
    threadListClone.forEach(thread => {
      this.apiCall(thread);
    });
  }

  run = () => {
    this.getAuthToken()
  }
}
