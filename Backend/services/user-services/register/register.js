require("./lib/database/connection");
const User = require("./lib/models/user");
const jwt_decode = require("jwt-decode");
const CryptoJS = require("crypto-js");
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
const errorHandler = require("./lib/helper/error_handler");

var keySize = 256;
var iterations = 100;

exports.handler = async (event) => {
    let response = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
        statusCode: 200,
    };
    const { token } = JSON.parse(event.body);
    if (!token) {
        response = errorHandler.res422();
    } else {
        const {
            FirstName,
            LastName,
            TelephoneNumber,
            FullAddress,
            SSN,
        } = jwt_decode(token);
        if (this.validatePayload(jwt_decode(token))) {
            try {
                const user = await new User({
                    FirstName,
                    LastName,
                    TelephoneNumber,
                    FullAddress,
                    SSN: this.encrypt(SSN, process.env.SECRET),
                }).save();
                if (user) {
                    response["body"] = JSON.stringify({ status: true });
                }
            } catch (err) {
                response = errorHandler.res500();
            }
        } else {
            response = errorHandler.res400();
        }
    }
    return response;
};

exports.encrypt = (msg, pass) => {
    let salt = CryptoJS.lib.WordArray.random(128 / 8);

    let key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations,
    });

    let iv = CryptoJS.lib.WordArray.random(128 / 8);

    let encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });

    let transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
};

exports.validatePayload = (payload) => {
    const { FirstName, LastName, TelephoneNumber, FullAddress, SSN } = payload;
    const re = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
    if (
        FirstName.length <= 0 ||
        LastName.length <= 0 ||
        FullAddress.length <= 0 ||
        TelephoneNumber.length <= 0
    ) {
        return false;
    }
    if (!re.test(SSN)) {
        return false;
    }
    let valid = false;
    try {
        valid = phoneUtil.isValidNumber(phoneUtil.parse(TelephoneNumber));
    } catch (e) {
        valid = false;
    }
    if (!valid) {
        return false;
    }
    return true;
};
