var MasterFunctions=require('../dependencies/masterfunctions')
var admin=require('firebase-admin')
var ref=admin.database().ref('posts')
class model_doc{
    public connection;
    constructor(connection)
    {
        this.connection=connection
    }
    insertUserAuth=async(req,res,next,type,username,email,password)=>{
        return new Promise(async(resolve,reject)=>{
            var sql=`INSERT INTO user_registration VALUES(${0},'${type}','${username}','${email}','${password}')`;
            var result= await MasterFunctions.sqlProcess(sql,this.connection,"insertUserAuth",next);
            if(result.insertId>0)
            {
                console.log(result);
                resolve(result)
            }
        })
    }
    
    postAPost=async(req,res,next,uid,user_id,post,imageUrl)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                // firebase.database().ref().child(uid).child('posts/'+result.insertId).set({
                //     post:post,
                //     imageUrl:imageUrl
                //   })
                var sql2=`SELECT name FROM doctor_details WHERE user_id=${user_id}`
                var result2=await MasterFunctions.sqlProcess(sql2,this.connection,"postAPost",next)
                var newPostRef = ref.push();
                var key=newPostRef.key
                var newData={
                    postId:newPostRef.key,
                    user_id:user_id,
                    name:result2[0].name,
                    post:post,
                    imageUrl:imageUrl
                }
                newPostRef.set(newData)
            var sql=`INSERT INTO posts VALUE(0,'${user_id}','${key}','${imageUrl}')`
            var result=await MasterFunctions.sqlProcess(sql,this.connection,"postAPost",next)
            if(result.insertId>0)
            {
                var starCountRef = firebase.database().ref().child('posts');
                  starCountRef.orderByKey().limitToLast(1).on('child_added', async(snapshot)=>{
                        resolve({data:"",status:"true",message:""})
                })  
            } 
            else{
                
                var data={data:"",status:"false",message:"Could not post"}                
                resolve(data)
            }
        }catch(e)
        {
            reject(e)
        }
        })
        }
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

}


module.exports=model_doc;