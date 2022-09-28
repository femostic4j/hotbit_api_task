const {
    createSign,
    createHmac,
  } = require('node:crypto');
const axios = require("axios");


const depositEndpoint ="https://api.hotbit.io/api/v1/deposit-addresses?currency=BTC";
// const key = I have search the hotbit websit pages i could not get the key
// const secret = I have search the hotbit websit pages i could not get the secret
// const passphrase = //I have search the hotbit websit pages i could not get the passphrase
const timestamp = Date.now().toString(); 
console.log("TIMESTAMP: ", timestamp);
const prehash_string = `${
    timestamp + "GET" + "/api/v2/deposit-addresses?currency=BTC" + ""
    }`;
const version = "2";

// Encrypt passphrase
const passphraseHash = createHmac('sha256', secret)
    .update(passphrase)
    .digest('base64');
// const encPassphrase = passphraseHash.toString(CryptoJS.enc.Base64);
console.log("PASSPHRASE: ", passphraseHash);

const signature = createHmac('sha256', secret)
    .update(prehash_string)
    .digest('base64');

const headers = {
    "Content-Type": "application/json",
    "KC-API-TIMESTAMP": `${timestamp}`,
    "KC-API-SIGN": `${signature}`,
    "KC-API-KEY": `${key}`,
    "KC-API-PASSPHRASE": `${passphraseHash}`,
    "KC-API-KEY-VERSION": `${version}`,
};

let dataa

const getHotbitData = async () => {
    await axios
        .get(withdrawEndpoint, {
            headers: headers,
        }).then(res => {console.log("RESPONSE", res.data); dataa = res.data}).catch(error => console.log("ERROR", error.message))
}

console.log("DATAA: ", dataa)


getHotbitData()