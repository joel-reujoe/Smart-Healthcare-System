"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const dbservice = require('./db.js');
const admin = require('firebase-admin');
// const axios = require('axios');
// const https = require('https');
const environment_1 = require("../../config/environment");
const serviceAccountKey = (environment_1.environment.serviceaccountkey);
const moment1 = require('moment');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    storageBucket: environment_1.environment.cloud_bucket,
    databaseURL: environment_1.environment.realtime_database_url
});
const fbase_db = admin.firestore();
const Realtime_db_main = admin.database();
class Master_Functions {
    //Higher order function For catching Await errors
    static asyncErrorHandler(handler) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield handler(req, res, next);
            }
            catch (ex) {
                next(ex);
            }
        });
    }
    //Get the Full Url From Request Object
    static fullUrl(req) {
        var url = {
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl,
            fullUrl: req.protocol + '://' + req.get('host') + req.originalUrl
        };
        return url;
    }
}
//Converts an Javascript array to object
Master_Functions.arrayToObject = (array) => array.reduce((obj, item) => {
    return item;
}, {});
//Converts an Javascript Multidimentional array to object
Master_Functions.arrayToObjectmultiple = (array) => array.reduce((result, item, index, array) => {
    result[index] = item;
    return result;
}, {}); //watch out the empty{}, which is passed as "result".
//Pre defined format for consistency Accross android and web
Master_Functions.formatResponse = (processdata, statustosend, message) => {
    let send = {
        data: (processdata),
        status: statustosend,
        message: message
    };
    return send;
};
//Pre defined format for consistency Accross android and web    
Master_Functions.formatSentResponse2 = (processdata, processdata2, statustosend, message) => {
    let send = {
        data: (processdata),
        data2: (processdata2),
        status: statustosend,
        message: message
    };
    return send;
};
//Higher order error functions For handling Errors
Master_Functions.displayerror = (error, req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.status(error.status || 500);
    console.error("IN Error Master Function");
    console.error("The Error is");
    console.error(error);
    let fullurl = yield Master_Functions.fullUrl(req);
    let nowdatetime = JSON.stringify(moment1().format());
    let requestbody = (req.body);
    console.log("Access url:" + fullurl);
    console.log("requestbody:" + requestbody);
    console.log("nowdatetime:" + nowdatetime);
    req.connection.rollback(() => __awaiter(this, void 0, void 0, function* () {
        try {
            var service = yield new dbservice();
            let DBdisconnect_Promise = service.disconnectdb(req.connection);
            const disconnectstatus = yield Promise.all([DBdisconnect_Promise]);
        }
        catch (ex) {
            console.log("Error in your Master function itself");
        }
        res.status(500).send("Error Processing Request Failed");
    }));
});
//Higher order function For catching promisses errors
Master_Functions.catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);
//A Higher order logic function to log Errors to Firebase Database If required
Master_Functions.logerrortoFbase = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var fullurl = Master_Functions.fullUrl(req);
    }));
});
//Replaces some string with desired string to all occurance    
Master_Functions.replaceall = (replaceThis, withThis, inThis) => __awaiter(this, void 0, void 0, function* () {
    withThis = withThis.replace(/\$/g, "$$$$");
    return inThis.replace(new RegExp(replaceThis.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&])/g, "\\$&"), "g"), withThis);
});
//A Final Function To Log Access and Terminate the execution
Master_Functions.logacesstoFbase = (req, res, next, status, data, hrstart, maxAge, smaxAge) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        //calculate execution time of api
        let hrend = process.hrtime(hrstart);
        //console.info("Execution time (hr): ", hrend);
        console.info("log Function Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
        //get the full url of the request
        let fullurl = yield Master_Functions.fullUrl(req);
        //get the request body
        let requestbody = (req.body);
        try {
            req.connection.commit((err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    req.connection.rollback(() => {
                        next(err);
                    });
                }
                else {
                    var service = yield new dbservice();
                    let DBdisconnect_Promise = service.disconnectdb(req.connection);
                    let nowdatetime = JSON.stringify(moment1().format());
                    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : '0.0.0.0');
                    let data1 = {
                        'fullurl': fullurl,
                        'requestbody': requestbody,
                        'responsebody': JSON.stringify(data),
                        'currenttime': nowdatetime,
                        'ExecutionTime': hrend,
                        'access_IP': ip
                    };
                    let firebaselog_Promise = Master_Functions.loggToFirebase(req, res, next, data1);
                    const [disconnectstatus, firebasestatus] = yield Promise.all([DBdisconnect_Promise, firebaselog_Promise]);
                    //console.log("Response Data = "+JSON.stringify(data));
                    console.log("final res send");
                    res.set('Cache-Control', `public, max-age=${maxAge}, s-maxage=${smaxAge}`);
                    res.status(status).send(data);
                    resolve(true);
                }
            }));
        }
        catch (err) {
            next(err);
        }
    }));
});
//Sms Gateway Logic
Master_Functions.smsGateway = (mobile, message) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let url = `http://trans.jaldisms.com/sendsms.aspx?mobile=9004567894&pass=Businesslogic6767&senderid=TPvegg&to=${mobile}&msg=${message}`;
        request.get(url, (error, response, body) => {
            if (error) {
                resolve('error');
            }
            else {
                resolve(body);
            }
        });
    }));
});
Master_Functions.emailGateway = (email, message) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let url = `https://us-central1-general14414.cloudfunctions.net/istatspassreset?emailid=${email}&password=${message}`;
        request.get(url, (error, response, body) => {
            if (error) {
                resolve('error');
            }
            else {
                resolve(body);
            }
        });
    }));
});
//A higher order function for sql process
Master_Functions.sqlProcess = (sqlquery, connection, sqlqueryname, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            console.log("quesry start");
            // console.log(connection);
            connection.query(sqlquery, (err, result) => __awaiter(this, void 0, void 0, function* () {
                console.log("inside query");
                // console.log(result.length);
                if (err) {
                    console.log('Error sql: ' + err);
                    next(err);
                }
                else {
                    console.log("result sent");
                    resolve(result);
                }
            }));
        }));
    }
    catch (err) {
        next(err);
    }
});
//A higher order function for sql process Array Insertion
Master_Functions.sqlProcessArray = (sqlquery, arrayval, sqlqueryname, connection, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            connection.query(sqlquery, [arrayval], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log('Error sql: ' + err);
                    next(err);
                }
                else {
                    resolve(result);
                }
            }));
        }));
    }
    catch (err) {
        next(err);
    }
});
//Generate a random string
Master_Functions.randomString = (length) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = length;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        resolve(randomstring);
    }));
});
//A core logical function to log to firebase
Master_Functions.loggToFirebase = (req, res, next, data) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let acessurl = yield Master_Functions.replaceall("/", "-", data.fullurl.pathname);
            //let nowdatetime = JSON.stringify(moment().tz("Asia/Kolkata").format()); 
            let nowdate = JSON.stringify(moment1().utcOffset(330).format('YYYY-MM-DD'));
            let nowtime = JSON.stringify(moment1().utcOffset(330).format('HH-mm-ss-SSS'));
            let finaldata = {
                'nowdate': nowdate,
                'acessurl': acessurl,
                'nowtime': nowtime,
                'actualdata': data
            };
            // let posturl='https://us-central1-foodilo-demo.cloudfunctions.net/LogAccesstoFBase';
            //     const instance = axios.create({
            //         baseURL: posturl,
            //         timeout: 10000,
            //      });
            // const requestConfig = {
            // method: 'post',
            // url: posturl,
            // httpsAgent: new https.Agent({ keepAlive: true }),
            // data:finaldata
            // };
            // instance.request(requestConfig).then(res=>{});
            let hrstart = process.hrtime();
            let setDoc_promise = fbase_db.collection('FirebaseAcessLogurlBased').doc(nowdate).collection(acessurl).doc(nowtime).set(data);
            let setDoc_promise1 = fbase_db.collection('FirebaseAcessLogAll').add(data);
            const [setDoc, setDoc1] = yield Promise.all([setDoc_promise, setDoc_promise1]);
            let hrend = process.hrtime(hrstart);
            console.log("the time to firebase update is:" + hrend);
            resolve(true);
        }
        catch (e) {
            next(e);
        }
    }));
});
Master_Functions.sqlProcessUpdate = (sql, factor, connection, next) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            // let flag = true;
            let length = sql.length;
            if (length == 0) {
                let data = { status: false, total_upadted: 0 };
                return resolve(data);
            }
            let divisor_factor = factor;
            let total_hits = Math.floor(length / divisor_factor);
            let hits_rmainder = length % divisor_factor;
            // let hits_rmainder = length % divisor_factor;
            for (let i = 0; i <= total_hits; i++) {
                let result = [];
                let actual_divisor_factor = divisor_factor;
                let compare_divisor_factor = divisor_factor;
                if (i == total_hits) {
                    compare_divisor_factor = hits_rmainder;
                }
                for (let j = 0; j < compare_divisor_factor; j++) {
                    let k = (i * actual_divisor_factor) + j;
                    console.log("i = " + i + " j = " + j + " k = " + k + " total hits = " + total_hits);
                    result.push(Master_Functions.sqlProcess(sql[k], 'update query', connection, next));
                }
                try {
                    const finalPromise = yield Promise.all(result);
                }
                catch (err) {
                    console.log("Update Process Error");
                    next(err);
                    return reject(true);
                }
            }
            let data = { status: true };
            return resolve(data);
        }
        catch (e) {
            next(e);
        }
    }));
});
//following function converts first letter of the word to uppercase
Master_Functions.firstLetterCaps = (value) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            var str = "";
            var value_separated = [];
            value_separated = value.split(" ");
            for (let i = 0; i < value_separated.length; i++) {
                str += value_separated[i].charAt(0).toUpperCase() + value_separated[i].slice(1) + " ";
            }
            resolve(str);
        }
        catch (er) {
            reject(er);
        }
    }));
});
//following function coverts the date into 31-Mar-2018 format
Master_Functions.dateconversion = (date) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            var dateObj = new Date(date);
            var momentObj = moment1(dateObj);
            var momentString = momentObj.format('DD-MMM-YYYY');
            resolve(momentString);
        }
        catch (er) {
            reject(er);
        }
    }));
});
module.exports = Master_Functions;
//# sourceMappingURL=masterfunctions.js.map