import { request } from "http";
import { resolve4 } from "dns";

var MasterFunctions=require('../dependencies/masterfunctions')
var firebase=require('firebase')
var admin=require('firebase-admin')
var mailer=require('nodemailer')
var _=require('lodash')
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
                var sql1=`SELECT registration.user_id,name, address, city, state, email, phone_number FROM registration INNER JOIN doc_details ON registration.user_id=doc_details.user_id`
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

    public getAvailableTimeSlots=async(req,res,next,doctorid,date)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                console.log(date)
                var sql1=`SELECT time FROM appointment WHERE doctor_id=${doctorid} AND date='${date}'`
                var result1=await MasterFunctions.sqlProcess(sql1,this.connection,"getAvailbleTimeSlot",next)
                console.log(result1)
                var data={}
                var result3=[]
                var result5=[]
                var result_final=[]
                if(result1.length>0){
                    for(var i=0;i<result1.length;i++){
                        var sql2=`SELECT time_id, time_slot FROM timing WHERE time_id!=${result1[i].time}`
                        var result2=await MasterFunctions.sqlProcess(sql2,this.connection,"getAvailbleTimeSlot",next)
                        for(var j=0;j<result2.length;j++){
                            result3.push({time_id:result2[j].time_id,time_slot:result2[j].time_slot})
                        }
                    }
                    
                    for(var j=0;j<result1.length;j++){
                        for(var i=0;i<result3.length;i++){
                            if(result3[i].time_id==result1[j].time){
                                result3.splice(i,1)
                            }
                        }
                    }
                    result5=_.uniqBy(result3, 'time_id');

                    console.log(result5)
                    
                    data=MasterFunctions.formatResponse(result5,"true","")
                    resolve(data)
                }else{
                    var sql4=`SELECT time_id, time_slot FROM timing`
                    var result4=await MasterFunctions.sqlProcess(sql4,this.connection,"getAvailableTimeSlots",next)
                    data=MasterFunctions.formatResponse(result4,"true","")
                    resolve(data)
                }

            }catch(e){
                next(e)
            }
        })
    }
    
    
    public bookAppointment=async(req,res,next,doctor_id,patient_id,date,time_id)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var data={}
                var sql1=`INSERT INTO appointment VALUES(0,${doctor_id},${patient_id},'${date}',${time_id},'pending')`
                var result1=await MasterFunctions.sqlProcess(sql1,this.connection,"bookAppointment",next)
                if(result1.insertId>0){

                    var sql2=`SELECT email FROM registration WHERE user_id=${doctor_id}`
                    var result2=await MasterFunctions.sqlProcess(sql2,this.connection,"bookAppointment",next)
                    if(result2.length>0){
                        var sql3=`SELECT email,name FROM registration,pat_details WHERE registration.user_id=${patient_id} AND pat_details.user_id=${patient_id}`
                        var result3=await MasterFunctions.sqlProcess(sql3,this.connection,"bookAppointment",next)
                        console.log(result2,result3)
                        data={sender:result3[0].email,reciver:result2[0].email,name:result3[0].name}
                        var dataToSend=MasterFunctions.formatResponse(data,"true","")
                        resolve(dataToSend)
                    }
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

    public getReportList=async(req,res,next,patient_id)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var data={}
                var sql1=`SELECT report_id, report_link, report_description,name,date,time FROM report_table INNER JOIN doc_details ON report_table.doctor_id=doc_details.user_id WHERE patient_id=${patient_id}`
                var result1=await MasterFunctions.sqlProcess(sql1,this.connection,"getReportList",next)
                if(result1.length>0){
                    data=MasterFunctions.formatResponse(result1,"true","")
                }else{
                    data=MasterFunctions.formatResponse("","false","")
                }
                resolve(data)
            }catch(e){
                next(e)
            }
        })
    }

}
module.exports=model_patient;