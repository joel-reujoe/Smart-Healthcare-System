var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MasterFunctions = require('../dependencies/masterfunctions');
var admin = require('firebase-admin');
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
        this.connection = connection;
    }
}
module.exports = model_doc;
//# sourceMappingURL=model-doctor.js.map