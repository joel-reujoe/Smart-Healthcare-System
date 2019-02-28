var express = require('express');
var bodyParser = require('body-parser');
var switch_doctor = require('../switch/doctor-switch');
var switch_doctor_object = new switch_doctor();
var MasterFunctions = require('../dependencies/masterfunctions');
var router = express.Router();
router.get('/', MasterFunctions.catchErrors(switch_doctor_object.switch_controller));
router.post('/', MasterFunctions.catchErrors(switch_doctor_object.switch_controller));
module.exports = router;
//# sourceMappingURL=doctor-router.js.map