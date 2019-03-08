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
const model_generalized_class1 = require('../models/model-generalized');
class ctrl_admin {
    constructor() {
        this.getNotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_admin_object = new model_admin_class(req.connection);
            var data = yield model_admin_object.getNotification(req, res, next);
            MasterFunctions6.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.approveDoctor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_admin_object = new model_admin_class(req.connection);
            var request_id = req.query.request_id;
            var data1 = yield model_admin_object.approveDoctor(req, res, next, request_id);
            var model_generalized_object = new model_generalized_class1(req.connection);
            if (data1.status == "true") {
                var data2 = yield model_generalized_object.sendMail(req, res, next, data1, 2);
                var data3 = yield model_generalized_object.setNotification(req, res, next, data1, 2);
            }
            MasterFunctions6.logacesstoFbase(req, res, next, 200, data1, this.hrtime, 0, 0);
        });
        this.disapproveDoctor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_admin_object = new model_admin_class(req.connection);
            var request_id = req.query.request_id;
            var data = yield model_admin_object.disapproveDoctor(req, res, next, request_id);
            var model_generalized1_object = new model_generalized_class1();
            console.log(data);
            if (data.status == "true") {
                var data2 = yield model_generalized1_object.sendMail(req, res, next, data, 3);
                var data3 = yield model_generalized1_object.setNotification(req, res, next, data, 3);
            }
            MasterFunctions6.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        });
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_admin;
//# sourceMappingURL=ctrl-admin.js.map