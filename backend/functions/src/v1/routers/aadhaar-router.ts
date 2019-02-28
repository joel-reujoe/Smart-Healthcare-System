var express=require('express')
var bodyParser=require('body-parser')
var MasterFunctions=require('../dependencies/masterfunctions')
var switch_aadhaar=require('../switch/aadhaar-switch')
var switch_aadhaar_object=new switch_aadhaar()
var router=express.Router()
router.get('/',MasterFunctions.catchErrors(switch_aadhaar_object.switch_controller))
router.post('/',MasterFunctions.catchErrors(switch_aadhaar_object.switch_controller))

module.exports=router


