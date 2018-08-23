'use strict';

const Base = require('./base');
const ComponentAccessToken = require('../model/component_access_token');
const AccessToken = require('../model/access_token');

class OAuth extends Base {


  /**
   * Creates an instance of OAuth.
   * 
   * @param {*} appid
   * @param {*} appsecret
   * @param {*} getVerifyTicket
   * @param {*} getComponentToken
   * @param {*} saveComponentToken
   * @param {*} saveAccessToken
   * @param {*} getAccessToken
   * @param {*} saveRefreshAccessToken
   * @param {*} getRefreshAccessToken
   * @memberof OAuth
   */
  constructor(appid, appsecret, getVerifyTicket, 
    getComponentToken, saveComponentToken,
    saveAccessToken, getAccessToken,
    saveRefreshAccessToken, getRefreshAccessToken) {
    super();
    this.appid = appid;
    this.appsecret = appsecret;
    this.getVerifyTicket = getVerifyTicket;
    this.getComponentToken = getComponentToken;
    this.saveComponentToken = saveComponentToken;
    this.saveAccessToken = saveAccessToken;
    this.getAccessToken = getAccessToken;
    this.saveRefreshAccessToken = saveRefreshAccessToken;
    this.getRefreshAccessToken = getRefreshAccessToken;
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
   * getPreAuthCode
   *
   * @memberof OAuth
   */
  async getPreAuthCode() {
    const componentAccessToken = await this.ensureComponentToken();
    const url = this.prefix + 'component/api_create_preauthcode?component_access_token=' + componentAccessToken.componentAccessToken;
  
    const params = {
      component_appid: this.appid
    }

    return await this.request(url, this.postJSON(params))
  }


  /**
   * queryAuth
   *
   * @param {*} authorizationCode
   * @returns
   * @memberof API
   */
  async queryAuth(authorizationCode) {
    const componentAccessToken = await this.ensureComponentToken();
    const url = this.prefix + 'component/api_query_auth?component_access_token=' + componentAccessToken.componentAccessToken;
  
    const params = {
      component_appid: this.appid,
      authorization_code: authorizationCode
    }

    const response = await this.request(url, this.postJSON(params));
    const authInfo = response.authorization_info;
    const appId = authInfo.authorizer_appid;
    const expireTime = new Date().getTime() + (authInfo.expires_in - 10) * 1000;
    const acceseToken = authInfo.authorizer_access_token;
    const acceseTokenObj = new AccessToken(acceseToken, expireTime);
    await this.saveAccessToken(appId, acceseTokenObj);

    const refreshToken = authInfo.authorizer_refresh_token;
    const refreshTokenObj = new AccessToken(refreshToken);
    await this.saveRefreshAccessToken(appId, refreshTokenObj);

    return response;
  }

  /**
   * getAuthorizerInfo
   *
   * @param {*} authorizerAppId
   * @returns
   * @memberof API
   */
  async getAuthorizerInfo(authorizerAppId) {
    const componentAccessToken = await this.ensureComponentToken();
    const url = this.prefix + 'component/api_get_authorizer_info?component_access_token=' + componentAccessToken.componentAccessToken;
  
    const params = {
      component_appid: this.appid,
      authorizer_appid: authorizerAppId
    }

    return await this.request(url, this.postJSON(params))
  }


  /**
   * ensureComponentToken
   * 
   * @returns
   * @memberof OAuth
   */
  async ensureComponentToken() {
    const componentAccessToken = await this.getComponentToken();
    if (componentAccessToken) {
      const token = new ComponentAccessToken(componentAccessToken.componentAccessToken, componentAccessToken.expireTime);
      if (token.isValid()) {
        return token;
      }
    }
    return await this.getComponentAccessToken();
  }

  /**
   * ensureAccessToken
   * 
   * @returns
   * @memberof OAuth
   */
  async ensureAccessToken(appId) {
    const accessToken = await this.getAccessToken(appId);
    const token = new AccessToken(accessToken.accessToken, accessToken.expireTime);
    if (accessToken && token.isValid()) {
      return token;
    }
    return await this.refreshAccessToken(appId);
  }


  /**
   * refreshAccessToken
   * 
   * @memberof OAuth
   */
  async refreshAccessToken(authorizerAppId) {
    const componentTokenObj = await this.ensureComponentToken();
    const componentToken = componentTokenObj.componentAccessToken;
    const refreshTokenObj = await this.getRefreshAccessToken(authorizerAppId);
    const refreshToken = refreshTokenObj.accessToken;
    var url = this.prefix + 'component/api_authorizer_token?component_access_token=' + componentToken;
    var params = {
      component_appid: this.appid,
      authorizer_appid: authorizerAppId,
      authorizer_refresh_token: refreshToken
    };
    const resultTokenObj = await this.request(url, this.postJSON(params));
    const resultToken = resultTokenObj.authorizer_access_token;
    const resultExpire = resultTokenObj.expires_in;
    const resultRefreshToken = resultTokenObj.authorizer_refresh_token;
    const newAccessToken = new AccessToken(resultToken, resultExpire);
    const newRefreshtoken = new AccessToken(resultRefreshToken);

    await this.saveAccessToken(authorizerAppId, newAccessToken);
    await this.saveRefreshAccessToken(authorizerAppId, newRefreshtoken);

    return newAccessToken;
  }


  /**
   * code2session
   * 
   * @param {*} appId 
   * @param {*} code 
   */
  async code2Session(appId, code) {
    const componentTokenObj = await this.ensureComponentToken();
    const componentToken = componentTokenObj.componentAccessToken;
    const url = this.snsPrefix + `component/jscode2session?appid=${appId}&js_code=${code}&grant_type=authorization_code&component_appid=${this.appid}&component_access_token=${componentToken}`;
    return await this.request(url);
  }
  
}

module.exports = OAuth;