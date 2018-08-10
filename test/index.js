'use strict';

const WechatMiniOpenAPI = require('../index');

const appid = 'wxf0a1933d302b5a0e';
const appkey = 'd3940fcc7b6ae7b2d75df989bbab1f8d';
const aesToken = 'jhOboNh2wB7ipv9L7TSxU2LitkuPaxYh';
const aesKey = '3l5gwSgdyO6o2t3r09futJuRYJ9tEJIpo7AWz0fGpj2';

const wechatMiniOpenAPI = new WechatMiniOpenAPI(appid, appkey, aesToken, aesKey, saveTicket, getTicket, saveToken, getToken);


let ticket =  '';
let token = '';
async function saveTicket(ticket) {
  console.log(`saveTicket: ${ticket}`);
  ticket = ticket;
} 

async function getTicket() {
  console.log(`getTicket: ${ticket}`);
  return ticket;
}

async function saveToken(token) {
  console.log(`saveToken: ${token}`);
}

async function getToken() {
  console.log(`getToken: ${token}`);
  return token;
}


((xml) => {
  wechatMiniOpenAPI.eventTicket(xml);
})(`<xml>
<AppId><![CDATA[wxf0a1933d302b5a0e]]></AppId>
<Encrypt><![CDATA[sW5LnYLpbLESz82QlaB9rNRPHG8qp1gOo66B/LU/D7vHxLUktR3JU+zK/mtyicRyrD3PGYdtmZl/k3dtKzZlEBZEzfjFm4KCVOvedRDz68tukbIkJnRmC6GL0XK2Oncg77GbO7JQepbtDl83NRf5F8OaHJ2ws3Pco43MT0QFCIbde2UuRCsq1x91ljYZf1QVncCz70krDJjmfePD/k4DR2jZsqBwuCEKwRXp7sP4CnPG1JVOt9qkspXaIf87XbmCl7kj/RtHZlIOmO6pdZ3F6u2saWySta0Mf/8MBJknXAng+bmRnwDID13+NFunTy4PraJ+gSmwwxF23fgNYj+NPSa/TGSOlIV9gt1BJRi0jQRBqDtFpqFe4IypaRU/lEF5+eH7Oe1NgZJyZ5rzXvv1MVsItlNq+MA3AGcsAjK+9/owyeyCznSoL9t0Oo5KKXn9YQQNK5ol629dqVOlAW04Zw==]]></Encrypt>
</xml>`);
