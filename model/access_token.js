'use strict';

class AccessToken {

  constructor (accessToken, expireTime) {
    this.accessToken = accessToken;
    this.expireTime = expireTime;
  }

  isValid () {
    return (
      !!this.accessToken && new Date().getTime() < this.expireTime
    )
  }
}

module.exports = AccessToken;