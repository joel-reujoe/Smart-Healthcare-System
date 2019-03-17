const MasterFunctions8=require('../dependencies/masterfunctions')
const ctrl_python_module=require('../controllers/ctrl-pythonmodule')

class python_module{
    public switch_controller=async(req,res,next)=>{
        var action=req.query.action;
        console.log(action)
        switch(action){

            case "getPrediction":
                ctrl_python_module()
                break;
        }
    }
}

module.exports=python_module