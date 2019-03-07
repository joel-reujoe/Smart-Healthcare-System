var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MasterFunctions = require('../dependencies/masterfunctions');
class model_admin {
    constructor(connection) {
        this.getNotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql = "SELECT DISTINCT * FROM notification,registration_request WHERE notification_status='unread' AND notification_for_id=1 AND status='pending'";
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "getNotification", next);
                    if (result.length != 0) {
                        console.log(result);
                        data = MasterFunctions.formatResponse(result, "true", "");
                        resolve(data);
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                        resolve(data);
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.connection = connection;
    }
}
module.exports = model_admin;
//# sourceMappingURL=model-admin.js.map