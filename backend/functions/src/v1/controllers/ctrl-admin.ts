const MasterFunctions6=require('../dependencies/masterfunctions');
const model_admin_class=require('../models/model-admin')

class ctrl_admin{
    public hrtime;
    constructor()
    {
        this.hrtime=process.hrtime()
    }

    public getNotification=async(req,res,next)=>{
        var model_admin_object=new model_admin_class(req.connection)
        var data=await model_admin_object.getNotification(req,res,next)
        MasterFunctions6.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }
} 

module.exports=ctrl_admin