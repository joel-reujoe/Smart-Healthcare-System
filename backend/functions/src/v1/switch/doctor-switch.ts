const ctrl_doc=require('../controllers/ctrl-doctor')
const MasterFunctions2=require('../dependencies/masterfunctions')
class doctor_switch{
    public switch_controller=async(req,res,next)=>{
        var action=req.query.action;
        console.log(MasterFunctions2.fullUrl(req))
        var ctrl_doc_object=new ctrl_doc()
        switch(action){
            case "test":
                console.log("hi");
                ctrl_doc_object.insertUserAuth(req,res,next)
                break;
            case "postAPost":
                ctrl_doc_object.postAPost(req,res,next);
                break;
        }
    }
}
module.exports=doctor_switch