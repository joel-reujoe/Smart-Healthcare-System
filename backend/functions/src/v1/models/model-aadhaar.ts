var MasterFunctions=require('../dependencies/masterfunctions')
var model_generalized_class1=require('./model-generalized')
var model_generalized_object=new model_generalized_class1()
class model_aadhaar_class{
    public connection;
    constructor(connection){
        this.connection=connection
    }

    public checkAadhaar=async(req,res,next,aadhaar_no)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var sql=`SELECT aadhaar_no FROM gen_aadhaar_details WHERE aadhaar_no=${aadhaar_no}`
                var result=await MasterFunctions.sqlProcess(sql,this.connection,"checkAadhaar",next)
                if(result.length==0)
                {
                    var data=MasterFunctions.formatResponse("","false","")
                    resolve(data)
                }
            }catch(e){
                next(e)
            }
            
        })
    }

    public insertAadhaarDetails=async(req,res,next,aadhaar_no,type,name,address,city,state,pincode,gender,dob)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                console.log(aadhaar_no,type,name,address,city,state,pincode,gender,dob)
                var sql=`INSERT INTO gen_aadhaar_details VALUES(0,${aadhaar_no},'${name}','${address}','${city}','${state}',${pincode},'photo')`
                console.log(sql)
                var result=await MasterFunctions.sqlProcess(sql,this.connection,"insertAadhaarDetails",next)
                if(result.insertId>0)
                {
                    if(type=="doctor")
                    {
                        var data=await model_generalized_object.insertDocInfo(req,res,next,result.insertId,name,gender,dob)
                        var dataToSend=MasterFunctions.formatResponse(result.insertId,"true","")
                        resolve(dataToSend)
                    }
                   
                }else{
                    var data=MasterFunctions.formatResponse("","false","")
                    resolve(data)
                }
            }catch(e)
            {
                next(e)
            }
        })
    }
}
module.exports=model_aadhaar_class

