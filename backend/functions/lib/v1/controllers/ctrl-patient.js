var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var model_patient_class = require('../models/model-patient');
var MasterFunctions = require('../dependencies/masterfunctions');
var model_generalized_class = require('../models/model-generalized');
class ctrl_pat {
    constructor() {
        this.registerPatient = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var email = req.query.email;
            var password = req.query.password;
            var name = req.query.name;
            var aadhaarNumber = req.query.aadhaarNumber;
            var aadhaar_link = req.query.aadhaar_link;
            var dob = req.query.dob;
            var gender = req.query.gender;
            var address = req.query.address;
            var city = req.query.city;
            var state = req.query.state;
            var pincode = req.query.pincode;
            var phone_number = req.query.phone_number;
            var model_patient_object = new model_patient_class(req.connection);
            var data = yield model_patient_object.registerPatient(req, res, next, email, password, name, dob, gender, aadhaarNumber, aadhaar_link, address, city, state, pincode, phone_number);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.loginPatient = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var email = req.query.email;
            var password = req.query.password;
            var model_patient_object = new model_patient_class(req.connection);
            var data = yield model_patient_object.loginPatient(req, res, next, email, password);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.getDoctors = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_patient_object = new model_patient_class(req.connection);
            var data = yield model_patient_object.getDoctors(req, res, next);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_pat;
//# sourceMappingURL=ctrl-patient.js.map