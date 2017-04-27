import * as CryptoJS from 'crypto-js';

export interface Config {
  accessKey: '',
  secretKey: '',
  bucketName:''
}

const getFlags = (config: Config) => {
    const linuxTime = 3600 + Math.floor(Date.now() / 1000);
    const flags = {"bucketname": config.bucketName, "deadline": linuxTime};
    return flags;
}

const urlsafeBase64EncodeFlag = (config: Config) => {
    return base64_encode(JSON.stringify(getFlags(config)));
}

const wordsToByteArray = (words) => {
  let bytes = [], i;
  for (i = 0; i < words.length * 32; i += 8) {
      bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 0xFF);
  }
  return bytes;
}

const base64ToUrlSafe = (v) => {
  return v.replace(/\//g, '_').replace(/\+/g, '-');
}

const getToken = (config: Config) => {
  let encodedFlags = urlsafeBase64EncodeFlag(config);
  let hmac = CryptoJS.algo.AES.createEncryptor(config.secretKey, CryptoJS.SHA1);
  const encryptedFlags = hmac.process(encodedFlags);
  const words = hmac.finalize();
  const base64str = base64_encode(byteArrayToString(wordsToByteArray(words)));
  const encodedSign = base64ToUrlSafe(base64str);
  const uploadToken = config.accessKey + ':' + encodedSign + ':' + encryptedFlags;
  return uploadToken;
}

const byteArrayToString = (byteArray) => {
  let string = '', l = byteArray.length, i;
  for (i = 0; i < l; i++) {
      string += String.fromCharCode(byteArray[i]);
  }
  return string;
}

const base64_encode = (str) => {
  let c1, c2, c3;
  const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let i = 0, string = '';
  const len= str.length;

  while (i < len){
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len){
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt((c1 & 0x3) << 4);
      string += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len){
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt((c2 & 0xF) << 2);
      string += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    string += base64EncodeChars.charAt(c1 >> 2);
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    string += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return string;
}
