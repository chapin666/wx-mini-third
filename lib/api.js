'use strict';

const Base = require('./base');

class API extends Base {


  /**
   * Creates an instance of API.
   * @param {*} oauth
   * @memberof API
   */
  constructor(oauth) {
    super();
    this.oauth = oauth;
  }


  /**
   * 设置小程序服务器域名
   * 
   * @param {*} domains
   * @memberof API
   */
  async modifyDomain(appId, { requestdomain, wsrequestdomain, uploaddomain, downloaddomain }) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.wxaPrefix + 'modify_domain?access_token=' + token.accessToken;
    const data = {
      action: 'add',
      requestdomain: requestdomain,
      wsrequestdomain: wsrequestdomain,
      uploaddomain: uploaddomain,
      downloaddomain: downloaddomain
    }
  
    return await this.request(url, this.postJSON(data));
  }

  /**
   * 设置小程序业务域名
   *
   * @param {*} appId
   * @param {*} webviewdomain
   * @memberof API
   */
  async modifyWebviewDomain(appId, webviewdomain) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.wxaPrefix + 'setwebviewdomain?access_token=' + token.accessToken;
    const data = {
      action: 'set',
      webviewdomain: webviewdomain
    }

    return await this.request(url, this.postJSON(data));
  }


  /**
   *
   * 为授权的小程序帐号上传小程序代码
   * 
   * @param {*} appId
   * @param {*} templateId
   * @param {*} extJson
   * @param {*} userVersion
   * @param {*} userDesc
   * @memberof API
   */
  async commitCode(appId, templateId, extJson, userVersion, userDesc) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.wxaPrefix + 'commit?access_token=' + token.accessToken;
    const data = {
      template_id: templateId,
      ext_json: extJson,
      user_version: userVersion,
      user_desc: userDesc
    }

    return await this.request(url, this.postJSON(data));
  }


  /**
   * 获取体验小程序的体验二维码
   *
   * @param {*} appId
   * @param {*} path
   * @memberof API
   */
  async getTestQrCode(appId, path) {
    const token = await this.oauth.ensureAccessToken(appId);

    let url = this.wxaPrefix + 'get_qrcode?access_token=' + token.accessToken;
    if (path) {
      url += '&' + this.fixedEncodeURIComponent(path);
    }
  
    return await this.request(url)
  }

  /**
   * 将第三方提交的代码包提交审核
   *
   * @param {*} appId
   * @memberof API
   */
  async submitAudit(appId, itemList) {
    const token = await this.oauth.ensureAccessToken(appId);

    const url = this.wxaPrefix + 'submit_audit?access_token=' + token.accessToken;
    const data = {
      item_list: itemList
    }
  
    return await this.request(url, this.postJSON(data));
  }

  /**
   * 发布已通过审核的小程序
   * 
   * @param {*} appId
   * @memberof API
   */
  async releaseCode(appId) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.wxaPrefix + 'release?access_token=' + token.accessToken;
    const data = {};
    return await this.request(url, this.postJSON(data));
  }

  /**
   * 查询最新一次提交的审核状态
   * 
   * @param {*} appId
   * @returns
   * @memberof API
   */
  async getLastAuditStatus(appId) {
    const token = await this.oauth.ensureAccessToken(appId);

    const url = this.wxaPrefix + 'get_latest_auditstatus?access_token=' + token.accessToken;
  
    return await this.request(url);
  }


  /**
   * 获取授权小程序帐号的可选类目
   *
   * @param {*} appId
   * @returns
   * @memberof API
   */
  async getCategory(appId) {
    const token = await this.oauth.ensureAccessToken(appId);

    const url = this.wxaPrefix + 'get_category?access_token=' + token.accessToken;
    return this.request(url);
  } 

  /**
   * 绑定测试账号
   * 
   * @memberof API
   */
  async bindTester(appId, wechatId) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.wxaPrefix + 'bind_tester?access_token=' + token.accessToken;
    const data = {
      wechatid: wechatId
    }
  
    return await this.request(url, this.postJSON(data));
  }


  /**
   * 解绑测试账号
   * 
   * @param {*} appId
   * @param {*} wechatId
   * @memberof API
   */
  async unbindTester(appId, wechatId) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.wxappPrefix + 'unbind_tester?access_token=' + token.accessToken;
    const data = {
      wechatid: wechatId
    }

    return this.request(url, this.postJSON(data));
  }

  /**
   * 测试账号列表
   * @param {*} appId
   * @returns
   * @memberof API
   */
  async getTesterList(appId) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.wxaPrefix + 'memberauth?access_token=' + token.accessToken;
    const data = {
      action: 'get_experiencer'
    }

    return await this.request(url, this.postJSON(data));
  }


  
  /**
   * 获取模板列表
   *
   * @param {*} appId
   * @param {*} offset
   * @param {*} count
   * @returns
   * @memberof API
   */
  async getTemplateList(appId, offset, count) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.prefix + 'wxopen/template/library/list?access_token=' + token.accessToken;
    const data = {
      offset,
      count,
    }

    return await this.request(url, this.postJSON(data));
  }


  /**
   * 获取模版关键词
   *
   * @param {*} appId
   * @param {*} id
   * @memberof API
   */
  async getTemplateKeywords(appId, id) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.prefix + 'wxopen/template/library/get?access_token=' + token.accessToken;
    const data = {
      id
    }

    return await this.request(url, this.postJSON(data));
  }


  /**
   * 添加模板
   *
   * @param {*} appId
   * @param {*} id
   * @param {*} keywordIdList
   * @returns
   * @memberof API
   */
  async templateAdd(appId, id, keywordIdList) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.prefix + 'wxopen/template/add?access_token=' + token.accessToken;
    const data = {
      id,
      keyword_id_list: keywordIdList,
    }
    return await this.request(url, this.postJSON(data));
  }

  /**
   * 删除模板
   *
   * @param {*} appId
   * @param {*} templateId
   * @returns
   * @memberof API
   */
  async templateDel(appId, templateId) {
    const token = await this.oauth.ensureAccessToken(appId);
    const url = this.prefix + 'wxopen/template/del?access_token=' + token.accessToken;
    const data = {
      template_id: templateId,
    }
    return await this.request(url, this.postJSON(data));
  }

}

module.exports = API;