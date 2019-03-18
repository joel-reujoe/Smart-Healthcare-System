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
                                break;
        }
    }
}

module.exports=python_module_switch