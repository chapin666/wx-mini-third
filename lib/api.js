'use strict';

const Base = require('./base');

class API extends Base {

  constructor(componentAppId, oauth) {
    super();
    this.componentAppId = componentAppId;
    this.oauth = oauth;
  }

  /**
   *
   *
   * @param {*} appid
   * @returns
   * @memberof API
   */
  async getAuthorizerInfo(appid) {
    const componentAccessToken = await this.oauth.ensureComponentToken();
    const url = this.prefix + 'component/api_get_authorizer_info?component_access_token=' + componentAccessToken.componentAccessToken;
  
    const params = {
      component_appid: this.componentAppId,
      authorizer_appid: appid
    }

    console.log(params);

    return this.request(url, this.postJSON(params))
  }

}

module.exports = API;