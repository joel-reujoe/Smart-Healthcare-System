var model_patient_class=require('../models/model-patient')
var MasterFunctions=require('../dependencies/masterfunctions')

class ctrl_pat{
    public hrtime;
    constructor()
    {
        this.hrtime=process.hrtime();
    }

    public registerPatient=async(req,res,next)=>{
        var email=req.query.email;
        var password=req.query.password;
        var name=req.query.name;
        var aadhaarNumber=req.query.aadhaarNumber;
        var aadhaar_link=req.query.aadhaar_link;
        var dob=req.query.dob
        var gender=req.query.gender
        var address=req.query.address;
        var city=req.query.city;   
        var state=req.query.state;
        var pincode=req.query.pincode;   
        var phone_number=req.query.phone_number; 
        var model_patient_object=new model_patient_class(req.connection)
        var data=await model_patient_object.registerPatient(req,res,next,email,password,name,dob,gender,aadhaarNumber,aadhaar_link,address,city,state,pincode,phone_number) 
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
         
    }

    public loginPatient=async(req,res,next)=>{
        var email=req.query.email
        var password=req.query.password

        var model_patient_object=new model_patient_class(req.connection)

        var data=await model_patient_object.loginPatient(req,res,next,email,password)
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }

    public getDoctors=async(req,res,next)=>{
        var model_patient_object=new model_patient_class(req.connection)

        var data=await model_patient_object.getDoctors(req,res,next)
        MasterFunctions.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)
    }
}
module.exports=ctrl_pat;