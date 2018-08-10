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
