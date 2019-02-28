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
const request = require("request");
const Master_Functions1 = require('./masterfunctions.js');
const admin = require('firebase-admin');
const moment1 = require('moment');
const fbase_db = admin.firestore();
const Realtime_db_main = admin.database();
//https://android.jlelse.eu/serverless-notifications-with-cloud-functions-for-firebase-685d7c327cd4
//https://github.com/MahmoudAlyuDeen/FirebaseIM/blob/master/server/functions/index.js
//https://aaronczichon.de/2017/03/13/firebase-cloud-functions/
//https://code.tutsplus.com/tutorials/serverless-apps-with-firebase-cloud-functions--cms-28557
//https://www.pluralsight.com/guides/push-notifications-with-firebase-cloud-messaging
class Firebase_Functions {
}
Firebase_Functions.logacesstoFbase = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.body);
    //setTimeout(function(){ res.send("pass"); }, 5000);
});
Firebase_Functions.sendnotification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    //step 1 Get all the firebase ids
    let firebasetoarray = ['elrtvGEjvAQ:APA91bFLRNdizmZNd58Ljt-a6Ce8K3BboeqJCmx1IlSTJRxVOWJXDXl5WMeDPuZpt68JGq37Qzs0rSWL83tay4BTCWapcRnNSMXD8_k8mHYN2rln33V6lKaaT6D30Pm7t7eg9DGKPZXl'];
    let title = "Hii";
    let body = "Notification test";
    yield Firebase_Functions.sendnotification1(req, res, next, 'users', firebasetoarray, title, body);
    res.send("postId");
});
Firebase_Functions.sendnotification1 = (req, res, next, usertype, firebasetoarray, title, body) => __awaiter(this, void 0, void 0, function* () {
    //step 1 Get all the firebase ids
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let arr = firebasetoarray.filter(to => to !== "");
        let comaseptest;
        comaseptest = firebasetoarray.map(result => result);
        console.log("coma sep test: ", JSON.stringify(comaseptest));
        let promises = arr.map((id) => {
            return new Promise((resolve, reject) => {
                var ref = Realtime_db_main.ref("notifications/");
                var usersRef = ref.child(usertype);
                var postId;
                var newPostRef = usersRef.push({
                    notify: {
                        firebasetoken: id,
                        title: title,
                        body: body,
                        sound: 'default'
                    }
                });
                postId = newPostRef.key;
                resolve(postId);
            });
        });
        Promise.all(promises)
            .then(values => {
            console.log("promise values", values);
            resolve("true");
        }).catch(err => {
            console.log("promise error", err);
            reject("true");
            next(err);
        });
    }));
});
Firebase_Functions.firebaseFunctionNotification = (userstype, tokensSnapshot) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (userstype == 'users' || userstype == 'restaurant' || userstype == 'driver') {
            const instanceId = tokensSnapshot.notify.firebasetoken;
            // notification: {
            //     title: tokensSnapshot.notify.title,
            //     body: tokensSnapshot.notify.body,
            //     sound : 'default'
            // }
            const payload = {
                notification: {
                    title: tokensSnapshot.notify.title,
                    body: tokensSnapshot.notify.body,
                    sound: 'default'
                }
            };
            if (userstype == 'player' || userstype == 'club' || userstype == 'tournament' || userstype == 'school' || userstype == 'college' || userstype == 'corporate') {
                admin.messaging().sendToDevice(instanceId, payload)
                    .then(function (response) {
                    console.log("Successfully sent message:", response, instanceId, payload);
                    if (response.failureCount == 1) {
                        console.log("Error Log", response.results[0].error);
                    }
                    resolve("true");
                })
                    .catch(function (error) {
                    console.log("Error sending message01:", error);
                    console.log("Error sending message02:", instanceId, payload);
                    resolve("true");
                });
            }
        }
        else {
            resolve(false);
        }
    });
});
Firebase_Functions.driver_location_update = (driver_id, multi_resto_id, driver_latitude, driver_longitude, nowdate, nowtime) => __awaiter(this, void 0, void 0, function* () {
    //step 1 Get all the firebase ids
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        var ref = Realtime_db_main.ref("driverlocation/");
        var resto_idRef = ref.child(multi_resto_id);
        var driver_idRef = resto_idRef.child(driver_id);
        //var newPostRef = driver_idRef.push();
        var postId;
        var newPostRef1 = driver_idRef.set({
            location: {
                latitude: driver_latitude,
                longitude: driver_longitude,
                date: nowdate,
                time: nowtime
            }
        });
        postId = driver_idRef.key;
        resolve(postId);
    }));
});
Firebase_Functions.webnotificationpanelset = (orderID, orderStatus, URLRedirection, Status, OrderMessage) => __awaiter(this, void 0, void 0, function* () {
    //step 1 Get all the firebase ids
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let nowdate = moment1(new Date()).format("YYYY-MM-DD");
        let nowtime = moment1(new Date()).format("HH:mm:ss");
        let data = {
            orderID: orderID,
            orderStatus: orderStatus,
            URLRedirection: URLRedirection,
            Status: Status,
            OrderMessage: OrderMessage,
            date: nowdate,
            time: nowtime
        };
        let setDoc_promise = fbase_db.collection('webnotificationpanel').doc("notification").collection("orders").doc(`${orderID}`).set(data);
        let setDoc_promise1 = fbase_db.collection('webnotificationpanel').doc("notification").set(data);
        const [setDoc, setDoc1] = yield Promise.all([setDoc_promise, setDoc_promise1]);
        resolve(true);
    }));
});
Firebase_Functions.webnotificationpaneldelete = (orderID) => __awaiter(this, void 0, void 0, function* () {
    //step 1 Get all the firebase ids
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fbase_db.collection('webnotificationpanel').doc("notification").collection("orders").doc(`${orderID}`).delete().then(function () {
            console.log("Document successfully deleted!");
            resolve(true);
        }).catch(function (error) {
            console.error("Error removing document: ", error);
            resolve(false);
        });
    }));
});
module.exports = Firebase_Functions;
//# sourceMappingURL=firebaseLogic.js.map