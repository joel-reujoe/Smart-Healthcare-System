var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MasterFunctions6 = require('../dependencies/masterfunctions');
const model_admin_class = require('../models/model-admin');
class ctrl_admin {
    constructor() {
        this.getNotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_admin_object = new model_admin_class(req.connection);
            var data = yield model_admin_object.getNotification(req, res, next);
            MasterFunctions6.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_admin;
//# sourceMappingURL=ctrl-admin.js.map