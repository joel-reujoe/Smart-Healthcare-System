import { stat } from "fs";

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
                var sql=`SELECT aadhaarNumber FROM registration_request WHERE aadhaarNumber=${aadhaar_no}`
                var result=await MasterFunctions.sqlProcess(sql,this.connection,"checkAadhaar",next)
                if(result.length==0)
                {
                    var data=MasterFunctions.formatResponse("","false","")
                    resolve(data)
                }
                else{
                    var data=MasterFunctions.formatResponse("","true","");
                    resolve(data)
                }
            }catch(e){
                next(e)
            }
            
        })
    }

    public insertRegistrationRequest=async(req,res,next,email,password,name,address,city,state,phone_number,pincode,gender,dob,aadhaar_link,qualification_link,aadhaarNumber)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var sql1=`SELECT registration.email FROM registration WHERE email='${email}' `
                var result1=await MasterFunctions.sqlProcess(sql1,this.connection,"insertRegistrationRequest",next)
                if(result1.length==0){
                    var sql=`INSERT INTO registration_request VALUES(0,'${email}','${password}','${name}','${address}','${city}','${state}',${phone_number},${pincode},'${gender}','${dob}','${aadhaar_link}','${qualification_link}','${aadhaarNumber}','pending')`
                    var result=await MasterFunctions.sqlProcess(sql,this.connection,"insertRegistrationRequest",next)
                    if(result.insertId>0)
                    {
                            var data=await this.getFromRegistrationRequestById(req,res,next,result.insertId)
                            var dataToSend=MasterFunctions.formatResponse(data,"true","")
                            resolve(dataToSend)
                       
                    }else{
                        data=MasterFunctions.formatResponse("","false","")
                        resolve(data)
                    }
                }else{
                    data=MasterFunctions.formatResponse("","false","")
                    resolve(data)
                }
                
            }catch(e)
            {
                next(e)
            }
        })
    }

    public getFromRegistrationRequestById=async(req,res,next,id)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var sql=`SELECT name,aadhaarNumber,email,address,city,state,phone_number,gender,dob,aadhaar_link,qualification_link FROM registration_request WHERE request_id=${id}`
                var result=await MasterFunctions.sqlProcess(sql,this.connection,"getFromRegistrationRequestById",next)
                if(result.length!=0)
                {
                    var data=MasterFunctions.formatResponse(result,"true","")
                    resolve(data)
                }
                else{
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

