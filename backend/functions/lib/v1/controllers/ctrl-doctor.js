var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const model_doctor = require('../models/model-doctor');
const MasterFunctions1 = require('../dependencies/masterfunctions');
class ctrl_doctor {
    constructor() {
        this.insertUserAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_doctor_object = new model_doctor(req.connection);
            var type = req.query.type;
            var username = req.query.name;
            var email = req.query.email;
            var password = req.query.password;
            var data = yield model_doctor_object.insertUserAuth(req, res, next, type, username, email, password);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.postAPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_doctor_object = new model_doctor(req.connection);
            var uid = req.query.uid;
            var user_id = req.query.user_id;
            var post = req.query.post;
            var image_url = "image_url";
            var data = yield model_doctor_object.postAPost(req, res, next, uid, user_id, post, image_url);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.getAppointment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var doctor_id = req.query.doctor_id;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.getAppointment(req, res, next, doctor_id);
            console.log(data);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.setVisited = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var appointment_id = req.query.appointment_id;
            var patient_id = req.query.patient_id;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.setVisited(req, res, next, patient_id, appointment_id);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.setCancelled = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var appointment_id = req.query.appointment_id;
            var patient_id = req.query.patient_id;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.setCancelled(req, res, next, patient_id, appointment_id);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.loginDoctor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var email = req.query.email;
            var password = req.query.password;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.loginDoctor(req, res, next, email, password);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.getDoctorList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var doctor_id = req.query.doctor_id;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.getDoctorList(req, res, next, doctor_id);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.getVisitedPatients = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var doctor_id = req.query.doctor_id;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.getVisitedPatients(req, res, next, doctor_id);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.getReportByPatientId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var patient_id = req.query.patient_id;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.getReportByPatientId(req, res, next, patient_id);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.insertIntoReports = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var patient_id = req.query.patient_id;
            var doctor_id = req.query.doctor_id;
            var report_link = req.query.report_link;
            var report_description = req.query.report_description;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.insertIntoReports(req, res, next, report_link, report_description, doctor_id, patient_id);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.getDoctorDetails = (req, res, next, user_id) => { var user_id; return __awaiter(this, void 0, void 0, function* () {
            user_id = req.query.user_id;
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.getDoctorDetails(req, res, next, user_id);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        }); };
        this.getAllSpecialization = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_doctor_object = new model_doctor(req.connection);
            var data = yield model_doctor_object.getAllSpecialization(req, res, next);
            MasterFunctions1.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_doctor;
//# sourceMappingURL=ctrl-doctor.js.map