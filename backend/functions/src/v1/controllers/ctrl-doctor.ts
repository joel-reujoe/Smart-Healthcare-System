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

    public getAppointment=async(req,res,next)=>{
        var doctor_id=req.query.doctor_id;
        var model_doctor_object=new model_doctor(req.connection);
        var data=await model_doctor_object.getAppointment(req,res,next,doctor_id)
        console.log(data)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }

    public setVisited=async(req,res,next)=>{
        var appointment_id=req.query.appointment_id
        var patient_id=req.query.patient_id;
        var model_doctor_object=new model_doctor(req.connection);
        var data=await model_doctor_object.setVisited(req,res,next,patient_id,appointment_id)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }

    public setCancelled=async(req,res,next)=>{
        var appointment_id=req.query.appointment_id
        var patient_id=req.query.patient_id;
        var model_doctor_object=new model_doctor(req.connection);
        var data=await model_doctor_object.setCancelled(req,res,next,patient_id,appointment_id)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }

    public loginDoctor=async(req,res,next)=>{
        var email=req.query.email
        var password=req.query.password
        var model_doctor_object=new model_doctor(req.connection);
        var data=await model_doctor_object.loginDoctor(req,res,next,email,password)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
        
    }

    public getDoctorList=async(req,res,next)=>{
        var doctor_id=req.query.doctor_id
        var model_doctor_object=new model_doctor(req.connection);
        var data=await model_doctor_object.getDoctorList(req,res,next,doctor_id)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }

    public getVisitedPatients=async(req,res,next)=>{
        var doctor_id=req.query.doctor_id;
        var model_doctor_object=new model_doctor(req.connection);
        var data=await model_doctor_object.getVisitedPatients(req,res,next,doctor_id)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }

    public getReportByPatientId=async(req,res,next)=>{
        var patient_id=req.query.patient_id;
        var model_doctor_object=new model_doctor(req.connection)
        var data=await model_doctor_object.getReportByPatientId(req,res,next,patient_id);
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        
    }

    public insertIntoReports=async(req,res,next)=>{
        var patient_id=req.query.patient_id;
        var doctor_id=req.query.doctor_id;
        var report_link=req.query.report_link
        var report_description=req.query.report_description
        var model_doctor_object=new model_doctor(req.connection)
        var data=await model_doctor_object.insertIntoReports(req,res,next,report_link,report_description,doctor_id,patient_id)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        
    }

    public getDoctorDetails=async(req,res,next,user_id)=>{
        var user_id=req.query.user_id;
        var model_doctor_object=new model_doctor(req.connection)
        var data=await model_doctor_object.getDoctorDetails(req,res,next,user_id); 
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        

    }

    public getAllSpecialization=async(req,res,next)=>{
        var model_doctor_object=new model_doctor(req.connection)
        var data=await model_doctor_object.getAllSpecialization(req,res,next)
        MasterFunctions1.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        

    }
}
module.exports=ctrl_doctor