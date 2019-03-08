const MasterFunctions5=require('../dependencies/masterfunctions')
const ctrl_admin_class=require('../controllers/ctrl-admin');

class admin_switch{
    public switch_controller=async(req,res,next)=>{
        var action=req.query.action;
        console.log(action)
        var ctrl_admin_object=new ctrl_admin_class();

        switch(action){
            case "getNotification":
            ctrl_admin_object.getNotification(req,res,next);
            break;

            case "approveDoctor":
            ctrl_admin_object.approveDoctor(req,res,next);
            break;

            case "disapproveDoctor":
            ctrl_admin_object.disapproveDoctor(req,res,next);
            break;

            default:
            res.send("nothing found")
            break;
        }
    }
}
module.exports=admin_switch