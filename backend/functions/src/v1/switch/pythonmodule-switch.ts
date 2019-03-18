const MasterFunctions8=require('../dependencies/masterfunctions')
const ctrl_python_module_class=require('../controllers/ctrl-pythonmodule')
var spawn = require("child_process").spawn;
var util = require("util");

class python_module_switch{
    public switch_controller=async(req,res,next)=>{
        var action=req.query.action;
        var ctrl_python_module_object=new ctrl_python_module_class()
        console.log(action)
        switch(action){

            case "getPrediction":
                var process = spawn('python',["../../../../../pythonmodules/ID3.py",140,85,99,90,23.8,0.999,40]);
                process.stdout.on('data',function(chunk){
    
                var textChunk = chunk.toString('utf8');// buffer to string
            
                util.log(textChunk);
                })
            process.stderr.on('data',function(chunk){
    
                var textChunk = chunk.toString('utf8');// buffer to string
            
                util.log(textChunk);
                });
                break;
        }
    }
}

module.exports=python_module_switch