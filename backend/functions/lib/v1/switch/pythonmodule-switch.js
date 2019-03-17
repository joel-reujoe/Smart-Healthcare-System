var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MasterFunctions8 = require('../dependencies/masterfunctions');
const ctrl_python_module = require('../controllers/ctrl-pythonmodule');
class python_module {
    constructor() {
        this.switch_controller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.query.action;
            console.log(action);
            switch (action) {
                case "getPrediction":
                    ctrl_python_module();
                    break;
            }
        });
    }
}
module.exports = python_module;
//# sourceMappingURL=pythonmodule-switch.js.map