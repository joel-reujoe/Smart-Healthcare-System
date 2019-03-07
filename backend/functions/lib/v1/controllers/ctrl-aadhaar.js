var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const model_aadhaar = require('../models/model-aadhaar');
const model_generalized1 = require('../models/model-generalized');
const MasterFunctions4 = require('../dependencies/masterfunctions');
var moment = require('moment');
class ctrl_aadhaar {
    constructor() {
        this.checkAadhaar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var aadhaar_no = req.query.aadhaar_no;
            var model_aadhaar_object = new model_aadhaar(req.connection);
            var data = yield model_aadhaar_object.checkAadhaar(req, res, next, aadhaar_no);
            MasterFunctions4.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.insertRegistrationRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var email = req.query.email;
            var password = req.query.password;
            var name = req.query.name;
            var address = req.query.address;
            var city = req.query.city;
            var state = req.query.state;
            var phone_number = req.query.phone_number;
            var pincode = req.query.pincode;
            var gender = req.query.gender;
            var dob = req.query.dob;
            var aadhaar_link = req.query.aadhaar_link;
            var qualification_link = req.query.qualification_link;
            var aadhaarNumber = req.query.aadhaarNumber;
            console.log(email, password, name, address, city, state, phone_number, pincode, gender, dob, aadhaar_link, qualification_link, aadhaarNumber);
            var model_aadhaar_object = new model_aadhaar(req.connection);
            var contextObj = yield model_aadhaar_object.insertRegistrationRequest(req, res, next, email, password, name, address, city, state, phone_number, pincode, gender, dob, aadhaar_link, qualification_link, aadhaarNumber);
            var model_generalized_object = new model_generalized1(req.connection);
            var data = yield model_generalized_object.sendMail(req, res, next, contextObj, 1);
            var data = yield model_generalized_object.setNotification(req, res, next, contextObj, 1);
            MasterFunctions4.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_aadhaar;
//# sourceMappingURL=ctrl-aadhaar.js.map