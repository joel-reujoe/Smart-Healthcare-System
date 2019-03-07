const MasterFunctions3=require('../dependencies/masterfunctions')
const ctrl_aadhaar_class=require('../controllers/ctrl-aadhaar')
class aadhaar_switch{
    
    public switch_controller=async(req,res,next)=>{
        var action=req.query.action;
        var ctrl_aadhaar_object=new ctrl_aadhaar_class()
        switch(action){
            case "checkAadhaar":
                ctrl_aadhaar_object.checkAadhaar(req,res,next)
                break;
            case "insertRegistrationRequest":
                ctrl_aadhaar_object.insertRegistrationRequest(req,res,next)
                break;
            default:
                console.log("nothing found")
                res.send({status:"false"})
        }
    }
}
module.exports=aadhaar_switch