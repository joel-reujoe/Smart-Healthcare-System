const spawn = require("child_process").spawn;
function execPythonScript() {
    const pythonProcess = spawn('python', ["../../../../../pythonmodules/parameter.py"]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    pythonProcess.stderr.on('data', (data) => {
        console.log(data.toString());
    });
}
module.exports = execPythonScript;
//# sourceMappingURL=ctrl-pythonmodule.js.map