'use strict';

class ComponentAccessToken {

  constructor (componentAccessToken, expireTime) {
    this.componentAccessToken = componentAccessToken;
    this.expireTime = expireTime;
  }

  isValid () {
    return (
      !!this.componentAccessToken && new Date().getTime() < this.expireTime
    )
  }
}

module.exports = ComponentAccessToken;