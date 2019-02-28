var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const model_aadhaar = require('../models/model-aadhaar');
const MasterFunctions4 = require('../dependencies/masterfunctions');
class ctrl_aadhaar {
    constructor() {
        this.checkAadhaar = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var aadhaar_no = req.query.aadhaar_no;
            console.log(aadhaar_no);
            var model_aadhaar_object = new model_aadhaar(req.connection);
            var data = yield model_aadhaar_object.checkAadhaar(req, res, next, aadhaar_no);
            MasterFunctions4.logacesstoFbase(req, res, next, 200, aadhaar_no, this.hrtime, 0, 0);
        });
        this.insertAadhaarDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var aadhaar_no = req.query.aadhaar_no;
            var type = req.query.type;
            var name = req.query.name;
            var address = req.query.address;
            var city = req.query.city;
            var state = req.query.state;
            var pincode = req.query.pincode;
            var gender = req.query.gender;
            var dob = req.query.dob;
            var model_aadhaar_object = new model_aadhaar(req.connection);
            var data = yield model_aadhaar_object.insertAadhaarDetails(req, res, next, aadhaar_no, type, name, address, city, state, pincode, gender, dob);
            MasterFunctions4.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_aadhaar;
//# sourceMappingURL=ctrl-aadhaar.js.map