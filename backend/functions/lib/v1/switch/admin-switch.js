var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MasterFunctions5 = require('../dependencies/masterfunctions');
const ctrl_admin_class = require('../controllers/ctrl-admin');
class admin_switch {
    constructor() {
        this.switch_controller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.query.action;
            var ctrl_admin_object = new ctrl_admin_class();
            switch (action) {
                case "getNotification":
                    ctrl_admin_object.getNotification(req, res, next);
                    break;
            }
        });
    }
}
module.exports = admin_switch;
//# sourceMappingURL=admin-switch.js.map