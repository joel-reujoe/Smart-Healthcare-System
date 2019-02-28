const model_aadhaar=require('../models/model-aadhaar')
const MasterFunctions4=require('../dependencies/masterfunctions');
class ctrl_aadhaar{
    public hrtime;
    constructor()
    {
        this.hrtime=process.hrtime()
    }

    public checkAadhaar=async(req,res,next)=>{
        var aadhaar_no=req.query.aadhaar_no;
        console.log(aadhaar_no)
        //var model_aadhaar_object=new model_aadhaar(req.connection)
        //var data=await model_aadhaar_object.checkAadhaar(req,res,next,aadhaar_no)
        var data={"status":"true"}
        MasterFunctions4.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        
    }

    public insertAadhaarDetails=async(req,res,next)=>{
        var aadhaar_no=req.query.aadhaar_no
        var type=req.query.type;
        var name=req.query.name;
        var address=req.query.address;
        var city=req.query.city;
        var state=req.query.state;
        var pincode=req.query.pincode;
        var gender=req.query.gender;
        var dob=req.query.dob;
        var model_aadhaar_object=new model_aadhaar(req.connection)
        var data=await model_aadhaar_object.insertAadhaarDetails(req,res,next,aadhaar_no,type,name,address,city,state,pincode,gender,dob);
        MasterFunctions4.logacesstoFbase(req,res,next,200,data,this.hrtime,0,0)        
    }
}

module.exports=ctrl_aadhaar