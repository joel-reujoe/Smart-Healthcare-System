var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ctrl_generalized_class = require('../controllers/ctrl-generalized');
const MasterFunction3 = require('../dependencies/masterfunctions');
class generalized_switch {
    constructor() {
        this.switch_controller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.query.action;
            console.log(action);
            var ctrl_generalized_object = new ctrl_generalized_class();
            switch (action) {
                case "authenticate":
                    ctrl_generalized_object.authenticate(req, res, next);
                    break;
                case "sendMail":
                    ctrl_generalized_object.sendMail(req, res, next);
                    break;
                case "insertUserDetails":
                    ctrl_generalized_object.insertUserDetails(req, res, next);
                    break;
                case "resetPassword":
                    console.log("hi joel");
                    ctrl_generalized_object.resetPassword(req, res, next);
                    break;
                default:
                    res.send({ status: "false" });
            }
        });
    }
}
module.exports = generalized_switch;
//# sourceMappingURL=generalized-switch.js.map