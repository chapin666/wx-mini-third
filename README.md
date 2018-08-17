# 微信三方平台代小程序实现业务（wx-mini-third）
```
'use strict';

const WXMiniProgramThird = require('../index');

const appid = 'wxf0a1933d302b5a0e';
const appkey = 'd3940fcc7b6ae7b2d75df989bbab1f8d';
const aesToken = 'jhOboNh2wB7ipv9L7TSxU2LitkuPaxYh';
const aesKey = '3l5gwSgdyO6o2t3r09futJuRYJ9tEJIpo7AWz0fGpj2';

const wxMiniProgramThird = new WXMiniProgramThird(appid, appkey, aesToken, aesKey, saveTicket, 
  getTicket, saveToken, getToken, 
  setAuthToken, getAuthToken,
  setRefreshToken, getRefreshToken);


let _ticket = 'ticket@@@Bi6F7pge70BoaKcjNgu7h4BrMqcXPc8ZCIAUtQcmIUbjuhr1TqUNklNxXIN1n2bR-UNSVFdeKqcGf0XjZ_MHIg';
let _token = '';
async function saveTicket(ticket) {
  console.log(`saveTicket: ${ticket}`);
  _ticket = ticket;
} 

async function getTicket() {
  console.log(`getTicket: ${_ticket}`);
  return _ticket;
}

async function saveToken(token) {
  _token = token;
}

async function getToken() {
  return _token;
}

async function setAuthToken(appId, token) {
  const tokenString = JSON.stringify(token);
  console.log('setAuthToken');
  console.log(appId);
  console.log(tokenString);
  console.log();
}

async function getAuthToken() {
  return null;
}

async function setRefreshToken(appId, token) {
  const tokenString = JSON.stringify(token);
  console.log('setRefreshToken');
  console.log(appId);
  console.log(tokenString);
  console.log();
}

async function getRefreshToken(appId) {
  return { componentAccessToken: 'refreshtoken@@@_cbFpzB9k6jt_xXzqb3xN980thFTmRqdx3-thtpfyNE' };
}


// ((xml) => {
//   wxMiniProgramThird.eventTicket(xml);
// })(`<xml>
// <AppId><![CDATA[wxf0a1933d302b5a0e]]></AppId>
// <Encrypt><![CDATA[sW5LnYLpbLESz82QlaB9rNRPHG8qp1gOo66B/LU/D7vHxLUktR3JU+zK/mtyicRyrD3PGYdtmZl/k3dtKzZlEBZEzfjFm4KCVOvedRDz68tukbIkJnRmC6GL0XK2Oncg77GbO7JQepbtDl83NRf5F8OaHJ2ws3Pco43MT0QFCIbde2UuRCsq1x91ljYZf1QVncCz70krDJjmfePD/k4DR2jZsqBwuCEKwRXp7sP4CnPG1JVOt9qkspXaIf87XbmCl7kj/RtHZlIOmO6pdZ3F6u2saWySta0Mf/8MBJknXAng+bmRnwDID13+NFunTy4PraJ+gSmwwxF23fgNYj+NPSa/TGSOlIV9gt1BJRi0jQRBqDtFpqFe4IypaRU/lEF5+eH7Oe1NgZJyZ5rzXvv1MVsItlNq+MA3AGcsAjK+9/owyeyCznSoL9t0Oo5KKXn9YQQNK5ol629dqVOlAW04Zw==]]></Encrypt>
// </xml>`);

(async () => {
  try {
    const componentToken = await wxMiniProgramThird.oauth.getComponentAccessToken();
    console.log(componentToken);
    console.log();

    const code = await wxMiniProgramThird.oauth.getPreAuthCode();
    console.log(code);
    console.log();

    const appid = 'wxb3848b0c772c2b30';
    const refreshToken = await wxMiniProgramThird.oauth.refreshAccessToken(appid);
    console.log(JSON.stringify(refreshToken));
  } catch(e) {
    console.log(e);
  }
})();
```
