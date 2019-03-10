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
<<<<<<< HEAD
=======
        this.getAvailableTimeSlots = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var doctor_id = req.query.doctor_id;
            var date = req.query.date;
            var model_patient_object = new model_patient_class(req.connection);
            var data = yield model_patient_object.getAvailableTimeSlots(req, res, next, doctor_id, date);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.bookAppointment = (req, res, next, doctor_id, patient_id, date, time_id) => { var doctor_id, patient_id, date, time_id; return __awaiter(this, void 0, void 0, function* () {
            doctor_id = req.query.doctor_id;
            patient_id = req.query.patient_id;
            date = req.query.date;
            time_id = req.query.time_id;
            var model_patient_object = new model_patient_class(req.connection);
            var data = yield model_patient_object.bookAppointment(req, res, next, doctor_id, patient_id, date, time_id);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        }); };
        this.getReportList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var patient_id = req.query.patient_id;
            var model_patient_object = new model_patient_class(req.connection);
            var data = yield model_patient_object.getReportList(req, res, next, patient_id);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
>>>>>>> shs-joelbranch
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_pat;
//# sourceMappingURL=ctrl-patient.js.map