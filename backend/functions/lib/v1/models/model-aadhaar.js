var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MasterFunctions = require('../dependencies/masterfunctions');
var model_generalized_class1 = require('./model-generalized');
var model_generalized_object = new model_generalized_class1();
class model_aadhaar_class {
    constructor(connection) {
        this.checkAadhaar = (req, res, next, aadhaar_no) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql = `SELECT aadhaar_no FROM gen_aadhaar_details WHERE aadhaar_no=${aadhaar_no}`;
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "checkAadhaar", next);
                    if (result.length == 0) {
                        var data = MasterFunctions.formatResponse("", "false", "");
                        resolve(data);
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.insertAadhaarDetails = (req, res, next, aadhaar_no, type, name, address, city, state, pincode, gender, dob) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log(aadhaar_no, type, name, address, city, state, pincode, gender, dob);
                    var sql = `INSERT INTO gen_aadhaar_details VALUES(0,${aadhaar_no},'${name}','${address}','${city}','${state}',${pincode},'photo')`;
                    console.log(sql);
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "insertAadhaarDetails", next);
                    if (result.insertId > 0) {
                        if (type == "doctor") {
                            var data = yield model_generalized_object.insertDocInfo(req, res, next, result.insertId, name, gender, dob);
                            var dataToSend = MasterFunctions.formatResponse(result.insertId, "true", "");
                            resolve(dataToSend);
                        }
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