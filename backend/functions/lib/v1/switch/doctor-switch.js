var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ctrl_doc = require('../controllers/ctrl-doctor');
const MasterFunctions2 = require('../dependencies/masterfunctions');
class doctor_switch {
    constructor() {
        this.switch_controller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.query.action;
            console.log(MasterFunctions2.fullUrl(req));
            var ctrl_doc_object = new ctrl_doc();
            switch (action) {
                case "test":
                    console.log("hi");
                    ctrl_doc_object.insertUserAuth(req, res, next);
                    break;
                case "postAPost":
                    ctrl_doc_object.postAPost(req, res, next);
                    break;
                case "getAppointment":
                    ctrl_doc_object.getAppointment(req, res, next);
                    break;
                case "loginDoctor":
                    ctrl_doc_object.loginDoctor(req, res, next);
                    break;
                case "setVisited":
                    ctrl_doc_object.setVisited(req, res, next);
                    break;
                case "setCancelled":
                    ctrl_doc_object.setCancelled(req, res, next);
                    break;
                case "getDoctorsList":
                    ctrl_doc_object.getDoctorList(req, res, next);
                    break;
                case "getVisitedPatients":
                    ctrl_doc_object.getVisitedPatients(req, res, next);
                    break;
                case "getReportByPatientId":
                    ctrl_doc_object.getReportByPatientId(req, res, next);
                    break;
                case "insertIntoReport":
                    ctrl_doc_object.insertIntoReports(req, res, next);
                    break;
                case "getDoctorDetails":
                    ctrl_doc_object.getDoctorDetails(req, res, next);
                    break;
                case "getAllSpecialization":
                    ctrl_doc_object.getAllSpecialization(req, res, next);
                    break;
            }
        });
    }
}
module.exports = doctor_switch;
//# sourceMappingURL=doctor-switch.js.map