var express = require('express');
var bodyParser = require('body-parser');
var MasterFunctions = require('../dependencies/masterfunctions');
var switch_admin = require('../switch/admin-switch');
var switch_admin_object = new switch_admin();
var router = express.Router();
router.get('/', MasterFunctions.catchErrors(switch_admin_object.switch_controller));
router.post('/', MasterFunctions.catchErrors(switch_admin_object.switch_controller));
module.exports = router;
//# sourceMappingURL=admin-router.js.map