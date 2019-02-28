import { resolve } from "url";
import { connect } from "tls";
import { userInfo } from "os";

const jwt = require('jsonwebtoken');
const Master_Functions=require('./masterfunctions.js');

class JWT{
public algorithm ;
public issuer;
public audience;
public keyid;
public iat;
public exp;
public uid;
public email;
public password;
   
        constructor(){
            this.algorithm="HS256";
            this.issuer='http://localhost.com';
            this.keyid='4f1g23a12aa';
            this.iat=Math.floor(Date.now() / 1000);
            this.exp=Math.floor(Date.now() / 1000) + (24 * 60 * 60);
        }
        // public validateUser=(email,password)=>{
        //     console.log(email);
        //     console.log(password);
        //     if(email==this.email && password==this.password)
        //     { 
        //         return {key:'ScinoticSecret',status:true}
        //     }
        //     else
        //     { 
        //         return {status:false}
        //     }
        // }
        public generateToken=async(jwt_key,user_id,audience,next)=>{
            return new Promise(async(resolve,reject)=>{
                this.iat=Math.floor(Date.now() / 1000);
                this.exp=Math.floor(Date.now() / 1000) + ( 24 * 60 * 60);
                const user = {
                algorithm:this.algorithm,
                iss:this.issuer,
                aud:audience,
                keyid:this.keyid,
                iat: this.iat,
                exp: this.exp,
                user_id:user_id
                }
            
                // jwt.sign(user,jwt_key,{expiresIn: '86400s'},(err,token)=>{ 
                jwt.sign(user,jwt_key,(err,token)=>{
                    if(err)
                    {
                        next(err);
                    }
                    else
                    {
                        resolve(token);
                    }  
                });
        }); 
        }


        public validateJWT=async(req,next,uid,table,table_id,audience)=>{

            const user = {
                algorithm:this.algorithm,
                iss :this.issuer,
                aud:'audience',
                keyid:this.keyid,
                user_id:uid

                }
            return true;
                
            return new Promise(async(resolve,reject)=>{
                try 
                {
                    
                    // var database_key= "testkey123"; 
                    console.log("this is table" + table);
                    console.log("this is table" + table_id);
                    var database_key = await this.getKey(req,next,uid,table,table_id);
                    console.log("got key" + database_key);
                    var data=await this.ParseToken(req,next);
                    console.log("parsed key" + data);
                    var data1=await this.verifyToken(req,next,database_key,user);
                    console.log("token verified" + data1);
                }
                catch(err)
                {
                    next(err);
                }
            
            resolve(data1);
                
            })
        }
        public  ParseToken=async(req,next)=>{
               return new Promise(async(resolve,reject)=>{
                const bearerHeader = req.headers['authorization']; 
                //Check if bearer is undefined
                if(typeof bearerHeader !== 'undefined'){
                    console.log("header found")
                    //Split at the space
                    const bearer = bearerHeader.split(' ');
                    //get token from array\ 
                    const bearerToken = bearer[1];
                    //set the token 
                    req.token = bearerToken; 
                    //next middleware
                    resolve(req.token)
                    //next();
                }
                else{
                    //Forbidden
                    //res.sendStatus(403);
                    console.log("header not found")
                    resolve(false);
                }
               }) //get auth header value   
        }
        
        public getKey=async(req,next,UserID, table,table_id )=>{
            return new Promise(async(resolve,reject)=>{
                let key, result2;
                // let sql2=`SELECT jwt_token,auth_key FROM ${table} WHERE ${table_id}='${UserID}' AND status='active'`;
                let sql2=`SELECT jwt_token,auth_key FROM ${table} WHERE ${table_id}='${UserID}'`;
                console.log(sql2)
                try
                {
                    result2=await Master_Functions.sqlProcess(sql2,'JWT Code', req.connection,next);
                }
                catch(err)
                {
                    next(err);
                }
                
                key=result2[0].auth_key; 
                console.log("key = " + key)
                resolve(key);
            })
           
        }
        // public decodeJwt=async(token)=>{
        //     return new Promise(async(resolve,reject)=>{
        //         var decoded = jwt.decode(token);
        //         console.log(decoded);
        //         var UserID=decoded.user.uid;
        //         var data=await this.getKey(UserID);
        //         resolve({key:data});
        //     })
            
        // }
        public verifyToken=async(req,next,database_key,user)=>{
            return new Promise(async(resolve,reject)=>{
                var token=req.token; 
                //TODO jwt.decode and get ID  
                //console.log(user)
                //console.log("jwt data: "+ JSON.stringify(user) + "\n Database Key: " + database_key);
                jwt.verify(token,database_key,(err,authData)=>{
                    if(err){ 
                        resolve(false);
                        //console.log(err);
                    }
                    else {
                        resolve(true);
                        //next();
                    }
                })
            })
        }







        //new function added to get the token;
        public getTokenFromClub = async(req,next)=>
        {
            return new Promise(async(resolve,reject)=>{
                let uid = req.query.user_id;
                var sql = `SELECT jwt_token FROM user_registration WHERE user_registration_id = ${uid}`;
                var result = await Master_Functions.sqlProcess(sql,'findingToken', req.connection,next);
                console.log("jwt_token" + result)
                if(result.length > 0)
                {
                  
                    resolve(result[0].jwt_token);
                }
                else
                {
                    resolve(false);
                }
            })
        }
    

}

module.exports=JWT;