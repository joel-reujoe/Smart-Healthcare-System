const model_doctor=require('../models/model-doctor')
const MasterFunctions1=require('../dependencies/masterfunctions');
class ctrl_doctor{
    public hrtime;

    constructor()
    {
        this.hrtime=process.hrtime();
    }
    public insertUserAuth=async(req,res,next)=>{
        var model_doctor_object=new model_doctor(req.connection)
        var type=req.query.type;
        var username=req.query.name;
        var email=req.query.email;
        var password=req.query.password;
        var data=await model_doctor_object.insertUserAuth(req,res,next,type,username,email,password)
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        
    }

    public postAPost=async(req,res,next)=>{
        var model_doctor_object=new model_doctor(req.connection);
        var uid=req.query.uid;
        var user_id=req.query.user_id;
        var post=req.query.post;
        var image_url="image_url"
        var data=await model_doctor_object.postAPost(req,res,next,uid,user_id,post,image_url);
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }
}
module.exports=ctrl_doctor