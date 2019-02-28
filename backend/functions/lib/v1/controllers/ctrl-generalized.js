var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var model_generalized_class = require('../models/model-generalized');
var MasterFunctions = require('../dependencies/masterfunctions');
class ctrl_gen {
    constructor() {
        this.authenticate = MasterFunctions.asyncErrorHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_generalized_object = new model_generalized_class(req.connection);
            var username = req.query.username;
            var password = req.query.password;
            var data = yield model_generalized_object.authenticate(req, res, next, username, password);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        }));
        this.sendMail = MasterFunctions.asyncErrorHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var email = req.query.email;
            var model_generalized_object = new model_generalized_class(req.connection);
            var data = yield model_generalized_object.sendMail(req, res, next, email);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        }));
        this.resetPassword = MasterFunctions.asyncErrorHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("hi");
            var email = req.query.email;
            var new_password_flag = req.query.new_password_flag;
            var new_password = req.query.new_password;
            var model_generalized_object = new model_generalized_class(req.connection);
            var data = yield model_generalized_object.resetPassword(req, res, next, email, new_password_flag, new_password);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        }));
        this.insertUserDetails = MasterFunctions.asyncErrorHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var model_generalized_object = new model_generalized_class(req.connection);
            var type = req.query.type;
            var username = req.query.username;
            var password = req.query.password;
            var email = req.query.email;
            var phone = req.query.phone;
            var user_id = req.query.user_id;
            var data = yield model_generalized_object.insertUserDetails(req, res, next, type, username, password, email, user_id, phone);
            MasterFunctions.logacesstoFbase(req, res, next, 200, data, this.hrtime, 0, 0);
        }));
        this.hrtime = process.hrtime();
    }
}
module.exports = ctrl_gen;
//# sourceMappingURL=ctrl-generalized.js.map