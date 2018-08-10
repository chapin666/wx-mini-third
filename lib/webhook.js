'use strict';

const WXCrypto = require('wechat-crypto');
const parseString = require('xml2js').parseString;

class WebHook {

  /**
   * 
   * @param {*} appid 
   * @param {*} aesToken 
   * @param {*} aesKey 
   */
  constructor(aesToken, aesKey, appid) {
    this.newCrypto = new WXCrypto(aesToken, aesKey, appid);
  }

  /**
   * 供授权事件接收接口调用
   *
   * @memberof Event
   */
  async eventTicket(xml, saveVerifyTicket) {

    // xml 转 json
    const encryptJson = await this.parseXML2JSON(xml);

    // log
    console.log('eventTicket:');
    console.log(encryptJson.xml.ComponentVerifyTicket);
    
    // 保存 Ticket
    saveVerifyTicket(encryptJson.xml.ComponentVerifyTicket);

    return 'success';
  }


  /**
   *
   *
   * @param {*} xml
   * @memberof Event
   */
  async eventMsg(xml) {

    // xml 转 json
    const encryptJson = await this.parseXML2JSON(xml);

    // parse params
    const eventType = encryptJson.xml.MsgType;
    const toUserName = encryptJson.xml.ToUserName;
    const fromUserName = encryptJson.xml.FromUserName;
    const timeStamp = parseInt(new Date().getTime() / 1000);

    return 'success';
  }


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