var express = require('express');
var bodyParser = require('body-parser');
var switch_generalized = require('../switch/generalized-switch');
var switch_generalized_object = new switch_generalized();
var MasterFunction = require('../dependencies/masterfunctions');
var router = express.Router();
router.get('/', MasterFunction.catchErrors(switch_generalized_object.switch_controller));
router.post('/', MasterFunction.catchErrors(switch_generalized_object.switch_controller));
module.exports = router;
//# sourceMappingURL=generalized-router.js.map