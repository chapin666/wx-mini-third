'use strict';

const httpx = require('httpx');

class Base {


  /**
   * Creates an instance of Base.
   * @memberof Base
   */
  constructor() {
    this.prefix = 'https://api.weixin.qq.com/cgi-bin/';
    this.wxaPrefix = 'https://api.weixin.qq.com/wxa';
  }

  /**
   * http request
   *
   * @param {*} url
   * @param {*} opts
   * @returns
   * @memberof Base
   */
  async request(url, opts) {
    const options = {}
    opts || (opts = {})
    const keys = Object.keys(opts)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key !== 'headers') {
        options[key] = opts[key]
      } else {
        if (opts.headers) {
          options.headers = options.headers || {}
          Object.assign(options.headers, opts.headers)
        }
      }
    }
    const res = await httpx.request(url, options)
    if (res.statusCode < 200 || res.statusCode > 204) {
      var err = new Error(`url: ${url}, status code: ${res.statusCode}`)
      err.name = 'WeChatAPIError'
      throw err
    }

    const buffer = await httpx.read(res)
    const contentType = res.headers['content-type'] || ''
    if (contentType.indexOf('application/json') !== -1) {
      let data
      try {
        data = JSON.parse(buffer)
      } catch (ex) {
        let err = new Error('JSON.parse error. buffer is ' + buffer.toString())
        err.name = 'WeChatAPIError'
        throw err
      }

      if (data && data.errcode) {
        let err = new Error(data.errmsg)
        err.name = 'WeChatAPIError'
        err.code = data.errcode
        throw err
      }

      return data
    }

    return buffer
  }

  /**
   *
   * @param {*} data
   * @returns
   * @memberof Base
   */
  postJSON(data) {
    return {
      dataType: 'json',
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  }
  

  /**
   *
   * @param {*} str
   * @returns
   * @memberof Base
   */
  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, '%2A')
  }

}

module.exports = Base;
