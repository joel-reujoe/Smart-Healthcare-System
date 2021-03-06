var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MasterFunctions = require('../dependencies/masterfunctions');
var firebase = require('firebase');
var admin = require('firebase-admin');
var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../enviroment/config');
var moment = require('moment');
firebase.initializeApp(config);
class model_generalized {
    constructor(connection) {
        this.authenticate = (req, res, next, username, password) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql = `SELECT user_id,email FROM user_registration WHERE username='${username}' and password='${password}'`;
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "authenticate", next);
                    if (result.length == 0) {
                        var data = MasterFunctions.formatResponse("", "false", "Please register to login");
                        resolve(data);
                    }
                    else {
                        firebase.auth().signInWithEmailAndPassword(result[0].email, password).then(function (response) {
                            var auth = { uid: response.user.uid, user_id: result[0].user_id };
                            var data = MasterFunctions.formatResponse(auth, "true", "");
                            resolve(data);
                        }).catch(function (error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                        });
                    }
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
        this.sendMail = (req, res, next, contextObject, context) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var transporter = mailer.createTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: 'joel.rdsouza28@gmail.com',
                            pass: 'Athira9/'
                        }
                    });
                    var mailOptions = {};
                    switch (context) {
                        case 1:
                            mailOptions = {
                                from: 'joel.rdsouza28@gmail.com',
                                to: `joel.rdsouza28@gmail.com`,
                                subject: 'Request for Sign Up',
                                text: `Dear admin 
                        This is Dr. ${contextObject.data.data[0].name} Below are my details 
                        Name:${contextObject.data.data[0].name} 
                        Aadhaar Number:${contextObject.data.data[0].aadhaarNumber} 
                        Aadhaar Link: ${contextObject.data.data[0].aadhaar_link}, 
                        Qualification Link: ${contextObject.data.data[0].qualification_link}, 
                        Date of Birth:${contextObject.data.data[0].dob}, 
                        Gender: ${contextObject.data.data[0].gender}, 
                        Phone Number:${contextObject.data.data[0].phone_number}`
                            };
                            break;
                        case 2:
                            mailOptions = {
                                from: 'joel.rdsouza28@gmail.com',
                                to: `${contextObject.data}`,
                                subject: 'Response Approved',
                                text: `Dear Doctor
                        Your application has been carefully observed and taken into consideration
                        You are recieving this mail to inform you that your application has been approved by the admin and therefore you can now login into our portal using your credentials`
                            };
                            break;
                        case 3:
                            console.log(contextObject);
                            mailOptions = {
                                from: 'joel.rdsouza28@gmail.com',
                                to: `${contextObject.data[0].email}`,
                                subject: 'Response Approved',
                                text: `Dear Doctor
                        Your application has been carefully observed and taken into consideration
                        You are recieving this mail to inform you that your application has been rejected by the admin. To know more please contact to 7709776820 or reply back to this mail`
                            };
                            break;
                        case 4:
                            console.log(contextObject);
                            mailOptions = {
                                from: 'joel.rdsouza28@gmail.com',
                                to: `${contextObject.data.reciver}`,
                                subject: 'Appointment Booked',
                                text: `Dear Doctor
                        An appointment has been booked by ${contextObject.data.name}`
                            };
                    }
                    console.log(mailOptions);
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    var data = MasterFunctions.formatResponse("", "true", "message");
                    resolve(data);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
        this.setNotification = (req, res, next, contextObject, context) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    switch (context) {
                        case 1:
                            var sql = `INSERT INTO notification VALUES(0,${0},'doctor',${1},'admin','${contextObject.data.data[0].name} has requested to register as a doctor','${moment().format('DD/MM/YYYY')}','${moment().format('hh:mm a')}','unread')`;
                            var data = {};
                            var result = yield MasterFunctions.sqlProcess(sql, this.connection, "setNotification", next);
                            if (result.insertId > 0) {
                                data = MasterFunctions.formatResponse("", "true", "");
                                resolve(data);
                            }
                            else {
                                data = MasterFunctions.formatResponse("", "false", "");
                                resolve(data);
                            }
                            break;
                        case 2:
                            console.log(contextObject);
                            var sql1 = `SELECT user_id FROM registration WHERE email='${contextObject.data}'`;
                            var result = yield MasterFunctions.sqlProcess(sql1, this.connection, "setNotifcation", next);
                            if (result.length > 0) {
                                var sql2 = `INSERT INTO notification VALUES(0,${1},'admin',${result[0].user_id},'doctor','Welcome Dear User','${moment().format('DD/MM/YYYY')}','${moment().format('hh:mm a')}','unread')`;
                                var result = yield MasterFunctions.sqlProcess(sql2, this.connection, "setNotification", next);
                                if (result.insertId > 0) {
                                    data = MasterFunctions.formatResponse("", "true", "");
                                    resolve(data);
                                }
                                else {
                                    data = MasterFunctions.formatResponse("", "false", "");
                                    resolve(data);
                                }
                            }
                            break;
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.resetPassword = (req, res, next, email, new_password_flag, new_password) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log(new_password_flag);
                    if (new_password_flag == "unset") {
                        var transporter = mailer.createTransport({
                            service: "gmail",
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'joel.rdsouza28@gmail.com',
                                pass: 'Athira9/'
                            }
                        });
                        var mailOptions = {
                            from: 'joel.reujoe@gmail.com',
                            to: req.query.email,
                            subject: 'Verify Password',
                            text: `Please click the below link to reset password`,
                            html: '<p><a href="localhost/DoctorUI/pages/resetPasswordPage.html">Click here to reset password</a></p>'
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                var data = MasterFunctions.formatResponse("", "false", "message");
                                resolve(data);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        var data = MasterFunctions.formatResponse(email, "true", "message");
                        resolve(data);
                    }
                    else {
                        console.log(email, new_password);
                        var sql = `UPDATE user_registration SET password='${new_password}' WHERE email='${email}'`;
                        var result = yield MasterFunctions.sqlProcess(sql, this.connection, "resetPassword", next);
                        if (result.affectedRows != 0) {
                            admin.auth().getUserByEmail(email)
                                .then(function (userRecord) {
                                admin.auth().updateUser(userRecord.toJSON().uid, {
                                    email: email,
                                    emailVerified: true,
                                    password: new_password
                                }).then(function (userRecord) {
                                    var data = MasterFunctions.formatResponse("", "true", "Successfully Password Reset");
                                    resolve(data);
                                }).catch(function (error) {
                                    console.log(error);
                                });
                            })
                                .catch(function (error) {
                                console.log("Error fetching user data:", error);
                            });
                        }
                        else {
                            data = MasterFunctions.formatResponse("", "false", "Couldn't reset password");
                            resolve(data);
                        }
                    }
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
        this.insertUserDetails = (req, res, next, type, username, password, email, user_id, phone) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log(email);
                    var sql = `SELECT * FROM user_registration WHERE username='${username}'`;
                    var result = yield MasterFunctions.sqlProcess(sql, this.connection, "insertUserDetails", next);
                    if (result.length > 0) {
                        console.log("hi");
                        var data = MasterFunctions.formatResponse("", "false", "Username already exists");
                        resolve(data);
                    }
                    else {
                        var sql1 = `INSERT INTO user_registration VALUES(${user_id},'${type}','${username}','${password}','${email}')`;
                        var result1 = yield MasterFunctions.sqlProcess(sql1, this.connection, "insertUserDetails", next);
                        if (result1.insertId > 0) {
                            console.log(result1);
                            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (response) {
                                if (response.user.uid.length > 0) {
                                    var actionCode = {
                                        url: "http://localhost/DoctorUI/pages/login.html",
                                        handleCodeInApp: true
                                    };
                                    this.model_generalized.sendMail(req, res, next, email);
                                    resolve(data);
                                }
                            }).catch(function (error) {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                var data = MasterFunctions.formatResponse("", "false", errorMessage);
                                resolve(data);
                            });
                        }
                    }
                }
                catch (e) {
                    next(e);
                }
            }));
        });
        this.insertDocInfo = (req, res, next, userId, name, gender, dob) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var sql = `INSERT INTO doctor_details VALUES(0,${userId},'${name}','${dob}','${gender}','cert_url')`;
                    var result = yield MasterFunctions.sqlProcess(sql, req.connection, "insertDocInfo", next);
                    if (result.insertId > 0) {
                        var data = MasterFunctions.formatResponse("", "true", "Successfully Inserted");
                        resolve(data);
                    }
                    else {
                        data = MasterFunctions.formatResponse("", "false", "Could not insert");
                        resolve(data);
                    }
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
        this.connection = connection;
    }
}
module.exports = model_generalized;
//# sourceMappingURL=model-generalized.js.map