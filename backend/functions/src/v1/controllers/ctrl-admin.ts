const MasterFunctions6=require('../dependencies/masterfunctions');
const model_admin_class=require('../models/model-admin')
const model_generalized_class1=require('../models/model-generalized')

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

    public approveDoctor=async(req,res,next)=>{
        var model_admin_object=new model_admin_class(req.connection)
        var request_id=req.query.request_id
        var data1=await model_admin_object.approveDoctor(req,res,next,request_id)
        var model_generalized_object=new model_generalized_class1(req.connection)
        if(data1.status=="true")
        {
            var data2=await model_generalized_object.sendMail(req,res,next,data1,2);
            var data3=await model_generalized_object.setNotification(req,res,next,data1,2)
        }
        MasterFunctions6.logacesstoFbase(req,res,next,200,data1,this.hrtime,0,0)
    }

    public disapproveDoctor=async(req,res,next)=>{
        var model_admin_object=new model_admin_class(req.connection)
        var request_id=req.query.request_id
        var data=await model_admin_object.disapproveDoctor(req,res,next,request_id)
        var model_generalized1_object=new model_generalized_class1()
        console.log(data)
        if(data.status=="true")
        {
            var data2=await model_generalized1_object.sendMail(req,res,next,data,3);
            var data3=await model_generalized1_object.setNotification(req,res,next,data,3)
        }
        MasterFunctions6.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }
} 

module.exports=ctrl_admin