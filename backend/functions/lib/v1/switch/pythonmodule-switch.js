var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MasterFunctions8 = require('../dependencies/masterfunctions');
const ctrl_python_module_class = require('../controllers/ctrl-pythonmodule');
var spawn = require("child_process").spawn;
var util = require("util");
class python_module_switch {
    constructor() {
        this.switch_controller = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var action = req.query.action;
            var ctrl_python_module_object = new ctrl_python_module_class();
            console.log(action);
            switch (action) {
                case "getPrediction":
                    var process = spawn('python', ["../../../../../pythonmodules/ID3.py", 140, 85, 99, 90, 23.8, 0.999, 40]);
                    process.stdout.on('data', function (chunk) {
                        var textChunk = chunk.toString('utf8'); // buffer to string
                        util.log(textChunk);
                    });
                    process.stderr.on('data', function (chunk) {
                        var textChunk = chunk.toString('utf8'); // buffer to string
                        util.log(textChunk);
                    });
                    break;
            }
        });
    }
}
module.exports = python_module_switch;
//# sourceMappingURL=pythonmodule-switch.js.map