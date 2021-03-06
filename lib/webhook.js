'use strict';

const WXCrypto = require('wechat-crypto');
const parseString = require('xml2js').parseString;

class WebHook {

  /**
   * Creates an instance of WebHook.
   * 
   * @param {*} aesToken
   * @param {*} aesKey
   * @param {*} appid
   * @memberof WebHook
   */
  constructor(aesToken, aesKey, appid) {
    this.newCrypto = new WXCrypto(aesToken, aesKey, appid);
  }

  /**
   * ticket event
   *
   * @memberof Event
   */
  async eventTicket(xml, saveVerifyTicket) {

    // xml 转 json
    const encryptJson = await this.parseXML2JSON(xml);
    
    // 保存 Ticket
    saveVerifyTicket(encryptJson.xml.ComponentVerifyTicket);

    return 'success';
  }


  /**
   * message event
   *
   * @param {*} xml
   * @memberof Event
   */
  async eventMsg(xml) {

    // xml 转 json
    const encryptJson = await this.parseXML2JSON(xml);

    // parse params
    const msgType = encryptJson.xml.MsgType;
    const toUserName = encryptJson.xml.ToUserName;
    const fromUserName = encryptJson.xml.FromUserName;
    const createTime = encryptJson.xml.CreateTime;
    const event = encryptJson.xml.Event;
    const reason = encryptJson.xml.Reason;

    return { msgType, toUserName, fromUserName, createTime, event, reason };
  }


  /**
   * xml to json
   *
   * @param {*} xml
   * @returns
   * @memberof WebHook
   */
  async parseXML2JSON(xml) {
    const bodyJson = await new Promise((resolve, reject) => {
      parseString(xml, { explicitArray : false}, (err, result) => {
        resolve(result);
      });
    });

    const encryptXml = this.newCrypto.decrypt(bodyJson.xml.Encrypt).message;
    const encryptJson = await new Promise((resolve, reject) => {
      parseString(encryptXml,{ explicitArray : false}, (err, result) => {
        resolve(result);
      });
    });
    
    return encryptJson;
  }

}

module.exports = WebHook;