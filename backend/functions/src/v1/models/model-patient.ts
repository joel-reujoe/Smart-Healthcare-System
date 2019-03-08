var MasterFunctions=require('../dependencies/masterfunctions')
var firebase=require('firebase')
var admin=require('firebase-admin')
var mailer=require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config=require('../enviroment/config')
var moment=require('moment')

class model_patient{

    public connection;
    constructor(connection)
    {
        this.connection=connection
    }

    public registerPatient=async(req,res,next,email,password,name,dob,gender,aadhaarNumber,aadhaar_link,address,city,state,pincode,phone_number)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var sql2=`SELECT email FROM registration WHERE email='${email}'`
                var result3=await MasterFunctions.sqlProcess(sql2,this.connection,"registerPatient",next);

                if(result3.length==0){
                    var sql=`INSERT INTO registration VALUES(0,'${email}','${password}','patient','${phone_number}')`
                    var result=await MasterFunctions.sqlProcess(sql,this.connection,"registerPatient",next)
                    var data={}
                    if(result.insertId>0){
    
                        var sql1=`INSERT INTO pat_details VALUES (0,'${name}','${dob}','${aadhaarNumber}','${aadhaar_link}','${address}','${city}','${state}',${pincode},'${gender}',${result.insertId})`
                        var result1=await MasterFunctions.sqlProcess(sql1,this.connection,"registerPatient",next);
                        if(result1.insertId>0){
                            data=MasterFunctions.formatResponse("","true","");
                            resolve(data)
                        }
                        else{
                            data=MasterFunctions.formatResponse("","false","")
                            resolve(data)
                        }
                    }
                    else{
                        data=MasterFunctions.formatResponse("","false","")
                        resolve(data)
                    }
                }
                else{
                    data=MasterFunctions.formatResponse("","false","");
                    resolve(data)
                }
            }catch(e){
                next(e)
            }
        })
    }

    public loginPatient=async(req,res,next,email,password)=>{
        return new Promise(async(resolve,reject)=>{
            try{

                var sql1=`SELECT registration.user_id,name,address,state,city FROM registration INNER JOIN pat_details ON registration.user_id=pat_details.user_id WHERE email='${email}' AND password='${password}'`
                var data={}
                var result=await MasterFunctions.sqlProcess(sql1,this.connection,"loginPatient",next);
                if(result.length>0){
                    data=MasterFunctions.formatResponse(result,"true","")
                    resolve(data)
                }
                else{
                    data=MasterFunctions.formatResponse("","false","")
                    resolve(data)
                }
            }catch(e)
            {
                next(e)
            }
        })
    }

    public getDoctors=async(req,res,next)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var sql1=`SELECT registration.user_id,name, address, email city, state, email, phone_number FROM registration INNER JOIN doc_details ON registration.user_id=doc_details.user_id`
                var data={}
                var result1=await MasterFunctions.sqlProcess(sql1,this.connection,"getDoctors",next);
                if(result1.length>0){
                    data=MasterFunctions.formatResponse(result1,"true","")
                    resolve(data)
                }
                else{
                    data=MasterFunctions.formatResponse("","false","No results found")
                    resolve(data)
                }
            }catch(e){
                next(e)
            }
        })
    }

}
module.exports=model_patient;