var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//dependencies
var express = require('express');
var admin = require('firebase-admin');
var url = require('url');
var path = require('path');
var sql = require('mysql');
var bodyParser = require('body-parser');
var dbservice = require('./dependencies/db');
var doctor_router = require('./routers/doctor-router');
var generalized_router = require('./routers/generalized-router');
var aadhaar_router = require('./routers/aadhaar-router');
var admin_router = require('./routers/admin-router');
var patient_router = require('./routers/patient-router');
//app config
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        var service = yield new dbservice();
        req.connection = yield service.connectdb();
        // req.connection =myconn1;
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("called API is: " + fullUrl);
        console.log("ReqBody Is:" + JSON.stringify(req.body));
        next();
    }
    catch (error) { //here goes if someAsyncPromise() rejected}
        next(error); //this will result in a resolved promise.
    }
    ;
}));
//routing paths
app.use('/controllers/ctrl-doctor/', doctor_router);
app.use('/controllers/ctrl-generalized/', generalized_router);
app.use('/controllers/ctrl-aadhaar/', aadhaar_router);
app.use('/controllers/ctrl-admin/', admin_router);
app.use('/controllers/ctrl-patient', patient_router);
app.get('*', (req, res, next) => {
    // console.log("We couldn't find anything you are looking for")
    res.send("We couldn't find anything you are looking for");
});
app.listen(8000, () => {
    console.log("Server Active At 8000");
});
//# sourceMappingURL=controller.js.map