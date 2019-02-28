var model_generalized_class=require('../models/model-generalized')
var MasterFunctions=require('../dependencies/masterfunctions')
class ctrl_gen{
    public hrtime;
    constructor()
    {
        this.hrtime=process.hrtime();
    }

    public authenticate=MasterFunctions.asyncErrorHandler(async(req,res,next)=>{
        var model_generalized_object=new model_generalized_class(req.connection);
        var username=req.query.username
        var password=req.query.password;
        var data=await model_generalized_object.authenticate(req,res,next,username,password);
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        
    })
    public sendMail=MasterFunctions.asyncErrorHandler(async(req,res,next)=>{
        var email=req.query.email;
        var model_generalized_object=new model_generalized_class(req.connection)
        var data=await model_generalized_object.sendMail(req,res,next,email)
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    })
    public resetPassword=MasterFunctions.asyncErrorHandler(async(req,res,next)=>{
        console.log("hi")
        var email=req.query.email;
        var new_password_flag=req.query.new_password_flag;
        var new_password=req.query.new_password
        var model_generalized_object=new model_generalized_class(req.connection)
        var data=await model_generalized_object.resetPassword(req,res,next,email,new_password_flag,new_password);
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    })
    public insertUserDetails=MasterFunctions.asyncErrorHandler(async(req,res,next)=>{
        var model_generalized_object=new model_generalized_class(req.connection)
        var type=req.query.type
        var username=req.query.username
        var password=req.query.password;
        var email=req.query.email;
        var phone=req.query.phone;
        var user_id=req.query.user_id
        var data=await model_generalized_object.insertUserDetails(req,res,next,type,username,password,email,user_id,phone)
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    })

    
}
module.exports=ctrl_gen