var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MasterFunctions3 = require('../dependencies/masterfunctions');
const ctrl_aadhaar_class = require('../controllers/ctrl-aadhaar');
class aadhaar_switch {
    constructor() {
        this.switch_controller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.query.action;
            var ctrl_aadhaar_object = new ctrl_aadhaar_class();
            switch (action) {
                case "checkAadhaar":
                    ctrl_aadhaar_object.checkAadhaar(req, res, next);
                    break;
                case "insertRegistrationRequest":
                    ctrl_aadhaar_object.insertRegistrationRequest(req, res, next);
                    break;
                default:
                    console.log("nothing found");
                    res.send({ status: "false" });
            }
        });
    }
}
module.exports = aadhaar_switch;
//# sourceMappingURL=aadhaar-switch.js.map