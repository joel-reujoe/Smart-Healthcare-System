const ctrl_generalized_class=require('../controllers/ctrl-generalized')
const MasterFunction3=require('../dependencies/masterfunctions')
class generalized_switch{
    public switch_controller=async(req,res,next)=>{
        var action=req.query.action;
        console.log(action)
        var ctrl_generalized_object=new ctrl_generalized_class()
        switch(action){
            case "authenticate":
            ctrl_generalized_object.authenticate(req,res,next)
                break;
            case "sendMail":
            ctrl_generalized_object.sendMail(req,res,next)
                break;
            case "insertUserDetails":
            ctrl_generalized_object.insertUserDetails(req,res,next)
                break;
            case "resetPassword":
            console.log("hi joel")
            ctrl_generalized_object.resetPassword(req,res,next)
                break;
            default:
                res.send({status:"false"})
        }
    }
}

module.exports=generalized_switch;