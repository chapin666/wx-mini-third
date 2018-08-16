'use strict';

const Base = require('./base');
const ComponentAccessToken = require('../model/component_access_token');

class OAuth extends Base {


  /**
   * constructor
   * 
   * @param {*} appid
   * @param {*} appsecret
   * @param {*} getVerifyTicket
   * @param {*} getComponentToken
   * @param {*} saveComponentToken
   * @memberof OAuth
   */
  constructor(appid, appsecret, getVerifyTicket, getComponentToken, saveComponentToken) {
    super();
    this.appid = appid;
    this.appsecret = appsecret;
    this.getVerifyTicket = getVerifyTicket;
    this.getComponentToken = getComponentToken;
    this.saveComponentToken = saveComponentToken;
  }



  /**
   * get component token
   *
   * @returns
   * @memberof OAuth
   */
  async getComponentAccessToken() {
    const url = this.prefix + 'component/api_component_token';
    const componentVerifyTicket = await this.getVerifyTicket();

    const params = {
      component_appid: this.appid,
      component_appsecret: this.appsecret,
      component_verify_ticket: componentVerifyTicket,
    }

    const data = await this.request(url, this.postJSON(params));
    const component_access_token = data.component_access_token;
    const expireTime = new Date().getTime() + (data.expires_in - 10) * 1000
    const componentToken = new ComponentAccessToken(component_access_token, expireTime);
    await this.saveComponentToken(componentToken);
    return componentToken
  }

  /**
   *
   * @memberof OAuth
   */
  async getPreAuthCode() {
    const componentAccessToken = await this.ensureComponentToken();
    const url = this.prefix + 'component/api_create_preauthcode?component_access_token=' + componentAccessToken.componentAccessToken;
  
    const params = {
      component_appid: this.appid
    }

    return this.request(url, this.postJSON(params))
  }


    /**
   *
   * @returns
   * @memberof OAuth
   */
  async ensureComponentToken() {
    const componentAccessToken = await this.getComponentToken();
    const token = new ComponentAccessToken(componentAccessToken.componentAccessToken, componentAccessToken.expireTime);
    if (componentAccessToken && token.isValid()) {
      return token;
    }
    return await this.getComponentAccessToken();
  }
  
}

module.exports = OAuth;