var MasterFunctions=require('../dependencies/masterfunctions')
var firebase=require('firebase')
var admin=require('firebase-admin')
var mailer=require('nodemailer')
var config=require('../enviroment/config')
firebase.initializeApp(config)
class model_generalized{
    public connection;
    constructor(connection)
    {
        this.connection=connection
    }

    public authenticate=async(req,res,next,username,password)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var sql=`SELECT user_id,email FROM user_registration WHERE username='${username}' and password='${password}'`
                var result=await MasterFunctions.sqlProcess(sql,this.connection,"authenticate",next)
                if(result.length==0)
                {
                    var data=MasterFunctions.formatResponse("","false","Please register to login")
                    resolve(data)
                }
                else
                {
                    firebase.auth().signInWithEmailAndPassword(result[0].email, password).then(function(response){
                        var auth={uid:response.user.uid,user_id:result[0].user_id}
                        var data=MasterFunctions.formatResponse(auth,"true","")
                        resolve(data)
                    }).catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                      });
                }
            }catch(e)
            {
                reject(e)
            }
        })
    }
    public sendMail=async(req,res,next,email)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var transporter = mailer.createTransport({
                    service:"gmail",
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
                    subject: 'Sending Email using Node.js',
                    text: `Hi Joel Here From DocCall. We are glad that you are ready to join and contribute to the community.
                    Please click the link below to verify the account
                    
                    
                
                    `,
                    html: '<p><a href="localhost/DoctorUI/pages/login.html">Verify Your Mail by Clicking Here</a></p>'
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  var data=MasterFunctions.formatResponse("","true","message")
                  resolve(data)
            }catch(e){
                reject(e)
            }
        })
    }
    public resetPassword=async(req,res,next,email,new_password_flag,new_password)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                console.log(new_password_flag)
                if(new_password_flag=="unset")
                {
                var transporter = mailer.createTransport({
                    service:"gmail",
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
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                        var data=MasterFunctions.formatResponse("","false","message")
                        resolve(data)
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  var data=MasterFunctions.formatResponse(email,"true","message")
                  resolve(data)
                }
                else{
                    console.log(email,new_password)
                    var sql=`UPDATE user_registration SET password='${new_password}' WHERE email='${email}'`
                    var result= await MasterFunctions.sqlProcess(sql,this.connection,"resetPassword",next)
                    if(result.affectedRows!=0)
                    {
                        admin.auth().getUserByEmail(email)
                        .then(function(userRecord) {
                            admin.auth().updateUser(userRecord.toJSON().uid,{
                                email: email,
                                emailVerified: true,
                                password: new_password
                            }).then(function(userRecord) {
                                var data=MasterFunctions.formatResponse("","true","Successfully Password Reset")
                                resolve(data)                        
                            }).catch(function(error){
                                console.log(error)
                            })
                        })
                        .catch(function(error) {
                          console.log("Error fetching user data:", error);
                        });
                    }
                    else{
                        data=MasterFunctions.formatResponse("","false","Couldn't reset password")
                        resolve(data)
                    }
                }
            }catch(e){
                reject(e)
            }
        })
    }
    public insertUserDetails=async(req,res,next,type,username,password,email,user_id,phone)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                console.log(email)
                var sql=`SELECT * FROM user_registration WHERE username='${username}'`
                var result=await MasterFunctions.sqlProcess(sql,this.connection,"insertUserDetails",next)
                if(result.length>0)
                {
                    console.log("hi")
                    var data=MasterFunctions.formatResponse("","false","Username already exists")
                    resolve(data)
                }else{
                    var sql1= `INSERT INTO user_registration VALUES(${user_id},'${type}','${username}','${password}','${email}')`
                    var result1=await MasterFunctions.sqlProcess(sql1,this.connection,"insertUserDetails",next)
                    if(result1.insertId>0)
                    {
                        console.log(result1)
                        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
                            if(response.user.uid.length>0)
                            {
                                var actionCode={
                                    url:"http://localhost/DoctorUI/pages/login.html",
                                    handleCodeInApp: true
                                }
                                this.model_generalized.sendMail(req,res,next,email)
                                resolve(data)
                            }
                        }).catch(function(error) {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            var data=MasterFunctions.formatResponse("","false",errorMessage)
                            resolve(data)
                          });
                    }
                }
            }catch(e)
            {
                next(e)
            }

        })
    }
    insertDocInfo=async(req,res,next,userId,name,gender,dob)=>{
        return new Promise(async(resolve,reject)=>{
            try{
            var sql=`INSERT INTO doctor_details VALUES(0,${userId},'${name}','${dob}','${gender}','cert_url')`
            var result=await MasterFunctions.sqlProcess(sql,req.connection,"insertDocInfo",next)
            if(result.insertId>0)
            {
                var data=MasterFunctions.formatResponse("","true","Successfully Inserted")
                resolve(data)
            }
            else{
                data=MasterFunctions.formatResponse("","false","Could not insert")
                resolve(data)
            }
        }catch(e)
        {
            reject(e)
        }
        })
    }
}
module.exports=model_generalized;