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
var sql = require('mysql');
const environment_1 = require("../../config/environment");
;
//35.200.167.245
class dbconnect {
    constructor() {
        this.host = environment_1.DBUsServer.host;
        this.user = environment_1.DBUsServer.user;
        this.password = environment_1.DBUsServer.password;
        this.database = environment_1.DBUsServer.database;
        //this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return this.connectdb();
            });
        });
    }
    connectdb() {
        return __awaiter(this, void 0, void 0, function* () {
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
                connection.connect((err) => {
                    if (err) {
                        reject(err);
                        console.error('error connecting: ' + err.stack);
                    }
                    else {
                        connection.beginTransaction(function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                        resolve(connection);
                        console.log('connected as id ' + connection.threadId);
                        let hrstartconnectionend1 = process.hrtime(hrstartconnection1);
                        // console.log("database connection is at:hrstartconnection "+hrstartconnectionend);
                        // console.log("database connection is at:hrstartconnection1 "+hrstartconnectionend1);
                        console.info("database connection Execution time (hr): %ds %dms", hrstartconnectionend1[0], hrstartconnectionend1[1] / 1000000);
                    }
                });
            });
        });
    }
    disconnectdb(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                connection.end(() => { console.log("connection closed"); resolve(true); });
            });
        });
    }
}
const services = {
    connectdb: () => __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            var connection = sql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "foodiloo_db_new"
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                    console.error('error connecting: ' + err.stack);
                }
                else {
                    resolve(connection);
                    console.log('connected as id ' + connection.threadId);
                }
            });
        });
    }),
    connectdb_name: (dbname) => __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            var connection = sql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: dbname
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                    console.error('error connecting: ' + err.stack);
                }
                else {
                    resolve(connection);
                    console.log('connected as id ' + connection.threadId);
                }
            });
        });
    }),
    disconnectdb: (connection) => {
        connection.end(() => { console.log("connection closed"); });
    }
};
module.exports = dbconnect;
//# sourceMappingURL=db.js.map