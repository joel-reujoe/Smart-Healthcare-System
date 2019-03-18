var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MasterFunctions7 = require('../dependencies/masterfunctions');
const ctrl_patient_class = require('../controllers/ctrl-patient');
class patient_switch {
    constructor() {
        this.switch_controller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.query.action;
            var ctrl_patient_object = new ctrl_patient_class();
            switch (action) {
                case "registerPatient":
                    ctrl_patient_object.registerPatient(req, res, next);
                    break;
                case "loginPatient":
                    ctrl_patient_object.loginPatient(req, res, next);
                    break;
                case "getDoctors":
                    ctrl_patient_object.getDoctors(req, res, next);
                    break;
            }
        });
    }
}
module.exports = patient_switch;
//# sourceMappingURL=patient-switch.js.map