'use strict';


const WebHook = require('./lib/webhook');
const OAuth = require('./lib/oauth');
const API = require('./lib/api');

/**
 *
 * @class WXMiniProgramThird
 */
class WXMiniProgramThird {
  
  constructor(
    appid, appsecret,
    aesToken, aesKey,
    saveVerifyTicket, getVerifyTicket,
    saveComponentToken, getComponentToken,
    saveAccessToken, getAccessToken, 
    saveRefreshAccessToken, getRefreshAccessToken ){
      
    this._saveVerifyTicket = saveVerifyTicket;
    this._getComponentToken = getComponentToken;

    this.webHook = new WebHook(aesToken, aesKey, appid);
    this.oauth = new OAuth(appid, appsecret, getVerifyTicket,
      getComponentToken, saveComponentToken, 
      saveAccessToken, getAccessToken,
      saveRefreshAccessToken, getRefreshAccessToken);

    this.api = new API(this.oauth);
  }

  /**
   *
   *
   * @param {*} xml
   * @returns
   * @memberof WechatMiniOpenAPI
   */
  async eventTicket(xml) {
    return await this.webHook.eventTicket(xml, this._saveVerifyTicket);
  }

  /**
   *
   * @param {*} xml
   * @returns
   * @memberof WechatMiniOpenAPI
   */
  async eventMsg(xml) {
    return await this.webHook.eventMsg(xml);
  }

}

module.exports = WXMiniProgramThird;