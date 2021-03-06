"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var MasterFunctions = require('../dependencies/masterfunctions');
var admin = require('firebase-admin');
var moment = require('moment');
var ref = admin.database().ref('posts');
class model_doc {
    constructor(connection) {
        this.insertUserAuth = (req, res, next, type, username, email, password) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var sql = `INSERT INTO user_registration VALUES(${0},'${type}','${username}','${email}','${password}')`;
                var result = yield MasterFunctions.sqlProcess(sql, this.connection, "insertUserAuth", next);
                if (result.insertId > 0) {
                    console.log(result);
                    resolve(result);
                }
            }));
        });
        this.postAPost = (req, res, next, uid, user_id, post, imageUrl) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // firebase.database().ref().child(uid).child('posts/'+result.insertId).set({
                    //     post:post,
                    //     imageUrl:imageUrl
                    //   })
                    var sql2 = `SELECT name FROM doctor_details WHERE user_id=${user_id}`;
                    var result2 = yield MasterFunctions.sqlProcess(sql2, this.connection, "postAPost", next);
                    var newPostRef = ref.push();
                    var key = newPostRef.key;
                    var newData = {
                        postId: newPostRef.key,
                        user_id: user_id,
                        name: result2[0].name,
                        post: post,
                        imageUrl: imageUrl
                    };
                    newPostRef.set(newData);
                    var sql = `INSERT INTO posts VALUE(0,'${user_id}','${key}','${imageUrl}')`;
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "postAPost", next);
                    if (result.insertId > 0) {
                        var starCountRef = firebase.database().ref().child('posts');
                        starCountRef.orderByKey().limitToLast(1).on('child_added', (snapshot) => __awaiter(this, void 0, void 0, function* () {
                            resolve({ data: "", status: "true", message: "" });
                        }));
                    }
                    else {
                        var data = { data: "", status: "false", message: "Could not post" };
                        resolve(data);
                    }
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
        // updatePostId=async(req,res,snapshotkey,user_id,next)=>{
        //     return new Promise(async(resolve,reject)=>{
        //         try{
        //         var sql=`UPDATE posts SET fbase_post_id='${snapshotkey}' WHERE user_id='${user_id}'`
        //         var result=MasterFunctions.sqlProcess(sql,this.connection,"updatePostId",next);
        //         if(result.affectedRows>0)
        //         {
        //             resolve({status:"true"})
        //         }
        //         else{
        //             resolve({status:"false"})
        //         }
        //     }catch(e)
        //     {
        //         reject(e)
        //     }
        //     })
        // }
        this.loginDoctor = (req, res, next, email, password) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql1 = `SELECT registration.user_id,name,address,city,state FROM registration,doc_details WHERE email='${email}' AND password='${password}' AND registration.user_id=doc_details.user_id AND type='doctor'`;
                    var data = {};
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "loginDoctor", next);
                    if (result1.length > 0) {
                        data = MasterFunctions.formatResponse(result1, "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.getAppointment = (req, res, next, doctor_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql1 = `SELECT appointment_id,patient_id, name,date, time_slot FROM ((appointment INNER JOIN pat_details ON appointment.patient_id=pat_details.user_id) INNER JOIN timing ON appointment.time=timing.time_id) WHERE doctor_id=${doctor_id} AND status='pending'`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getAppointment", next);
                    var data = {};
                    if (result1.length > 0) {
                        data = MasterFunctions.formatResponse(result1, "true", "");
                        resolve(data);
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                        resolve(data);
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.setVisited = (req, res, next, patient_id, appointment_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql1 = `UPDATE appointment SET status='visited' WHERE patient_id=${patient_id} AND appointment_id=${appointment_id}`;
                    var data = {};
                    var result11 = yield MasterFunctions.sqlProcess(sql1, this.connection, "setVisited", next);
                    console.log(result11);
                    if (result11.affectedRows > 0) {
                        data = MasterFunctions.formatResponse("", "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.setCancelled = (req, res, next, patient_id, appointment_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql1 = `UPDATE appointment SET status='cancelled' WHERE patient_id=${patient_id} AND appointment_id=${appointment_id}`;
                    var data = {};
                    var result11 = yield MasterFunctions.sqlProcess(sql1, this.connection, "setVisited", next);
                    console.log(result11);
                    if (result11.affectedRows > 0) {
                        data = MasterFunctions.formatResponse("", "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.getDoctorList = (req, res, next, doctor_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql1 = `SELECT name,user_id FROM doc_details WHERE user_id!=${doctor_id}`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getDoctorList", next);
                    var data = {};
                    if (result1.length > 0) {
                        data = MasterFunctions.formatResponse(result1, "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.getVisitedPatients = (req, res, next, doctor_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, request) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql1 = `SELECT  DISTINCT appointment.patient_id, MIN(date) as first_visit, aadhaarNumber, name FROM ((pat_details INNER JOIN appointment ON appointment.patient_id=pat_details.user_id)) WHERE doctor_id=${doctor_id} AND status='visited'`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getVisitedPatients", next);
                    if (result1.length > 0) {
                        data = MasterFunctions.formatResponse(result1, "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(express);
                }
            }));
        });
        this.getReportByPatientId = (req, res, next, patient_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql1 = `SELECT report_id, report_link, report_description,name,date,time FROM report_table INNER JOIN doc_details ON doc_details.user_id=report_table.doctor_id WHERE patient_id=${patient_id}`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getReportByPatientId", next);
                    if (result1.length > 0) {
                        data = MasterFunctions.formatResponse(result1, "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.insertIntoReports = (req, res, next, report_link, report_description, doctor_id, patient_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = {};
                    var sql1 = `INSERT INTO report_table VALUES(0,${patient_id},'${report_link}','${report_description}',${doctor_id},'${moment().format('DD/MM/YYYY')}','${moment().format('hh:mm a')}')`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getReportByPatientId", next);
                    if (result1.insertId > 0) {
                        data = MasterFunctions.formatResponse("", "true", "");
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.getDoctorDetails = (req, res, next, user_id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data1 = {};
                    var sql1 = `SELECT * from doc_details WHERE user_id=${user_id}`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getDoctorDetails", next);
                    if (result1.length > 0) {
                        data1 = MasterFunctions.formatResponse(result1, "true", "");
                    }
                    else {
                        data1 = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data1);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.getAllSpecialization = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data1 = {};
                    var sql1 = `SELECT * FROM specialization`;
                    var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "getAllSpecialization", next);
                    if (result1.length > 0) {
                        data1 = MasterFunctions.formatResponse(result1, "true", "");
                    }
                    else {
                        data1 = MasterFunctions.formatResponse("", "false", "");
                    }
                    resolve(data1);
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.connection = connection;
    }
}
module.exports = model_doc;
//# sourceMappingURL=model-doctor.js.map