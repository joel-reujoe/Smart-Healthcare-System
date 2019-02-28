var sql = require('mysql');
import { DBUsServer } from '../../config/environment';
interface mysqlConnection{
    host:string,
    user:string,
    password:string,
    database:string,
};
//35.200.167.245
class dbconnect implements mysqlConnection{
     host;user;password;database;
     constructor() {
        this.host = DBUsServer.host;
        this.user = DBUsServer.user;
        this.password = DBUsServer.password;
        this.database = DBUsServer.database;
        //this.init();
      }
      private async init() {
        return new Promise((resolve, reject) => {
            return this.connectdb();
            })
       }
      public async connectdb() {
        let hrstartconnection = process.hrtime();
        return new Promise((resolve, reject) => {
                var connection = sql.createConnection({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    database: this.database
                });
        let hrstartconnectionend = process.hrtime(hrstartconnection);
        let hrstartconnection1 = process.hrtime();
                connection.connect((err)=> {
                    if(err) {
                        reject(err);
                        console.error('error connecting: ' + err.stack);
                        }
                    else{
                        connection.beginTransaction(function(err) {
                            if (err) { throw err; }
                        });
                        resolve(connection);
                        console.log('connected as id ' + connection.threadId);
                        let hrstartconnectionend1 = process.hrtime(hrstartconnection1);
                        // console.log("database connection is at:hrstartconnection "+hrstartconnectionend);
                        // console.log("database connection is at:hrstartconnection1 "+hrstartconnectionend1);
                        console.info("database connection Execution time (hr): %ds %dms", hrstartconnectionend1[0], hrstartconnectionend1[1]/1000000);
                        }
                });
            })
       }
       public async disconnectdb(connection) {
        return new Promise((resolve, reject) => {
                connection.end(()=>{console.log("connection closed");resolve(true)});
            })
       }
}


const services={
    connectdb:async()=>{
        return new Promise(function (resolve, reject){
            var connection = sql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "",
                    database: "foodiloo_db_new" 
                });
       
                connection.connect((err)=> {
                  if(err) {
                    reject(err);
                    console.error('error connecting: ' + err.stack);
                    }
                  else{
                      resolve(connection);
                      console.log('connected as id ' + connection.threadId);
                      }
                });
        });
        },
    connectdb_name:async(dbname)=>{
                        return new Promise(function (resolve, reject){
                            var connection = sql.createConnection({
                                    host: "localhost",
                                    user: "root",
                                    password: "",
                                    database: dbname
                                });
                       
                                connection.connect((err)=> {
                                  if(err) {
                                    reject(err);
                                    console.error('error connecting: ' + err.stack);
                                    }
                                  else{
                                      resolve(connection);
                                      console.log('connected as id ' + connection.threadId);
                                      }
                                });
                        });
                        },
    disconnectdb:(connection)=>  {
                              connection.end(()=>{console.log("connection closed")})
                                }
    }
    module.exports=dbconnect;