const {
    createSign,
    createHmac,
} = require ('node:crypto');
require('dotenv').config();
const axios = require("axios");


//const endpoint = 
const depositEndpoint =  "https://api.hotbit.io/api/v1/deposit-addresses?currency=BTC" 
const withdrawEnpoint =  "https://api.hotbit.io/api/v1/withdrawals" 

const key = ""; //Get Hotbit API key from environment file
//const key = process.env.API_KEY; //Get Hotbit API key from environment file
const secret = ""; //Get Hotbit API secret from environment file]
//const secret = process.env.API_SECRET; //Get Hotbit API secret from environment file]
const passphrase ="" // Get Hotbit API passphrase from environment file
//const passphrase = process.env.API_PASSPHASE // Get Hotbit API passphrase from environment file


const timestamp = Date.now().toString();
console.log("TIMESTAMP: ", timestamp);
const prehas_string = `${
    timestamp + "GET" + "/api.hotbit.io/api/v1?currency=BTC" + ""
}`;
const version = "2"; 

//Encrypt passphase
const passphraseHash = createHmac ('sha256', secret)
    .update(passphrase)
    .digest('base64');

//const encPassphrase = passphaseHash.toString(CryptoJS.enc.Base64);
console.log("PASSPHRASE: ", passphraseHash);

const signature = createHmac('sha256', secret)
    .update(prehash_string)
    .digest('base64');

const headers = {
    "Content-Type": "application/json",
    "Hot-API-TIMESTAPE": `${timestamp}`,
    "Hot-API-SIGN": `${signature}`,
    "Hot-API-KEY": `${key}`,
    "Hot-API-PASSPHASE":`${passhpraseHash}`,
    "Hot-API-KEY-VERSION": `${version},`
};

const hotbitDatat = async () => {
        await axios
            .get(depositEndpoint, {headers: headers,})
            .then(res => console.log("RESPONSE: ", res.data))
            .catch(error => console.log("ERROR: ", error.message))
        }
        gethotbitData()

     
              
    module.exports = { getHotbitData }