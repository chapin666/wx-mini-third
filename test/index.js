'use strict';

const WechatMiniOpenAPI = require('../index');

const appid = '';
const appkey = '';
const aesToken = '';
const aesKey = '';

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
