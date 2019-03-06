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
var MasterFunctions = require('../dependencies/masterfunctions');
var model_generalized_class1 = require('./model-generalized');
var model_generalized_object = new model_generalized_class1();
class model_aadhaar_class {
    constructor(connection) {
        this.checkAadhaar = (req, res, next, aadhaar_no) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql = `SELECT aadhaarNumber FROM registration_request WHERE aadhaarNumber=${aadhaar_no}`;
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "checkAadhaar", next);
                    if (result.length == 0) {
                        var data = MasterFunctions.formatResponse("", "false", "");
                        resolve(data);
                    }
                    else {
                        var data = MasterFunction.formatResponse("", "true", "");
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.insertRegistrationRequest = (req, res, next, email, password, name, address, city, state, phone_number, pincode, gender, dob, aadhaar_link, qualification_link, aadhaarNumber) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql = `INSERT INTO registration_request VALUES(0,'${email}','${password}','${name}','${address}','${city}','${state}',${phone_number},${pincode},'${gender}','${dob}','${aadhaar_link}','${qualification_link}','${aadhaarNumber}','pending')`;
                    console.log(sql);
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "insertRegistrationRequest", next);
                    if (result.insertId > 0) {
                        var data = yield this.getFromRegistrationRequestById(req, res, next, result.insertId);
                        var dataToSend = MasterFunctions.formatResponse(data, "true", "");
                        resolve(dataToSend);
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
        this.getFromRegistrationRequestById = (req, res, next, id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql = `SELECT name,aadhaarNumber,email,address,city,state,phone_number,gender,dob,aadhaar_link,qualification_link FROM registration_request WHERE request_id=${id}`;
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "getFromRegistrationRequestById", next);
                    if (result.length != 0) {
                        var data = MasterFunctions.formatResponse(result, "true", "");
                        resolve(data);
                    }
                    else {
                        var data = MasterFunctions.formatResponse("", "false", "");
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
module.exports = model_aadhaar_class;
//# sourceMappingURL=model-aadhaar.js.map