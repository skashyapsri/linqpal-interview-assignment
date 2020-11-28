require('./lib/database/connection');
const jwt_decode = require('jwt-decode');
const errorHandler = require('./lib/helper/error_handler');
const User = require('./lib/models/user');
const CryptoJS = require("crypto-js");
const jwt_encode =require("jwt-encode");

var keySize = 256;
var iterations = 100;

exports.handler = async event => { 
    let response = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        },
        statusCode: 200
    }
    const { username } = event.body;
    const token = event.headers.Authorization.split(" ")[1];
    const jwtDecode = jwt_decode(token);
    if(username == jwtDecode["cognito:username"])  {
        const user = await User.find({});
        if(user)    {
            user.map(e =>   {
                e.SSN = this.decrypt(e.SSN,process.env.SECRET).toString(CryptoJS.enc.Utf8)
            });
            response["body"] = JSON.stringify({
                status: true,
                data: jwt_encode(user,process.env.SECRET)
            })
        }
        else    {
            response = errorHandler.res422();
        }
    }
    else    {
        response = errorHandler.res400();
    }
    return response;
}

exports.decrypt = (transitmessage, pass) => {
    var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
    var encrypted = transitmessage.substring(64);
    
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
    });
    
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
        
    })
    return decrypted;
}