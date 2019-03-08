var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MasterFunctions = require('../dependencies/masterfunctions');
var firebase = require('firebase');
var admin = require('firebase-admin');
var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../enviroment/config');
var moment = require('moment');
class model_patient {
    constructor(connection) {
        this.registerPatient = (req, res, next, email, password, name, dob, gender, aadhaarNumber, aadhaar_link, address, city, state, pincode, phone_number) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql2 = `SELECT email FROM registration WHERE email='${email}'`;
                    var result3 = yield MasterFunctions.sqlProcess(sql2, this.connection, "registerPatient", next);
                    if (result3.length == 0) {
                        var sql = `INSERT INTO registration VALUES(0,'${email}','${password}','patient','${phone_number}')`;
                        var result = yield MasterFunctions.sqlProcess(sql, this.connection, "registerPatient", next);
                        var data = {};
                        if (result.insertId > 0) {
                            var sql1 = `INSERT INTO pat_details VALUES (0,'${name}','${dob}','${aadhaarNumber}','${aadhaar_link}','${address}','${city}','${state}',${pincode},'${gender}',${result.insertId})`;
                            var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "registerPatient", next);
                            if (result1.insertId > 0) {
                                data = MasterFunctions.formatResponse("", "true", "");
                                resolve(data);
                            }
                            else {
                                data = MasterFunctions.formatResponse("", "false", "");
                                resolve(data);
                            }
                        }
                        else {
                            data = MasterFunctions.formatResponse("", "false", "");
                            resolve(data);
                        }
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                        resolve(data);
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.loginPatient = (req, res, next, email, password) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql1 = `SELECT registration.user_id,name,address,state,city FROM registration INNER JOIN pat_details ON registration.user_id=pat_details.user_id WHERE email='${email}' AND password='${password}'`;
                    var data = {};
                    var result = yield MasterFunctions.sqlProcess(sql1, this.connection, "loginPatient", next);
                    if (result.length > 0) {
                        data = MasterFunctions.formatResponse(result, "true", "");
                        resolve(data);
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                        resolve(data);
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.getDoctors = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql1 = `SELECT registration.user_id,name, address, email city, state, email, phone_number FROM registration INNER JOIN doc_details ON registration.user_id=doc_details.user_id`;
                    var data = {};
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getDoctors", next);
                    if (result1.length > 0) {
                        data = MasterFunctions.formatResponse(result1, "true", "");
                        resolve(data);
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "No results found");
                        resolve(data);
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.connection = connection;
    }
}
module.exports = model_patient;
//# sourceMappingURL=model-patient.js.map