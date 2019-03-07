var MasterFunctions=require('../dependencies/masterfunctions')

class model_admin{
    public connection;
    constructor(connection){
        this.connection=connection
    }

    public getNotification=async(req,res,next)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                var data={}
                var sql="SELECT DISTINCT * FROM notification,registration_request WHERE notification_status='unread' AND notification_for_id=1 AND status='pending'"
                var result=await MasterFunctions.sqlProcess(sql,this.connection,"getNotification",next)
                if(result.length!=0)
                {
                    console.log(result)
                    data=MasterFunctions.formatResponse(result,"true","")
                    resolve(data)
                }
                else{
                    data=MasterFunctions.formatResponse("","false","")    
                    resolve(data)                
                }
            }
            catch(e)
            {
                next(e)
            }
        })
        
    }
}
module.exports=model_admin