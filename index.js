'use strict';


const WebHook = require('./lib/webhook');

/**
 *
 * @class WechatMiniOpenAPI
 */
class WechatMiniOpenAPI {
  
  constructor(
    appid, appsecret,
    aesToken, aesKey,
    saveVerifyTicket, getVerifyTicket,
    saveTokenObj, getTokenObj){

    this._appid = appid;
    this._appsecret = appsecret;
    this._aesToken = aesToken;
    this._aesKey = aesKey;
    this._saveVerifyTicket = saveVerifyTicket;
    this._getVerifyTicket = getVerifyTicket;
    this._saveTokenObj = saveTokenObj;
    this._getTokenObj = getTokenObj;

    this.webHook = new WebHook(aesToken, aesKey, appid);
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
    return await this.webHook.parseXML2JSON(xml);
  }

}

module.exports = WechatMiniOpenAPI;