var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MasterFunctions = require('../dependencies/masterfunctions');
class model_admin {
    constructor(connection) {
        this.getNotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql = "SELECT DISTINCT * FROM notification,registration_request WHERE notification_status='unread' AND notification_for_id=1 AND status='pending' AND for_type='admin'";
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "getNotification", next);
                    if (result.length != 0) {
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
        this.approveDoctor = (req, res, next, requestid) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql = `SELECT * FROM registration_request WHERE request_id=${requestid}`;
                    var result1 = yield MasterFunctions.sqlProcess(sql, this.connection, "approveDoctor", next);
                    if (result1.length > 0) {
                        var sql1 = `INSERT INTO registration VALUES (0,'${result1[0].email}','${result1[0].password}','doctor','')`;
                        var result2 = yield MasterFunctions.sqlProcess(sql1, this.connection, "approveDoctor", next);
                        if (result2.insertId > 0) {
                            var insertId = result2.insertId;
                            var sql2 = `UPDATE registration_request SET status='approved' WHERE request_id=${requestid}`;
                            var result3 = yield MasterFunctions.sqlProcess(sql2, this.connection, "approveDoctor", next);
                            if (result3.affectedRows > 0) {
                                var sql3 = `INSERT INTO doc_details VALUES(0,'${result1[0].name}','${result1[0].dob}','${result1[0].aadhaarNumber}','${result1[0].aadhaar_link}','${result1[0].qualification_link}','${result1[0].address}','${result1[0].city}','${result1[0].state}',${result1[0].pincode},'${result1[0].gender}',${insertId})`;
                                var result4 = yield MasterFunctions.sqlProcess(sql3, this.connection, "approveDoctor", next);
                                if (result4.insertId > 0) {
                                    var sql4 = `SELECT email FROM registration_request WHERE request_id=${requestid}`;
                                    var result5 = yield MasterFunctions.sqlProcess(sql4, this.connection, "approveDoctor", next);
                                    if (result5.length > 0) {
                                        data = MasterFunctions.formatResponse(result5[0].email, "true", "");
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
        this.disapproveDoctor = (req, res, next, request_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql1 = `UPDATE registration_request SET status='unapproved' WHERE request_id=${request_id}`;
                    var result = yield MasterFunctions.sqlProcess(sql1, this.connection, "disapproveDoctor", next);
                    if (result.affectedRows > 0) {
                        var sql2 = `SELECT email FROM registration_request WHERE request_id=${request_id}`;
                        var result1 = yield MasterFunctions.sqlProcess(sql2, this.connection, "disapproveDoctor", next);
                        if (result1.length > 0) {
                            data = MasterFunctions.formatResponse(result1, "true", "");
                        }
                        else {
                            data = MasterFunctions.formatResponse("", "false", "");
                        }
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.loginAdmin = (req, res, next, email, password) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql1 = `SELECT user_id FROM registration WHERE email='${email}' AND password='${password}'`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "loginAdmin", next);
                    if (result1.length > 0) {
                        data = MasterFunctions.formatResponse(result1, "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        };
        this.connection = connection;
    }
}
module.exports = model_admin;
//# sourceMappingURL=model-admin.js.map